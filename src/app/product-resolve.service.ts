import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor( private productService : ProductService,private imageProcessingService : ImageProcessingService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productid");
    if (id) {
      // we have to fetch details from backend
       return this.productService.getProductDetailsById(parseInt(id))
       .pipe(
        map(p=>this.imageProcessingService.createImages(p))
       )
    } else {
      // return empty product observable
      return of(this.getProductDetails());
    }
  }
  
  getProductDetails() {
    return {
      productId : 0,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }
  }
}