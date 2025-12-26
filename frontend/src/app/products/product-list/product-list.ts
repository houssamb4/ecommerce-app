import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

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
    this.productService.list().subscribe(
      data => {
        this.products = data;
        this.loadCategoryNames();
      },
      error => console.error('Error loading products:', error)
    );
  }

  loadCategories(): void {
    this.categoryService.list().subscribe(
      data => this.categories = data,
      error => console.error('Error loading categories:', error)
    );
  }

  loadCategoryNames(): void {
    this.products.forEach(product => {
      const category = this.categories.find(c => c.id === product.categoryId);
      product.categoryName = category ? category.name : 'Unknown';
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
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
