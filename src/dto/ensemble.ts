import {Titre} from './titre';
import {Article} from './article';
import {Alinea} from './alinea';
export class Ensemble {
    titre:Titre;
    article:Article;
    alineas:Alinea[];

    constructor(titre:Titre,article:Article,alineas:Alinea[]){
        this.titre = titre;
        this.article = article;
        this.alineas = alineas;
    }

    setTitre(titre:Titre){
        this.titre = titre;
    }
    setArticle(article:Article){
        this.article = article;
    }
    setAlinea(alineas:Alinea[]){
        this.alineas = alineas;
    }
}