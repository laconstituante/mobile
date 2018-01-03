import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../dto/user';
import { RestService } from '../services/rest.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmEmail } from './confirm.email';
import { ModalController } from 'ionic-angular';
import { ModalHostComponent } from "../forms/modal.host.component";


@Component({
    selector: 'create-profile',
    templateUrl: './create.profile.html',
    entryComponents: [ConfirmEmail]
})
export class CreateProfile implements OnInit {
    user: UserProfile = new UserProfile();
    isLoggedIn: boolean = false;
    error: string;
    passwordConfirm: string;
    isfrench: boolean = true;
    createUserForm: FormGroup;
    isntFrance: boolean = true;
    minDate:string;
    genders = [
        { value: '0', viewValue: 'Me.' },
        { value: '1', viewValue: 'Mr.' }
    ];
    yesNoOptions = [
        {label : 'Oui' , value: true},
        {label : 'Non' , value: false}
    ];
    ngOnInit() {
        let now = new Date();
        now.setFullYear(now.getFullYear() -16);
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        this.minDate = `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`;
        this.user.isfrench = false;
        this.isLoggedIn = this.rest.isLoggedIn();

    }


    constructor(private rest: RestService, 
                private formBuilder: FormBuilder, 
                public modalCtrl: ModalController) {
        this.createUserForm = this.formBuilder.group({
            email: [null, Validators.compose([Validators.maxLength(100), Validators.email, Validators.required])],
            civilite: [null, Validators.required],
            firstname: [null, Validators.compose([Validators.maxLength(30), Validators.pattern('[A-za-z ]*'), Validators.required])],
            lastname: [null, Validators.compose([Validators.maxLength(30), Validators.pattern('[A-za-z ]*'), Validators.required])],
            password: [null, Validators.compose([Validators.maxLength(30), Validators.required])],
            confirmpassword: [null, Validators.compose([Validators.maxLength(30), Validators.required])],
            dateofbirth: [null, Validators.required],
            isfrench: [null, Validators.required],
            isfrance: [null, Validators.required],
            country: [null, null],
            codePostal: [null, Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9]{5}')])]
        });
        this.createUserForm.valueChanges.subscribe(control => {                
                this.isntFrance = !(control.isfrance == "true");
        });

    }
    onSubmit() {
        this.error = null;
        if (this.createUserForm.value.password !== this.createUserForm.value.confirmpassword) {
            this.error = 'Le mot de passe saisi et sa confirmation ne se correspondent pas.' ;
            return;
        }
        this.user.civilite = this.createUserForm.value.civilite;
        this.user.codePostal = this.createUserForm.value.codePostal;
        this.user.dateofbirth = this.createUserForm.value.dateofbirth;
        this.user.email = this.createUserForm.value.email;
        this.user.firstname = this.createUserForm.value.firstname;
        this.user.isfrench = this.createUserForm.value.isfrench;
        this.user.lastname = this.createUserForm.value.lastname;
        this.user.password = this.createUserForm.value.password;
        if (this.createUserForm.value.isfrance == "true") {
            this.user.country = 'France';
        } else {
            this.user.country = this.createUserForm.value.country;
            this.user.codePostal = '99999';
        }
        this.rest.createAccount(this.user).subscribe(
            success => {
                if (!success.error) {
                    this.rest.setUserProfile(success.entity);
                    if (success.entity.user_id) {
                        let modal = this.modalCtrl.create(ModalHostComponent, { view: 'confirm-email', value: null, title: 'Validation de votre email..' });
                        modal.present();
                        localStorage.setItem('useremail', this.user.email);
                    }
                } else {
                    this.error = success.message;
                }

        }, error => {
            this.error = error;
        });
    }
}