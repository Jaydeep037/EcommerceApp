import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeaders = new HttpHeaders(
    { "No-Auth": "True" }
  )
  constructor(private httpclient: HttpClient
    ,private userAuthService : UserAuthService
    ) { }

  public login(logindata: any) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", logindata, { headers: this.requestHeaders })
  }

  public forUser(){
    return this.httpclient.get(this.PATH_OF_API + '/forUser',{responseType : "text"});
  }

  public forAdmin(){
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin',{responseType : "text"});
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
    return this.httpclient.post(this.PATH_OF_API + '/registerNew',user);
  }
}
