import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, stock: 0, categoryId: 0 };
  categories: Category[] = [];
  isEditMode = false;
  productId?: number;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
    this.loadCategories();
  }

  loadProduct(id: number): void {
    this.productService.get(id).subscribe(
      data => this.product = data,
      error => console.error('Error loading product:', error)
    );
  }

  loadCategories(): void {
    this.categoryService.list().subscribe(
      data => this.categories = data,
      error => console.error('Error loading categories:', error)
    );
  }

  saveProduct(): void {
    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, this.product).subscribe(
        () => {
          alert('Product updated successfully');
          this.router.navigate(['/products']);
        },
        error => console.error('Error updating product:', error)
      );
    } else {
      this.productService.create(this.product).subscribe(
        () => {
          alert('Product created successfully');
          this.router.navigate(['/products']);
        },
        error => console.error('Error creating product:', error)
      );
    }
  }
} 
