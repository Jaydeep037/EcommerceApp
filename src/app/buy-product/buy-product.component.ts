import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId : '',
    orderProductQuantityList: []
  }

  public isSingleProductCheckout :boolean = false;
  constructor(private activateRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productDetails = this.activateRoute.snapshot.data["productDetails"];
    const isSingleProductCheckoutString = this.activateRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.isSingleProductCheckout = (isSingleProductCheckoutString === 'true');
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    )
    
  }

  placeOrder(_orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/confirmation']);
        _orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onQuantityChanged(q :number,productId :number){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId === productId
    )[0].quantity = q;
  }

  getQuantityForProduct(productId:number){
    const filterProduct=this.orderDetails.orderProductQuantityList.filter(
      (quantity)=> quantity.productId==productId
    );
    return filterProduct[0].quantity;
  }
  getCalculatedTotal(productId :number,productDiscountedPrice :number){
    const filterProduct=this.orderDetails.orderProductQuantityList.filter(
      (quantity)=> quantity.productId==productId
    );
    return filterProduct[0].quantity * productDiscountedPrice;
  }
  getCalculatedGrandTotal(){
    let grandTotal =0;
     this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price= this.productDetails.filter(
         product=>product.productId == productQuantity.productId
        )[0].productDiscountedPrice;
        grandTotal = grandTotal +price * productQuantity.quantity;
      })
      return grandTotal;
  }
  createTransactionAndPlaceOrder(orderForm :NgForm){
    let amount = this.getCalculatedGrandTotal();
this.productService.createtransaction(amount).subscribe(
  (response)=>{
    console.log(response);
    this.openTransactionModal(response,orderForm);
  },
  (error)=>{
    console.log(error);
  }
)
  }

  openTransactionModal(response : any,orderForm:NgForm){
    var options = {
      order_id : response.orderId,
      key : response.key,
      amount : response.amount,
      currency : response.currency,
      name : 'jaydeep',
      description : 'Payment of online shopping',
      Image : 'https://media.istockphoto.com/id/1440711628/photo/copenhagen-denmark.webp?b=1&s=612x612&w=0&k=20&c=1evENE9IbiTW5tGs6gfqr0megCa3ix5Tih8B9Djj0Tk=',
      handler : (response :any)=>{
        if(response !=null && response.razorpay_payment_id !=null){
          this.processResponse(response,orderForm);
        }else{
          alert("Payment failed.....!!")
        }
       
      },
      prefill : {
        name : 'ABC',
        email : 'jaydeepingale3464@gmail.com',
        contact : '9518587532'
      },
      notes:{
        address : 'Online Shopping'
      },
      theme : {
        color : '#F37254'
      }
    }
    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }
  processResponse(response:any,orderForm:NgForm){
    this.orderDetails.transactionId = response.razorpay_payment_id; 
    this.placeOrder(orderForm);
    console.log(response);
  }
}
