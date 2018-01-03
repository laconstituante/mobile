import { NavParams, ViewController } from 'ionic-angular';
import {Component } from '@angular/core';

@Component({
    templateUrl:'./modal.host.component.html'
})
export class ModalHostComponent{
    display:string;
    componentTitle:string;
    inputValue:any;
    constructor(private navp:NavParams,public viewCtrl: ViewController){
      if(this.navp && this.navp.get('view')){
          this.display = this.navp.get('view');
          this.inputValue = this.navp.get('value')
          this.componentTitle = this.navp.get('title');
      }      
    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
}