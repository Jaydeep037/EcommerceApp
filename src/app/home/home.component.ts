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
  pageNumber : number = 0;
  showProductbutton = false;
  constructor(private productService :  ProductService,
    private imageProcessingService:ImageProcessingService,
    private router :Router
    ) { }
  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchKey: string) {
    console.log(searchKey);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKey);
  }


  public getAllProducts(searchKey :string ="") {
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((products: Product[]) => products.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
    .subscribe(
      (response : Product []) => {
        // for(let i =0;i<response.length; i ++){
        //   this.imageProcessingService.createImages(response[i]);
        // }
       console.log(response);
       if(response.length ==4){
        this.showProductbutton = true;
       }else{
        this.showProductbutton = false;
       }
       response.forEach(product=>this.productDetails.push(product));
      },(error : HttpErrorResponse) =>{
        console.log(error);
      });
  }

  public showProductDetails(productId :number) {
    this.router.navigate(['productViewDetails',{productId:productId}])
  }

  loadMoreProduct(){
    this.pageNumber = this.pageNumber +1;
    this.getAllProducts();
  }
}
