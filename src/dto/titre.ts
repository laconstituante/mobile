import {Article} from './article';
export class Titre {
    titre_id:string;
    titre_name:string;
    titre_parent_id:string;
    titre_number:number;
    article_count:number;
    alinea_count:number;
    vote_count:number;
    titre_status:number;
    toolTip:string;
    articles:Article[];
}