import {Component,Input,OnInit} from '@angular/core';
import { Article } from '../dto/article';
@Component({
  selector: 'article-component',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {    
    @Input() article:Article;
    hideArticles:boolean = true;
    constructor(){

    }
    ngOnInit(){
        console.log(this.article);
    }
    displayRelatedAlineas(article_id){
        console.log('clicked on article ID:',article_id);
    }
}