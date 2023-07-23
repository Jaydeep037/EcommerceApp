import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient :  HttpClient) { }
  
  PATH_OF_API = "http://localhost:9090";

  createtransaction(amount :number){
    return this.httpClient.get(this.PATH_OF_API+"/transaction/"+amount);
  }

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

  public placeOrder(orderDetails :OrderDetails,isCheckOut:boolean){
    return this.httpClient.post(this.PATH_OF_API+"/placeorder/"+isCheckOut,orderDetails);
  }

  public addToCart(productId : number) {
    return this.httpClient.post(this.PATH_OF_API+"/newCart/"+productId,{});
  }
  public getCartDetails(){
    return this.httpClient.get(this.PATH_OF_API+"/getCartDetails",{});
  }
  public deleteCart(cartId :number){
    return this.httpClient.delete(this.PATH_OF_API+"/deleteCart/"+cartId);
  }

  public getMyOrderDetails(){
    return this.httpClient.get<MyOrderDetails []>(this.PATH_OF_API+"/getOrderDetails");
  }
  public getAllOrderDetail(status : string){
    return this.httpClient.get<MyOrderDetails[]>(this.PATH_OF_API+"/getAllOrders/"+status);
  }

  public markAsDelivered(orderId : number){
    return this.httpClient.get(this.PATH_OF_API+"/markAsDelivered/"+orderId);
  }
}