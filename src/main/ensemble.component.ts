import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Titre } from "../dto/titre";


@Component({
  selector: 'ensemble-component',
  templateUrl: './ensemble.component.html'
})

export class EnsembleComponent {
    @Output() nextVotesEmitter = new EventEmitter();
    @Input() titre:Titre;
    @Input() dispalayNextButton:boolean;

    constructor(){

    }
    onNextVotes(){
      this.nextVotesEmitter.emit();
    }
}