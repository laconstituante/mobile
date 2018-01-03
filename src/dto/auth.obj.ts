export class AuthObject {
    api_token : string;
    is_persistent: boolean;
    timeout:number;
    constructor(key:string,is_persistent){
        this.api_token = key;
        this.is_persistent = is_persistent;
        if(this.is_persistent){
            this.timeout = 0;
        }else{
            let now = new Date();
            this.timeout = now.getTime() + (24*60*60*1000);
        }
    }
}