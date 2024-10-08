import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../shared/models/Order';
import { ORDERS_BY_USER_URL, ORDERS_URL, ORDER_BY_ID_URL } from '../shared/constants/urls';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient, private productService: ProductService) { 
  }

  getOrderByid(orderId:string):Observable<Order>{
    return this.http.get<Order>(ORDER_BY_ID_URL + orderId);
  }

  getAllUserOrders(email: string): Observable<Order[]>{
    return this.http.get<Order[]>(ORDERS_BY_USER_URL + email);
  }

  addOrder(email: string,data: any): Observable<any> {
    const order = new Order();
    const products = [];
    for(const item of data.items){
      const product = {name: item.product.name, quantity: item.product.bagQuantity};
      products.push(product);
      this.productService.updateProductQuantity(product).subscribe();
    }
    order.supplier = '';
    order.supplier_code = '';
    order.products = products;
    order.user = email;
    return this.http.post(ORDERS_BY_USER_URL + email, order);
  }
}
