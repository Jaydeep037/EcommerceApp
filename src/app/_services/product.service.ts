import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient :  HttpClient) { }
  
  PATH_OF_API = "http://localhost:9090";

  addProduct(product : FormData){
    return this.httpClient.post<Product>(this.PATH_OF_API + "/addNewProduct",product)
  }

  public getAllProducts(pageNumber : number,searchKeyword :string=""){
    return this.httpClient.get<Product[]>(this.PATH_OF_API + "/allProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword)
  }

  public deleteProducts(productId : number) {
    return this.httpClient.delete(this.PATH_OF_API + "/deleteProducts/"+productId)
  }

  public editProduct(productId : number,product : FormData) {
    return this.httpClient.put(this.PATH_OF_API + "/editProduct/"+productId,product);
  }

  public getProductDetailsById(productId : number) {
    return this.httpClient.get<Product>(this.PATH_OF_API +"/getProductDetailsById/"+productId );
  }

  public getProductDetails(isSingleProductCheckout :boolean,productId :number){
    return this.httpClient.get<Product[]>(this.PATH_OF_API+"/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails :OrderDetails){
    return this.httpClient.post(this.PATH_OF_API+"/placeorder",orderDetails);
  }
}