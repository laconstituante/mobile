import { Injectable }  from '@angular/core';
import { Http, Headers, Response, RequestOptions }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Titre } from '../dto/titre';
import { Article } from '../dto/article';
import { Alinea } from '../dto/alinea';
import { Proposition } from '../dto/proposition';
import { Constitution } from '../dto/constitution';
import { UserProfile } from '../dto/user';
import {LoginObject} from '../dto/loginObject';
import {ApiResponse} from '../dto/api.response';
import {AuthObject} from '../dto/auth.obj';
import {UserStat} from '../dto/user.stat';
import { Eligibility } from '../dto/eligibility';
import { TitreStat } from "../dto/titre.stat";
import { Contact } from "../dto/contact";

@Injectable()
export class RestService {
    private baseUrl = 'https://www.laconstituante.com/api';
    private isAuthenticated:boolean = false;
    private authObj:AuthObject = null;
    userProfile:UserProfile;
    currentEligibility:Eligibility;
    parent_alinea_id:string;
    constructor (private http:Http) {
      
    }
    setParentAlineaId(alinea_id:string){
      this.parent_alinea_id = alinea_id
    }
    getParentAlineaId(){
      return this.parent_alinea_id;
    }
    setEligibility(eligibility:Eligibility){
      this.currentEligibility = eligibility;
    }
    getEligibility(){
      return this.currentEligibility;
    }
    setUserProfile(user:UserProfile){
      this.userProfile = user;
    }
    getUserProfile(){
      return this.userProfile;
    }
    setAuth(auth:AuthObject){
      localStorage.clear();
      localStorage.setItem('api_token',auth.api_token);
      this.authObj = auth;
      this.isAuthenticated = true;
    }
    logOut(){
      this.authObj.api_token = null;
      this.isAuthenticated = false;
      localStorage.clear();
      localStorage.setItem('isFirstVisit','true');
    }
    getConstitutions():Observable<Constitution[]>{
        return this.http.get(this.baseUrl + '/getConstitutions')
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    getTitres():Observable<Titre[]>{
        return this.http.get(this.baseUrl + '/getTitres')
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    getTitresFromConstitution(constitution_id):Observable<Titre[]>{
        return this.http.get(this.baseUrl + '/getTitresFromConstitution/'+constitution_id)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    getArticlesFromTitre(titre_id):Observable<Article[]>{
        return this.http.get(this.baseUrl + '/getArticlesByTitre/' + titre_id)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    getAlineas(article_id):Observable<ApiResponse<Alinea[]>>{
        if(this.isAuthenticated){
          let headers = new Headers({ 'Content-Type': 'application/json','AuthenticationKey':this.authObj.api_token });
          return this.http.get(this.baseUrl + '/getAllAlineasByArticleIdAuth/' + article_id, { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
        }else{
          return this.http.get(this.baseUrl + '/getAllAlineasByArticleId/' + article_id)
                      .map(this.extractData)
                      .catch(this.handleError);
        }
    }

    get(url:string,isAuthenticated:boolean):Observable<ApiResponse<any[]>>{
      if(this.isAuthenticated){
        let headers = new Headers({ 'Content-Type': 'application/json','AuthenticationKey':this.authObj.api_token });
        return this.http.get(this.baseUrl + url , { headers:headers })
                    .map(this.extractData)
                    .catch(this.handleError);
      }else{
        return this.http.get(this.baseUrl + url)
                    .map(this.extractData)
                    .catch(this.handleError);
      }
  }
   
    getPropositionsFromAlinea(alinea_id):Observable<ApiResponse<Proposition[]>>{
      if(this.isLoggedIn()){
        return this.getPropositionsFromAlineaAuth(alinea_id);
      }else 
        return this.http.get(this.baseUrl + '/getPropositionsFromAlinea/' + alinea_id)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    getPropositionsFromAlineaAuth(alinea_id):Observable<ApiResponse<Proposition[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        this.addAuthencationToHeaders(headers);
        return this.http.get(this.baseUrl + '/getPropositionsFromAlineaAuth/' + alinea_id, { headers:headers })
                    .map(this.extractData)
                    .catch(this.handleError);
      }else{
        return null;
      }
    }
    getUserStat():Observable<ApiResponse<UserStat[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json','AuthenticationKey':this.authObj.api_token });
          return this.http.get(this.baseUrl+'/getUserStat', { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
    }
    getUserStatTitres():Observable<ApiResponse<TitreStat[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json','AuthenticationKey':this.authObj.api_token });
          return this.http.get(this.baseUrl+'/getUserStatTitres', { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
    }
    getGlobalStat():Observable<ApiResponse<UserStat[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json'});
          return this.http.get(this.baseUrl+'/getGlobalStat', { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
    }
    createProposition(proposition:Proposition):Observable<ApiResponse<Proposition[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        this.addAuthencationToHeaders(headers);
        let options = new RequestOptions({ headers: headers }); 
          return this.http.post(this.baseUrl+'/createProposition', this.getEncodedObj(proposition), options)
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
        
    }

    contactUs(contact:Contact):Observable<ApiResponse<any>>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.baseUrl +'/contactUsMobile',this.getEncodedObj(contact), options)
                    .map(this.extractData)
                    .catch(this.handleError);
        
    }

    createAccount(user:UserProfile):Observable<ApiResponse<UserProfile>>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({headers: headers}); 
        return this.http.post(this.baseUrl+'/createUser', this.getEncodedObj(user), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    loginUser(user:LoginObject):Observable<ApiResponse<AuthObject>>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.baseUrl+'/loginUser', this.getEncodedObj(user), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    voteAlinea(alinea:Alinea):Observable<ApiResponse<Alinea>>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.addAuthencationToHeaders(headers);
      let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.baseUrl+'/voteAlinea', this.getEncodedObj(alinea), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    voteProposition(proposition:Proposition):Observable<ApiResponse<Proposition>>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      this.addAuthencationToHeaders(headers);
      let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.baseUrl+'/voteProposition', this.getEncodedObj(proposition), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    isLoggedIn():boolean{
      let isLoggedIn = false;
      //In the event of page refresh (F5), we try to locate the api_key in key storage
      if(!this.authObj || !this.authObj.api_token){
        if(localStorage.getItem('api_token')){
          let timeout:number = localStorage.getItem('timeout') ? parseInt(localStorage.getItem('timeout')) : 0;
          let now = new Date();

          if(timeout > 0){
            if(timeout > now.getTime()){
              this.authObj.api_token = localStorage.getItem('api_token');
              //this.authObj.timeout = parseInt(localStorage.getItem('timeout'));
              isLoggedIn = true;
            }
          }else{
              this.authObj = new AuthObject(localStorage.getItem('api_token'),localStorage.getItem('timeout'));
              this.authObj.api_token = localStorage.getItem('api_token');
              //this.authObj.timeout = parseInt(localStorage.getItem('timeout'));
              isLoggedIn = true;
          }
        }
      }else{

        isLoggedIn = true;
      }
      this.isAuthenticated = isLoggedIn;
      return this.isAuthenticated;
    }
    confirmEmail(confirmationDetails:any):Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers }); 
        return this.http.post(this.baseUrl+'/confirmEmail', this.getEncodedObj(confirmationDetails), options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }
    get6RepublicEligibility():Observable<ApiResponse<Eligibility>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        this.addAuthencationToHeaders(headers);
          return this.http.get(this.baseUrl+'/get6RepublicEligibility', { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
    }
    getNextAlineas():Observable<ApiResponse<Titre[]>>{
      if(this.authObj.api_token){
        let headers = new Headers({ 'Content-Type': 'application/json'});
        this.addAuthencationToHeaders(headers);
          return this.http.get(this.baseUrl+'/getNextAlineas', { headers:headers })
                      .map(this.extractData)
                      .catch(this.handleError);
      }else{
        return null;
      }
    }
   private addAuthencationToHeaders(headers:Headers){
    headers.append('AuthenticationKey',this.authObj.api_token);
   }
   private extractData(res: Response) {
     let body = res.json();     
     return body.data || { };
   }
   public getEncodedObj(obj:any):string{      
      if(obj){
        let encodedstring = [];
        for(var p in obj)
          if (obj.hasOwnProperty(p)) {
            encodedstring.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
         return encodedstring.join("&");
      }
      return null;
   }
   private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = body.message;//`${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error ?  (error.message ? error.message : error.toString() ) : 'Une erreur est survenu. Veuillez reessayer plus tard.';
    }    
    console.log(errMsg);    
    return Observable.throw(typeof (error) === 'object' ? error.json() : error);
  }
}