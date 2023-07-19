import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Id','Product Name','Name','Address', 'Contact No.', 'Status','Actions'];
  orderDetails : MyOrderDetails[] = [];
  constructor(private productService : ProductService){}

  status : string ="All"
  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
  }

  getAllOrderDetails(orderStatus : string){
    this.productService.getAllOrderDetail(orderStatus).subscribe(
      (response : MyOrderDetails[])=>{
        this.orderDetails = response;
      console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  markAsDelivered(orderId : number){
    this.productService.markAsDelivered(orderId).subscribe(
      (response)=>{
        console.log(response);
        this.getAllOrderDetails(this.status)
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
