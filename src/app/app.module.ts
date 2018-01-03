import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
// Custom imports
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MainComponent } from '../main/main.component';
import { ArticlesComponent } from '../main/articles.component';
import { SingleAlineaComponent } from '../main/single.alinea.component';
import { ArticleComponent } from '../main/article.component';
import { TitreComponent } from '../main/titre.component';
import { TitresComponent } from '../main/titres.component';
import { HomePage } from '../main/home.page.component';
import { CreateProfile } from '../forms/create.profile';
import { LoginFormComponent } from '../forms/login.component';
import {ConfirmEmail} from '../forms/confirm.email';
// import {VoteSnack} from '../snackbar/vote.snack.component';
import {DashBoardComponent} from '../main/dash.board.component';
import {EnsembleComponent} from '../main/ensemble.component';
import {InsufficiantPrivilegesComponent} from '../forms/insufficiant.privileges.component';
import { PropositionsComponent } from "../forms/propositions.component";
import { PropositionComponent } from "../forms/proposition.component";
import { RestService } from '../services/rest.service';
import { ArticleSubject } from '../services/article.subject';
// import { WindowService } from '../services/window.service';
import { LoginNotifier } from '../services/login.notifier';
import {NewArticleHandler} from '../services/new.article.handler';
import { UserStatComponent } from "./user-stat/user-stat.component";
import { GeneralStatComponent } from "./general-stat/general-stat.component";
import { ResumeVotesComponent } from "../main/resume.vote.component";
// End custom imports
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalHostComponent } from "../forms/modal.host.component";
import { SettingComponent } from "../main/setting.component";
import { ContactUsComponent } from "../main/contact.us.component";
import { AboutComponent } from "../main/about.component";
import { UserVoteComponent } from "../charts/user.votes";
import { WindowService } from "../services/window.service";



@NgModule({
  declarations: [
    MyApp,
    MainComponent,
    ArticlesComponent,
    SingleAlineaComponent,
    PropositionComponent,
    ArticleComponent,
    TitresComponent,
    TitreComponent,
    HomePage,
    CreateProfile,
    EnsembleComponent,
    DashBoardComponent,    
    LoginFormComponent,
    ConfirmEmail,
    InsufficiantPrivilegesComponent,
    UserStatComponent,
    GeneralStatComponent,
    ResumeVotesComponent,
    PropositionsComponent,
    PropositionComponent,
    ModalHostComponent,
    SettingComponent,
    ContactUsComponent,
    AboutComponent,
    UserVoteComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainComponent,
    LoginFormComponent,
    PropositionsComponent,
    ModalHostComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginNotifier,
    NewArticleHandler,ArticleSubject,RestService,
    WindowService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
