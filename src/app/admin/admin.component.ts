import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  constructor(private userService :UserService){}
  ngOnInit(): void {
    this.forAdmin();

  }
  message!: string;
  forAdmin() {
  const observable = this.userService.forAdmin();
  observable.subscribe({
    next: (response) => {
      console.log(response);
      this.message = response;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log('Observable completed');
    }
  });
}
}
