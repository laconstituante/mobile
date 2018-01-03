import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Article } from '../dto/article';
@Component({
  selector: 'articles-compnent',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements  OnInit {
    @Input() articles:Article[];
    @Output() onArticleSelected: EventEmitter<Article> = new EventEmitter();    
    ngOnInit(){
    //   if(this.titreId){
    //     this.getArticles();
    //   }
    }
    constructor(private rest: RestService){

    }
    // getArticles(){
    //     let self = this;
    //     this.rest.getArticlesFromTitre(this.titreId).subscribe(
    //         articles => {
    //             if(articles && articles.length){
    //                 articles.forEach(article =>{
    //                     if(!article.alinea_count){
    //                         article.alinea_count = 0;
    //                     }
    //                     if(!article.proposition_count){
    //                         article.proposition_count = 0;
    //                     }
    //                     if(!article.vote_count){
    //                         article.vote_count = 0;
    //                     }
    //                     article.toolTip = article.alinea_count + ' Alinés, ' +  article.vote_count + ' votes, ' + article.proposition_count + ' Propositions';
    //                 });
    //             }
    //             self.articles = articles;
    //         },
    //         error =>{
    //             console.log(error);
    //         }
    //     );
    // }
    selectArticle(article){
        this.onArticleSelected.emit(article);
    }
}