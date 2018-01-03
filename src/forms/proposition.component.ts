import {Component,Input,OnInit} from '@angular/core';
import { Proposition } from '../dto/proposition';
import { RestService } from "../services/rest.service";
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'proposition-component',
  templateUrl: './proposition.component.html'
})
export class PropositionComponent implements OnInit{
    @Input() proposition:Proposition;    
    ngOnInit(){
      if(this.proposition){
        if(!this.proposition.reported_count){
          this.proposition.reported_count = 0;
        }
        if(!this.proposition.novotes_count){
          this.proposition.novotes_count = 0;
        }
        if(!this.proposition.yesvotes_count){
          this.proposition.yesvotes_count = 0;
        }
      }
    }
    constructor (private rest:RestService,public toastCtrl: ToastController) {
        
    }
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Vous devez vous connecter afin de pouvoir voter',
        duration: 3000
      });
      toast.present();
    }
    signaler(){
      this.submiteVote(3);
    }
    rejeter(){
      this.submiteVote(0);
    }
    approuver(){
      this.submiteVote(1);
    }
    submiteVote(vote){
      if(this.rest.isLoggedIn()){
        this.proposition.vote = vote;
        this.rest.voteProposition(this.proposition).subscribe(
          success =>{
            if(success && success.entity){
              this.proposition = success.entity;
            }
          },
          error =>{

          }
        );
      }else{
        this.presentToast();
      }
        
    }
}