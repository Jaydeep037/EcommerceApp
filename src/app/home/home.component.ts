import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  productDetails :any = [];
  constructor(private productService :  ProductService,
    private imageProcessingService:ImageProcessingService,
    private router :Router
    ) { }
  ngOnInit(): void {
    this.getAllProducts();
  }



  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((products: Product[]) => products.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
    .subscribe(
      (response : Product []) => {
        // for(let i =0;i<response.length; i ++){
        //   this.imageProcessingService.createImages(response[i]);
        // }
       console.log(response);
       this.productDetails = response;
      },(error : HttpErrorResponse) =>{
        console.log(error);
      });
  }

  public showProductDetails(productId :number) {
    this.router.navigate(['productViewDetails',{productId:productId}])
  }
}
