import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, map } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product | Product[]> {

  constructor(private productService :ProductService
    ,private imageProcessingService :ImageProcessingService) { }

  resolve (route : ActivatedRouteSnapshot ,state :RouterStateSnapshot) :Product []| Observable<Product[]>| Promise<Product>{
    const productId = parseInt(route.paramMap.get('productId') || '', 10);
    const isSingleProductCheckout = Boolean(route.paramMap.get('isSingleProductCheckout'));
        return this.productService.getProductDetails(isSingleProductCheckout,productId)
        .pipe(
          map(
            (x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))
          )
        );
  }
}
