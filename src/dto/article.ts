import {Alinea} from './alinea';
export class Article {
    article_id:string;
    article_name:string;
    article_parent_id:string;
    article_number:number;
    article_status:number;
    article_url:string;
    alineas:Alinea[];
    url:string;
}