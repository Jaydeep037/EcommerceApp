import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  user : User = {
    userName: '',
    userFirstName: '',
    userLastName: '',
    password: ''
  }
  constructor(private userService : UserService,
    private activatedRoute : ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    
  }


  register(_registerForm : NgForm){
    const userData = this.userService.register(this.user).subscribe(
      (response) =>{
        console.log(response)
        this.router.navigate(['/login'])
      },(error)=>{
        console.log(error);
      }
    )
  }
}
