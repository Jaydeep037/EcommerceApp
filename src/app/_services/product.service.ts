import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { environment } from 'src/environments/environment';
import { environmentprod } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl : string

  constructor(private httpClient :  HttpClient)
   {
      this.apiUrl = isDevMode() ? environment.apiUrl : environmentprod.apiUrl;
  }
  
  // apiUrl = "http://localhost:9090";


  createtransaction(amount :number){
    return this.httpClient.get(this.apiUrl+"/transaction/"+amount);
  }

  addProduct(product : FormData){
    return this.httpClient.post<Product>(this.apiUrl + "/addNewProduct",product)
  }

  public getAllProducts(pageNumber : number,searchKeyword :string=""){
    return this.httpClient.get<Product[]>(this.apiUrl + "/allProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword)
  }

  public deleteProducts(productId : number) {
    return this.httpClient.delete(this.apiUrl + "/deleteProducts/"+productId)
  }

  public editProduct(productId : number,product : FormData) {
    return this.httpClient.put(this.apiUrl + "/editProduct/"+productId,product);
  }

  public getProductDetailsById(productId : number) {
    return this.httpClient.get<Product>(this.apiUrl +"/getProductDetailsById/"+productId );
  }

  public getProductDetails(isSingleProductCheckout :boolean,productId :number){
    return this.httpClient.get<Product[]>(this.apiUrl+"/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails :OrderDetails,isCheckOut:boolean){
    return this.httpClient.post(this.apiUrl+"/placeorder/"+isCheckOut,orderDetails);
  }

  public addToCart(productId : number) {
    return this.httpClient.post(this.apiUrl+"/newCart/"+productId,{});
  }
  public getCartDetails(){
    return this.httpClient.get(this.apiUrl+"/getCartDetails",{});
  }
  public deleteCart(cartId :number){
    return this.httpClient.delete(this.apiUrl+"/deleteCart/"+cartId);
  }

  public getMyOrderDetails(){
    return this.httpClient.get<MyOrderDetails []>(this.apiUrl+"/getOrderDetails");
  }
  public getAllOrderDetail(status : string){
    return this.httpClient.get<MyOrderDetails[]>(this.apiUrl+"/getAllOrders/"+status);
  }

  public markAsDelivered(orderId : number){
    return this.httpClient.get(this.apiUrl+"/markAsDelivered/"+orderId);
  }
}