import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {LoginObject} from '../dto/loginObject';
import {RestService} from '../services/rest.service';
import {AuthObject} from '../dto/auth.obj';
import {LoginNotifier} from '../services/login.notifier';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from "ionic-angular";
@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    error:string;
    @Output() closeModalEmitter = new EventEmitter();
    ngOnInit(){
      
    }
    constructor (private rest:RestService,private notifier:LoginNotifier,private formBuilder: FormBuilder,public loadingCtrl: LoadingController){
      this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.maxLength(100), Validators.email, Validators.required])],            
            password: ['',Validators.compose([Validators.maxLength(20), Validators.required])],
            isPersisten: [null,null]
            });
    }
    onSubmit(){
        console.log(this.loginForm.value);
        let user:LoginObject = new LoginObject();
        user.email = this.loginForm.value.email;
        user.password = this.loginForm.value.password;
        user.is_persistent = this.loginForm.value.isPersisten;
        let loader = this.loadingCtrl.create({
        content: "Veuillez patienter un instant...",
            duration: 3000
        });
        loader.present();
        this.rest.loginUser(user).subscribe(
            success =>{
                if(success.entity && success.entity.api_token){
                    this.error = null;
                    this.rest.setAuth(new AuthObject(success.entity.api_token,success.entity.is_persistent));
                    localStorage.setItem('useremail',user.email);
                    this.notifier.broadCastLoginNotifier('dashboard');
                }else{
                    if(success.error && success.message){
                        this.error = success.message;
                    }
                }
                loader.dismiss();
                
            },
            error =>{
                this.error = error;
                console.log('error login',error);
            });
    }
    onCreateAccount(){
        this.notifier.broadCastLoginNotifier('create-profile');
        this.closeModalEmitter.emit();
    }
}