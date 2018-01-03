export class UserProfile{
    firstname:string;
    lastname:string;
    password:string;
    email:string;
    dateofbirth:Date;
    isfrench:boolean;
    user_id:string;
    civilite:number;
    codePostal:string;
    country:string;
    getEncodedUser():string{
        let body = `firstname=${this.firstname}&lastname=${this.lastname}&password=${this.password}&email=${this.email}&dateofbirth=${this.dateofbirth}&lastname=${this.lastname}&isfrench=${this.isfrench}&civilite=${this.civilite}&codePostal=${this.codePostal}`;
        return body;
    }
}