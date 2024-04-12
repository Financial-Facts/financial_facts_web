import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from './schema/supabase-schema';
import { environment } from '../../environment';
import { Identity, IdentityRequest, SimpleDiscount } from '../bulk-entities/bulk-entities.typings';
import ApiResponseError from '../../errors/ApiResponseError';
import { SELECT_DISCOUNT_QUERY } from './queries/discount.queries';
import { DbDiscount } from './supabase.typings';
import { mapDbToDiscount } from './supabase.utils';
import { Discount } from '../../types/discount.typings';

class SupabaseService {

    private client: SupabaseClient<Database>;

    constructor(url: string, key: string) {
        this.client = createClient<Database>(
            url,
            key
        )
    }

    async getSimpleDiscounts(): Promise<SimpleDiscount[]> {
        const { data, error } = await this.client.rpc('get_bulk_simple_discounts');
        if (error) {
            throw new ApiResponseError(`Error occurred fetching simple discounts: ${error.message}`, error.code);
        }
        return data.map(dbSimpleDiscount => ({
            lastUpdated: dbSimpleDiscount.last_updated,
            stickerPrice: dbSimpleDiscount.stickerprice,
            discountedCashFlowPrice: dbSimpleDiscount.discountedcashflowprice,
            benchmarkRatioPrice: dbSimpleDiscount.benchmarkratioprice,
            ...dbSimpleDiscount
        }));
    }

    async fetchBulkIdentities(identityRequest: IdentityRequest): Promise<Identity[]> {
        const sortBy = identityRequest.sortBy.toLowerCase();
        let query = this.client
            .from('identity')
            .select(`*`)
            .range(identityRequest.startIndex, identityRequest.startIndex + identityRequest.limit)
            .order(sortBy, { ascending: identityRequest.order === 'ASC' })

        if (identityRequest.searchBy && identityRequest.keyword) {
            const column = identityRequest.searchBy.toLowerCase();
            query = query.ilike(column, `%${identityRequest.keyword}%`)
        }

        const { data, error } = await query.returns<Identity[]>();

        if (error) {
            throw new ApiResponseError(`Error occurred identities for ${identityRequest}: ${error.message}`, error.code);
        }

        return data;
    }

    async fetchDiscount(cik: string): Promise<Discount | null> {
        const select_discount_query = this.client
            .from('discount')
            .select(SELECT_DISCOUNT_QUERY)
            .eq('cik', cik)
            .returns<DbDiscount>()
            .maybeSingle();

        const { data, error } = await select_discount_query;

        if (error) {
            throw new ApiResponseError(`Error occurred fetching discount for ${cik}: ${error.message}`, error.code);
        }

        if (!data) {
            return null;
        }

        return mapDbToDiscount(data as DbDiscount);
    }

}

export const supabaseService = new SupabaseService(environment.supabaseUrl, environment.supabaseAnonKey);
