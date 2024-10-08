import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EditPageComponent } from './components/forms/edit-page/edit-page.component';
import { BagPageComponent } from './components/pages/bag-page/bag-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { UserFormPageComponent } from './components/forms/user-form-page/user-form-page.component';
import { UserProfilePageComponent } from './components/pages/user-profile-page/user-profile-page.component';
import { SupplierPageComponent } from './components/pages/supplier-page/supplier-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { OrderFormComponent } from './components/forms/order-form/order-form.component';
import { ResetPasswordPageComponent } from './components/pages/reset-password-page/reset-password-page.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'search/:searchTerm', component:HomeComponent },
  { path: 'product/:id', component: EditPageComponent },
  { path: 'editPage/:product', component: EditPageComponent},
  { path: 'bag-page', component: BagPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'users-page', component: UsersPageComponent},
  { path: 'users/:id', component: UserFormPageComponent },
  { path: 'profile', component: UserProfilePageComponent },
  { path: 'searchUser/:searchTerm', component:UsersPageComponent },
  { path: 'supplier-page', component: SupplierPageComponent},
  { path: 'searchSupplier/:searchTerm', component: SupplierPageComponent},
  { path: 'logout', component: LoginPageComponent},
  { path: 'orders-page', component: OrdersPageComponent},
  { path: 'order/:id', component: OrderFormComponent},
  { path: 'reset-password-page', component: ResetPasswordPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
