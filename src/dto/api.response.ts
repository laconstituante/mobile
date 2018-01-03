export class ApiResponse<T> {
    error:boolean;
    endpoint:string;
    message:string;
    status:number;
    metadata:string;
    entity:T;
}