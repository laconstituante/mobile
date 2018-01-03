import {Component,Input,OnInit} from '@angular/core';
import { Alinea } from '../dto/alinea';
import { Proposition } from '../dto/proposition';
import { RestService } from '../services/rest.service';
import { ModalController } from 'ionic-angular';
import { ModalHostComponent } from "../forms/modal.host.component";
@Component({
  selector: 'single-alinea',
  templateUrl: './single.alinea.component.html'
})
export class SingleAlineaComponent implements OnInit{
  @Input() alinea:Alinea;
  propositions:Proposition[];
  propositionCount:number = 0;
  selectedTab:number = 0;
  proposition_txt:string = '';
  text_length_left:number = 700;
  view:string;
  pieData;
  ngOnInit(){
    if(this.alinea){
      this.getPropositionsFromAlineas();      
    }
    if(this.alinea.yesvotes_count || this.alinea.novotes_count || this.alinea.noOpinion){
      this.initChart();
    }
  }
  initChart(){
    this.pieData = {
            labels: ['Oui','Non','Sans opinion'],
            datasets: [
                {
                    data: [this.alinea.yesvotes_count, this.alinea.novotes_count,this.alinea.noOpinion],
                    backgroundColor: [
                        "#99d066",
                        "#ff5131",
                        "#cfd8dc"
                    ],
                    hoverBackgroundColor: [
                        "#689f38",
                        "#d50000",
                        "#9ea7aa"
                    ]
                }]    
            };
  }
  constructor(private rest:RestService,public modalCtrl: ModalController){
    this.view = 'current';
  }
  presentLoginModal() {
   let profileModal = this.modalCtrl.create(ModalHostComponent,{view:'login-component',value:null,title:'Connectez-vous'});
   profileModal.present();
  }
  presentPropropositionsModal() {    
   let profileModal = this.modalCtrl.create(ModalHostComponent,{view:'propositions-component',value:this.alinea.alinea_id,title:'Propositions'});
   profileModal.present();
  }
  getPropositionsFromAlineas(){
    let self = this;
        this.rest.getPropositionsFromAlinea(this.alinea.alinea_id).subscribe(
            success => {
              if(success && success.entity){
                self.propositions = success.entity;
                self.propositionCount = self.propositions.length;
              }
            },
            error =>{
                console.log(error);
            }
        );
  }
  selectChange(event){
    this.selectedTab = event.index; 
    console.log(event);
  }
  soumettreProposition(){
    if(!this.rest.isLoggedIn()){
      this.presentLoginModal();
      return;
    }
    let proposition = new Proposition();
    proposition.proposition_text = this.proposition_txt;    
    proposition.alinea_id = this.alinea.alinea_id;
    this.rest.createProposition(proposition).subscribe(
      success =>{
        if(success && success.entity){
          this.propositions = success.entity;
          this.openSnackBar('Votre proposition a bien été enregistrée','Ok');
          this.proposition_txt = null;
        }else if(success && success.error && success.message == 'alreadyExists'){
          this.openSnackBar('Vous avez déja soumis une proposition pour cet alinéa','Ok');
        }
      },
      error => {}
    );
    console.log(this.proposition_txt);
  }

  vote(vote){
    if(!this.rest.isLoggedIn()){
      this.presentLoginModal();
      return;
    }else{
      this.alinea.vote = vote;
      this.rest.voteAlinea(this.alinea).subscribe(
        success =>{
          if(success && success.entity){
            this.alinea = success.entity;
            this.initChart();
            this.openSnackBar('Votre vote a bien été pris en compte','Ok');
          }else{
            this.openSnackBar('Une erreure s\'est produite. Merci de reéssayer plus tard.','Ok');
          }
        },
        error =>{
          this.openSnackBar('Une erreure s\'est produite. Merci de reéssayer plus tard.','Ok');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    // this.snackBar.open(message, action, {
    //   duration: 2500,
    // });
    console.log('Snack bar to implement')
  }
  voirPropositions(){
    this.presentPropropositionsModal()    
  }
  voirCommentaires(){

  }
}