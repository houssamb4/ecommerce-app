import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  totalProducts: number | null = null;
  totalCategories: number | null = null;
  lowStockCount: number | null = null;
  recentProducts: Product[] = [];
  loading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.productService.list().subscribe({
      next: (products) => {
        this.totalProducts = products.length;
        this.recentProducts = products.slice(0, 5);
        this.lowStockCount = products.filter(p => p.stock <= 5).length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products for dashboard', err);
        this.loading = false;
      }
    });

    this.categoryService.list().subscribe({
      next: (cats) => this.totalCategories = cats.length,
      error: (err) => console.error('Failed to load categories for dashboard', err)
    });
  }
}