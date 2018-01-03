import { Component, Input, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { ArticleSubject } from '../services/article.subject';
import { Titre } from '../dto/titre';

@Component({
    selector: 'titre-component',
    templateUrl: './titre.component.html'
})
export class TitreComponent implements OnInit {
    @Input() titre: Titre;
    item: any;
    closeClass: string = 'lines-button arrow arrow-up';
    shownGroup: any = null;
    constructor(private rest: RestService, private articleSelected: ArticleSubject) {

    }
    ngOnInit() {
        if (this.titre.titre_name.indexOf(':') === -1) {
            this.item = [this.titre.titre_name, ''];
        } else {
            this.item = this.titre.titre_name.substring(0, this.titre.titre_name.indexOf('(')).split(' : ');
        }
    }
    onArticleSelected(event) {
        this.getAlineasFromArticleId(event)
    }
    getAlineasFromArticleId(event) {
        let self = this;
        this.rest.getAlineas(event.article_id).subscribe(
            alineas => {
                if (alineas && alineas.entity){
                    let titres = [];
                    let titre = new Titre();
                    titre.titre_id = self.titre.titre_id;
                    titre.titre_name = self.titre.titre_name;
                    titre.titre_number = self.titre.titre_number;
                    titre.articles = [];
                    event.alineas = alineas.entity
                    titre.articles.push(event);
                    titres.push(titre);
                    self.articleSelected.broadCastArticleSelected(titres);
                }
                    // let ens = new Ensemble(self.titre,event,alineas.entity);
                    
            },
            error => {
                console.log(error);
            }
        );
    }
    toggleGroup() {
        if (this.isGroupShown()) {
            this.shownGroup = null;
        } else {
            this.shownGroup = true;
        }
    }
    isGroupShown() {
        return this.shownGroup;
    }
}