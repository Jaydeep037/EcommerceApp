import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Id','Product Name','Name','Address', 'Contact No.', 'Status'];
  orderDetails : MyOrderDetails[] = [];
  constructor(private productService : ProductService){}
  ngOnInit(): void {
    this.getAllOrderDetails();
  }

  getAllOrderDetails(){
    this.productService.getAllOrderDetail().subscribe(
      (response : MyOrderDetails[])=>{
        this.orderDetails = response;
      console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
