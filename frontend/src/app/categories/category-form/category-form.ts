import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.html',
  styleUrls: ['./category-form.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category = { name: '', description: '' };
  isEditMode = false;
  categoryId?: number;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: number): void {
    this.categoryService.get(id).subscribe(
      data => this.category = data,
      error => console.error('Error loading category:', error)
    );
  }

  saveCategory(): void {
    if (this.isEditMode && this.categoryId) {
      this.categoryService.update(this.categoryId, this.category).subscribe(
        () => {
          alert('Category updated successfully');
          this.router.navigate(['/categories']);
        },
        error => console.error('Error updating category:', error)
      );
    } else {
      this.categoryService.create(this.category).subscribe(
        () => {
          alert('Category created successfully');
          this.router.navigate(['/categories']);
        },
        error => console.error('Error creating category:', error)
      );
    }
  }
} 
