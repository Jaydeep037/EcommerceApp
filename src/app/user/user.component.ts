import { Component,OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private userService :UserService){}
  ngOnInit(): void {
    this.forUser();

  }
  message!: string;
forUser() {
  const observable = this.userService.forUser();
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
