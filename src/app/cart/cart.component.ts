import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Actual Price', 'Discounted Price'];

  cartDetails :any = [];
  constructor(private productService : ProductService,
    ){}
  ngOnInit(): void {
   this.getCartDetails();
  }


  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response)=>{
        this.cartDetails = response;
        console.log(this.cartDetails);
      },
      (error)=>{
      console.log(error);
      }
    )
  }

}
