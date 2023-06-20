import { Component,OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorFlag: boolean = false; 

  constructor(
    private userService:UserService,
    private userAuthService:UserAuthService,
    private router:Router
    ) { }

  ngOnInit(): void { }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
    (response)=>{
      this.errorFlag = false;
      this.userAuthService.setToken((response as any).token);
      this.userAuthService.setRoles((response as any).user.role);
      
      const role = (response as any).user.role[0].roleName;
      if(role === 'Admin'){
        this.router.navigate(['/admin']);
      }else{
        this.router.navigate(['/user']);
      }
    },
    (error)=>{
      this.errorFlag = true;
      console.error(error);
    }
    );
  }
  register(){
    this.router.navigate(['/register']);
  }
}