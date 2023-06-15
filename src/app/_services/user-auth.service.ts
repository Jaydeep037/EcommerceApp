import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:any[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }

  public getRoles() : any[] {
    const rolesString = localStorage.getItem('roles');
    if (rolesString) {
      return JSON.parse(rolesString);
  } else {
      return [];
  }
  }

  public setToken(token : string) {
    localStorage.setItem('jwtToken',token);
  }

  public getToken(){
    return localStorage.getItem('jwtToken');
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }

  public isAdmin(){
     const role:any[] = this.getRoles();
     return role[0].roleName =='Admin'
  }

  public isUser(){
    const role:any[] = this.getRoles();
    return role[0].roleName =='User'
 }

}
