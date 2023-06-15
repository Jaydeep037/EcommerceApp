import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  constructor(private productService :  ProductService,
    public imageDialog : MatDialog,
    private imageProcessingService : ImageProcessingService,
    private router :Router
    ) { }
  products: Product[] = [];
  displayedColumns: string[] = ['Id','Product Name', 'description', 'Product Actual Price','Product Discounted Price','Actions'];


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
       this.products = response;
      },(error : HttpErrorResponse) =>{
        console.log(error);
      });
  }

  deleteProduct(productId :number) {
    this.productService.deleteProducts(productId).subscribe(
      (response) => {
        console.log(response);
      this.getAllProducts();
      },(error : HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }


  editProduct(productId :number) {
    console.log(productId);
    this.router.navigate(['/addNewProduct',{productid :productId}]);  
    }


  showImages(product : Product) {
    this.imageDialog.open(ShowProductImagesDialogComponent, {
      data : {
        images : product.productImages
      },
      height:'500px',
      width : '800px'
    });
  }
}

