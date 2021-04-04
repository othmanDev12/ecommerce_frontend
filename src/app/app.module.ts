import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { DashbordComponent } from './dashbord/dashbord/dashbord.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { ToggleSidebarComponent } from './toggle-sidebar/toggle-sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { ListCustomersComponent } from './customers/list-customers/list-customers.component';
import { ListPromotionsComponent } from './promotions/list-promotions/list-promotions.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { FooterComponent } from './footer/footer/footer.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { DetailCategoriesComponent } from './categories/detail-categories/detail-categories.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {UsersService} from './shared/users.service';
import {NotificationModule} from './notificationModule/notification.module';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    SidebarComponent,
    ToggleSidebarComponent,
    ListUsersComponent,
    ListCategoriesComponent,
    ListProductsComponent,
    ListCustomersComponent,
    ListPromotionsComponent,
    ListOrdersComponent,
    FooterComponent,
    DarkModeComponent,
    CreateUserComponent,
    UsersComponent,
    UserDetailComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    DetailCategoriesComponent,
    ProductsComponent,
    CreateProductComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NotificationModule,
    MatMenuModule
  ],
  exports: [MatSidenavModule , MatButtonModule , MatIconModule , MatTableModule , MatInputModule ,
           MatPaginatorModule , MatSortModule , MatSelectModule , MatDatepickerModule , MatNativeDateModule , MatMenuModule],
  providers: [ UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
