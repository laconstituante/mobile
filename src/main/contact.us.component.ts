import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestService } from "../services/rest.service";
import { Contact } from "../dto/contact";
import { ToastController } from "ionic-angular";

@Component({
    selector:'contact-us-component',
    templateUrl:'./contact.us.component.html'
})
export class ContactUsComponent implements OnInit {
    email;
    subject;
    msg_txt;
    @Output() settingEmitter = new EventEmitter<string>();
    constructor(private rest:RestService,public toastCtrl: ToastController){
        
    }
    ngOnInit(){
        if(this.rest.isLoggedIn() && localStorage.getItem('useremail')){
            this.email = localStorage.getItem('useremail');
        }
    }
    send(){       
        let contact = new Contact();
        contact.email = this.email;
        contact.subject = this.subject;
        contact.message = this.msg_txt;
        if(this.email && this.msg_txt){
            this.rest.contactUs(contact).subscribe(
                res =>{
                    this.presentToast("Votre message a bien été envoyé.");
                    if(this.rest.isLoggedIn()){
                        this.settingEmitter.emit("dashboard");
                    }else{
                        this.settingEmitter.emit("login-component");
                    }
                },
                err =>{
                    this.presentToast("Oups, un soucis technique empêche l'envoie de ce message. Veuillez réessayer ultérieurement");        
                }
        );
        }else{
            this.presentToast("Veuillez renseigner votre adresse email et un message.");
        }
        
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present();
      }
}