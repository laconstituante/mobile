import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'home-page-component',
  templateUrl: './home.page.component.html'
})
export class HomePage implements OnInit{
    @Output() settingEmitter = new EventEmitter();
    constructor () {
    }
    resolved(captchaResponse: string) {
        //console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
    ngOnInit(){
      localStorage.setItem('isFirstVisit','true');
    }
    gotToSection(section){
      console.log(section)
    }
    onCreateAccount(){
        this.settingEmitter.emit('create-profile');
    }
    onLogin(){
        this.settingEmitter.emit('login-component');
    }
};