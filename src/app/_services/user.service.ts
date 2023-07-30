import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from '../_model/user.model';
import { environment } from 'src/environments/environment';
import { environmentprod } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl : string

  requestHeaders = new HttpHeaders(
    { "No-Auth": "True" }
  )
  constructor(private httpclient: HttpClient
    ,private userAuthService : UserAuthService
    ) { 
      this.apiUrl = isDevMode() ? environment.apiUrl : environmentprod.apiUrl;
    }

  public login(logindata: any) {
    return this.httpclient.post(this.apiUrl + "/authenticate", logindata, { headers: this.requestHeaders })
  }

  public logout(){
    return this.httpclient.post(this.apiUrl+"/logout",{});
  }

  public forUser(){
    return this.httpclient.get(this.apiUrl + '/forUser',{responseType : "text"});
  }

  public forAdmin(){
    return this.httpclient.get(this.apiUrl + '/forAdmin',{responseType : "text"});
  }
  

  public roleMatch (allowedRoles :any[]): boolean{
    let isMatch = false;
    const userRoles : any = this.userAuthService.getRoles();
    if(userRoles !=null && userRoles){ 
      for(let i =0; i <userRoles.length;i++){
        for(let j =0; j <allowedRoles.length;j++) {
              if(userRoles[i].roleName ===  allowedRoles[j]){
                isMatch = true;
                return isMatch;
              }else{
                return isMatch;
              }
        }
      }
    }
    return isMatch;
  }

  public register (user : User) {
    return this.httpclient.post(this.apiUrl + '/registerNew',user);
  }
}
