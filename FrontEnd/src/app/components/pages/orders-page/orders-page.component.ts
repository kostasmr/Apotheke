import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';
import { UserFormPageComponent } from '../../forms/user-form-page/user-form-page.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']})
export class OrdersPageComponent implements OnInit{
  orders: Order[] = []
  searchTerm = '';
  user!:User;
  order!: Order;
  products!: { name: any; quantity: any; }[];

  constructor(private orderService: OrderService,
    private userService: UserService,
    activatedRoute:ActivatedRoute,
    private router:Router,
    private _dialog: MatDialog){

      let orderObservable: Observable<Order[]>;
      activatedRoute.params.subscribe((params) => {
        
        userService.userObservable.subscribe((newUser) =>{
          this.user = newUser;
        })

        orderObservable = orderService.getAllUserOrders(this.user.email);
        
        orderObservable.subscribe((serverOrders) => {
          this.orders = serverOrders;
        })
      })
  }

  viewOrder(data: any){
    const dialogRef = this._dialog.open(OrderFormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  get isAdmin(){
    return this.user.isAdmin;
  }

  search(term: string): void{
    //todo
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
