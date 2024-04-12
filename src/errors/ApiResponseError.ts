export default class ApiResponseError extends Error {

    status: number | string;
    
    constructor(message: string, status: number | string){
        super(message);
        this.status = status;
    }
}