import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  constructor(private productService : ProductService){}
  displayedColumns : string[] =["Name","Email","Address","Contact No.","Amount","Status"]

  orderDetails : MyOrderDetails[] = [];

  ngOnInit(): void {
   this.getMyOrderDetails();
  }


 getMyOrderDetails(){
  this.productService.getMyOrderDetails().subscribe(
    (response : MyOrderDetails[])=>{
      this.orderDetails = response;
    },
    (error)=>{
      console.log(error);
    }
  )
 }

}
