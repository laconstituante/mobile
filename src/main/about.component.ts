import { Component, Output, EventEmitter } from '@angular/core';
import { RestService } from "../services/rest.service";

@Component({
    selector:'about-us-component',
    templateUrl:'./about.component.html'
})
export class AboutComponent{
    @Output() settingEmitter = new EventEmitter<string>();
    constructor(private rest:RestService){

    }

    goToVotePage(){
        if(this.rest.isLoggedIn()){
            this.settingEmitter.emit('resume-votes');    
        }else{
            this.settingEmitter.emit('login-component');    
        }
        
    }
}