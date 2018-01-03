import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import {Titre} from '../dto/titre';
import { ArticleSubject } from '../services/article.subject';
import {LoginNotifier} from '../services/login.notifier';
import {RestService} from '../services/rest.service';
// import {MdDialog} from '@angular/material';
import {NewArticleHandler} from '../services/new.article.handler';
import { Content } from 'ionic-angular';
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',  
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  closeClass:string = 'lines-button arrow arrow-left';
  classline:string = 'lines';
  display:string = 'homepage';
  titres:Titre[] = null;
  @ViewChild(Content) content: Content;
  // private items: MenuItem[];
  constructor(private articleSelected:ArticleSubject,private notifier:LoginNotifier,
    private rest:RestService,private newArticleHandler:NewArticleHandler
    // ,public dialog: MdDialog
    ){
    
  }
  ngOnInit(){
    if(this.articleSelected){
      this.articleSelected.getArticleSubject().subscribe(titres =>{
        this.titres = titres;
        this.display = 'resume-votes';
      });
    }
    if(this.notifier){
      this.notifier.getLoginNotifier().subscribe( page => {
          this.display = page;
        } 
      );
    }
    if(this.rest && this.rest.isLoggedIn()){
      this.display = 'dashboard';
    }
    if(this.newArticleHandler){
      this.newArticleHandler.getArticleSubject().subscribe(event => {
            if(this.rest.getEligibility().totalAlinea > this.rest.getEligibility().totalvotes){
                this.display = 'insufficiant-privileges';
            }else{
                //this.display = 'add-element'
            }
      });
    }
  }
  sideNavOpened(){
    console.log('sideNavOpened');
    this.closeClass = 'lines-button arrow arrow-left close';
    
  }
  sideNavClosed(){
    console.log('sideNavClosed');
    this.closeClass = 'lines-button arrow arrow-left';
  }
  toggleButton(){
    if(this.closeClass === 'lines-button arrow arrow-left'){
      this.classline = '';
      this.closeClass = 'lines-button arrow arrow-left close'
    }else{
      this.closeClass = 'lines-button arrow arrow-left';
      this.classline = '';
    }
  }
  goToHomePage(){
    if(this.rest.isLoggedIn()){
      this.updateDisplayedView('dashboard');
    }else{
      if(!localStorage.getItem('isFirstVisit')){
        this.updateDisplayedView('homepage');
      }else{
        this.updateDisplayedView('login-component');
      }
      
    }
  }
  createAccountClicked(){
    this.updateDisplayedView('create-profile');
  }
  updateDisplayedView(view:string){
    this.display = view;
  }
  scrollToTop(event) {
    this.content.scrollToTop();
  }


}