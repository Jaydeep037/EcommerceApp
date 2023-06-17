import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
}) 
     
export class ProductViewDetailsComponent implements OnInit {
  product: Product = {} as Product;
  previewIndex :number =0;

constructor(
  private activateRoute :ActivatedRoute,
  private router : Router
){}

  
  ngOnInit() : void {
    this.product = this.activateRoute.snapshot.data['product'];
    console.log(this.product);
  }

  previewImage(index :number){
    this.previewIndex = index;
    console.log(this.previewIndex);
  }

  buyProduct(productId : number){
    this.router.navigate(['/buyProduct',{isSingleProductCheckout : true,productId:productId}]);
  }

}
