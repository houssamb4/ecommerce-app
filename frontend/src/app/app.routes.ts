import { Routes } from '@angular/router';
import { CategoryListComponent } from './categories/category-list/category-list';
import { CategoryFormComponent } from './categories/category-form/category-form';
import { ProductListComponent } from './products/product-list/product-list';
import { ProductFormComponent } from './products/product-form/product-form';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/add', component: CategoryFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
];
