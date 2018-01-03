import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../services/rest.service';
import { LoadingController } from "ionic-angular";
import { Titre } from "../dto/titre";
@Component({
  selector: 'resume-vote',
  templateUrl: './resume.vote.component.html'
})
export class ResumeVotesComponent implements OnInit {  
  @Input() titres:Titre[];
  @Output() scroleTopEmitter = new EventEmitter();
  display:string;  
  constructor(private rest:RestService,public loadingCtrl: LoadingController){
    
  }
  ngOnInit(){
    if(this.rest && this.rest.isLoggedIn() && !this.titres){
        this.getNextAlineas();
    }
  }
  getNextAlineas(){
      let loader = this.loadingCtrl.create({
        content: "Veuillez patienter un instant...",
        duration: 3000
      });
      loader.present();
      this.rest.getNextAlineas().subscribe(
          success =>{
            if(success && success.entity){
              this.titres = success.entity;
              this.scroleTopEmitter.emit();
              loader.dismiss();
            }else{
              // TODO display error
              loader.dismiss();
            }
          },
          error =>{}
      );
  }
  continueVotes(event){
    this.getNextAlineas();
  }
  scrollToTop(){
                       
    }

}