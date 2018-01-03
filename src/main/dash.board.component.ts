import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dash-board-component',
  templateUrl: './dash.board.component.html'
})

export class DashBoardComponent implements OnInit{
    view;
    @Output() settingEmitter = new EventEmitter();
    ngOnInit(){
        this.view = 'myvotes';        
    }
    constructor(){

    }
    updateView(view){
        this.settingEmitter.emit(view);
    }
}