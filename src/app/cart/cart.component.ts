import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Actual Price', 'Discounted Price',"Actions"];

  cartDetails :any = [];
  constructor(private productService : ProductService,
    private router :Router
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

  checkout(){
    this.router.navigate(['/buyProduct',{isSingleProductCheckout : false,productId:0}]);
    // this.productService.getProductDetails(false,0).subscribe(
    //   (response)=>{
    //     console.log(response);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )
  }

  deleteCart(cartId:number){
    this.productService.deleteCart(cartId).subscribe(
      (response)=>{
        this.getCartDetails();
       console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
