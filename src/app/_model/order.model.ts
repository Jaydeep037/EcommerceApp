import { Product } from "./product.model"

export interface MyOrderDetails {
    orderId :number,
    orderFullName: string,
    email:string,
    orderFullOrder :string,
    orderContactNumber :string,
    orderAlternateContantNumber : string,
    orderStatus: string,
    orderAmount : number 
    product :Product,
    user : any 

}