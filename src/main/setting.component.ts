import { Component, EventEmitter, Output } from '@angular/core';
import { RestService } from "../services/rest.service";
import { LoadingController } from "ionic-angular";

@Component({
    selector:'setting-component',
    templateUrl: './setting.component.html'
})
export class SettingComponent{
    @Output() settingEmitter = new EventEmitter();
    constructor(private rest:RestService,public loadingCtrl: LoadingController){

    }
    isLoggedIn(){
        return this.rest.isLoggedIn();
    }
    logout(){
        this.rest.logOut();
        this.settingEmitter.emit('homepage');
        let loader = this.loadingCtrl.create({
        content: "Veuillez patienter un instant...",
        duration: 3000
      });
      loader.present();
    }
    myVotes(){
        this.settingEmitter.emit('user-votes-component');
    }
    myPorpositions(){
        this.settingEmitter.emit('propostions-user-component');
    }
    login(){
        this.settingEmitter.emit('login-component');
    }
    about(){
        this.settingEmitter.emit('about-us-component');
    }
    contactus(){
        this.settingEmitter.emit('contact-us-component');
    }
}