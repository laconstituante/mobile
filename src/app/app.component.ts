import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RestService} from '../services/rest.service';
import { Titre } from "../dto/titre";
import { Constitution } from "../dto/constitution";
import { MainComponent } from "../main/main.component";
import { NewArticleHandler } from "../services/new.article.handler";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = MainComponent;
  titres:Titre[];
  constitutions:Constitution[];
  applicableConstitutionId:string;
  pages: Array<{title: string, component: any}>;

  constructor(  public platform: Platform, 
                public statusBar: StatusBar, 
                public splashScreen: SplashScreen
                ,private rest:RestService
                ,private addArticleHandler:NewArticleHandler) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.getConstitution();
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
    changeConstitution(event){
        console.log(event);
        this.getTitres(event);
    }
    addArticle(){
        if(this.rest.isLoggedIn()){
            this.rest.get6RepublicEligibility().subscribe(
                success =>{
                    if(success && success.entity){                        
                        this.rest.setEligibility(success.entity);
                        this.addArticleHandler.broadCastNewArticleClicked();                     
                    }
                },
                error => {

                }
            );
        }else{
            //this.dialog.open(LoginFormComponent,{disableClose:true});
        }
    }
}
