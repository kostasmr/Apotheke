import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BagService } from 'src/app/services/bag.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  bagQuantity=0;
  user!:User;
  
  constructor(bagService: BagService, private userService:UserService,
    private router:Router){ 
    bagService.getBagObservable().subscribe((newBag) =>{
      this.bagQuantity = newBag.totalCount;
    })

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  } 

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout(this.user.id);
    this.router.navigateByUrl("/");
  }

  get isAdmin(){
    return this.user.isAdmin;
  }

  get isAuth(){
    return this.user.token;
  }
}
