import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from './schema/supabase-schema';
import { environment } from '../../environment';
import { Identity, IdentityRequest, SimpleDiscount } from '../bulk-entities/bulk-entities.typings';
import ApiResponseError from '../../errors/ApiResponseError';
import { Discount } from '../../types/discount.typings';
import { from, map, Observable, shareReplay } from 'rxjs';

class SupabaseService {

    private client: SupabaseClient<Database>;

    public qualifiedDiscounts$: Observable<SimpleDiscount[]>;

    constructor(url: string, key: string) {
        this.client = createClient<Database>(
            url,
            key
        )

        this.qualifiedDiscounts$ = from(this.client
            .rpc('get_qualified_simple_discount')
            .returns<SimpleDiscount[]>())
            .pipe(
                map(({ data, error }) => {
                    if (error) {
                        throw new ApiResponseError(`Error occurred fetching qualified simple discounts: ${error.message}`, error.code);
                    }
                    return data;
                }),
                shareReplay(1)
            );
    }

    async getSimpleDiscounts(): Promise<SimpleDiscount[]> {
        const { data, error } = await this.client
            .rpc('get_bulk_simple_discounts_json')
            .returns<SimpleDiscount[]>();
            
        if (error) {
            throw new ApiResponseError(`Error occurred fetching simple discounts: ${error.message}`, error.code);
        }

        data.forEach(simpleDiscount => {
            if (simpleDiscount.marketPrice < simpleDiscount.stickerPrice) {
                const percent = 1 - (simpleDiscount.marketPrice / simpleDiscount.stickerPrice);
                simpleDiscount.discountFromStickerPrice = percent * 100;
            } else {
                simpleDiscount.discountFromStickerPrice = 0;
            }
        })
        
        return data;
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
        const { data, error } = await this.client
            .rpc('get_discount', { discount_cik: cik })
            .returns<Discount>();

        if (error) {
            throw new ApiResponseError(`Error occurred fetching discount for ${cik}: ${error.message}`, error.code);
        }

        if (!data) {
            return null;
        }

        return data;
    }

    async fetchIdentity(cik: string): Promise<Identity | null> {
        const { data, error } = await this.client
            .from('identity')
            .select('*')
            .eq('cik', cik)
            .limit(1)
            .returns<Identity[] | null>();

        if (error) {
            throw new ApiResponseError(`Error occurred fetching identity for ${cik}: ${error.message}`, error.code);
        }

        if (data === null || data.length === 0) {
            return null;
        }

        return data[0]
    }

}

export const supabaseService = new SupabaseService(environment.supabaseUrl, environment.supabaseAnonKey);
