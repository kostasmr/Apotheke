import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SearchComponent } from './components/partials/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { EditPageComponent } from './components/forms/edit-page/edit-page.component';
import { BagPageComponent } from './components/pages/bag-page/bag-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToastrModule } from 'ngx-toastr';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormPageComponent } from './components/forms/user-form-page/user-form-page.component';
import { UserProfilePageComponent } from './components/pages/user-profile-page/user-profile-page.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageModule } from 'primeng/image';
import { RegisterPageComponent } from './components/forms/register-page/register-page.component';
import { SupplierPageComponent } from './components/pages/supplier-page/supplier-page.component';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule } from 'primeng/fieldset';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarModule } from 'primeng/sidebar';
import { SplitterModule } from 'primeng/splitter';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { OrderFormComponent } from './components/forms/order-form/order-form.component';
import { ResetPasswordPageComponent } from './components/pages/reset-password-page/reset-password-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    EditPageComponent,
    BagPageComponent,
    LoginPageComponent,
    UsersPageComponent,
    UserFormPageComponent,
    UserProfilePageComponent,
    RegisterPageComponent,
    SupplierPageComponent,
    OrdersPageComponent,
    OrderFormComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    HttpClientModule,
    ReactiveFormsModule,
    DividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ImageModule,
    MessagesModule,
    FieldsetModule,
    ConfirmDialogModule,
    MatSidenavModule,
    MatDividerModule,
    SidebarModule,
    SplitterModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
