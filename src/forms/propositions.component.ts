import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Proposition } from '../dto/proposition';
import { RestService } from "../services/rest.service";


@Component({
  selector: 'propositions-component',
  templateUrl: './propositions.component.html'
})
export class PropositionsComponent implements OnInit{
    @Input() alinea_id;
    @Output() closeModalEmitter = new EventEmitter();
    propositions:Proposition[];     
    ngOnInit(){
      if(this.rest && this.rest.parent_alinea_id){
        this.getPropositions(this.rest.parent_alinea_id);
      }else if(this.alinea_id){
        this.getPropositions(this.alinea_id);
      }
    }
    getPropositions(alinea_id){
        this.rest.getPropositionsFromAlinea(alinea_id).subscribe(
            success =>{
                if(success && success.entity){
                    this.propositions = success.entity;
                }
            },
            error =>{

            }
        );
    }
    constructor (private rest:RestService) {
        
    }
    close(){
        // this.dialogRef.close();
        this.closeModalEmitter.emit();
    }    
}