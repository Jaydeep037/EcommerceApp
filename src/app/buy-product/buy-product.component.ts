import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }

  constructor(private activateRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productDetails = this.activateRoute.snapshot.data["productDetails"];
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    )
  }

  placeOrder(_orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (response) => {
        console.log(response);
        _orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
