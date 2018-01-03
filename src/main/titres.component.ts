import {Component, OnInit} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Titre } from '../dto/titre';
import { Constitution } from '../dto/constitution';
import {NewArticleHandler} from '../services/new.article.handler';

@Component({
  selector: 'titres-component',
  templateUrl: './titres.component.html'
})
export class TitresComponent implements  OnInit{    
    titres:Titre[];
    constitutions:Constitution[];
    applicableConstitutionId:string;
    ngOnInit(){
        this.getConstitution();
    }
    constructor(private rest: RestService,private addArticleHandler:NewArticleHandler){

    }
    getConstitution(){
        let self = this;
        this.rest.getConstitutions().subscribe(
            constitutions => {                
                self.constitutions = constitutions;
                constitutions.forEach(cons=>{
                if(cons.is_appliquable){
                        self.applicableConstitutionId = cons.constitution_id;
                        self.getTitres(cons.constitution_id);
                    }
                });
            },
            error =>{
                console.log(error);
            }
        );
    }
    getTitres(constitutionId:string){
        this.rest.getTitresFromConstitution(constitutionId).subscribe(
            titres => {
                if(titres && titres.length){
                    titres.forEach(titre=>{
                        if(!titre.vote_count){
                            titre.vote_count = 0;
                        }
                        if (titre.articles){
                            if(titre.articles.length > 1){
                                titre.toolTip = 'Contient les articles ' + titre.articles[0].article_number + ' à ' + titre.articles[titre.articles.length -1].article_number ;
                            }else if(titre.articles.length === 1){
                                titre.toolTip = 'Contient ' + titre.articles[0].article_name;
                            }
                        }else{
                            
                        }
                    });
                }
                this.titres = titres;                
            },
            error =>{
                console.log(error);
            }
        );
    }
    displayRelatedAlineas(titre_id){
        console.log(titre_id);
    }
    changeConstitution(event){
        console.log(event);
        this.getTitres(event.value);
    }
    addArticle(){
        if(this.rest.isLoggedIn()){
            this.rest.get6RepublicEligibility().subscribe(
                success =>{
                    if(success && success.entity){
                        let eligibility = success.entity;
                        this.rest.setEligibility(eligibility);
                        this.addArticleHandler.broadCastNewArticleClicked();                     
                    }
                },
                error => {

                }
            );
        }else{
            //this.dialog.open(LoginFormComponent,{disableClose:true});
            console.log('Implement here open dialog');
        }
    }
}