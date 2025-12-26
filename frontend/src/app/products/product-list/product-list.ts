import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit { 
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.list().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.loadCategoryNames();
        this.loading = false;
      },
      error => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    );
  }

  loadCategories(): void {
    this.categoryService.list().subscribe(
      data => {
        this.categories = data;
        this.loadCategoryNames();
      },
      error => console.error('Error loading categories:', error)
    );
  }

  loadCategoryNames(): void {
    // ensure category names are attached to products
    this.products.forEach(product => {
      const category = this.categories.find(c => c.id === product.categoryId);
      product.categoryName = category ? category.name : 'Unknown';
    });
    // update filtered view in case categories arrived after products
    this.applyFilter();
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  applyFilter(): void {
    const q = this.searchTerm?.trim().toLowerCase();
    if (!q) {
      this.filteredProducts = [...this.products];
      return;
    }
    this.filteredProducts = this.products.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.categoryName || '').toLowerCase().includes(q)
    );
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(
        () => {
          alert('Product deleted successfully');
          this.loadProducts();
        },
        error => console.error('Error deleting product:', error)
      );
    }
  }
} 
