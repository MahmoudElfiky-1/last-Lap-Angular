import { Component, inject } from '@angular/core';
import { Product } from '../../Services/product';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducts } from '../../Models/iproducts';
@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd {
  fb = inject(FormBuilder);
  productService = inject(Product);
  router = inject(Router);

  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  //  Add Form
  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(0)]],
    color: [''],
    capacity: [''],
  });

  //  Submit
  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.isLoading = true;

    const product: IProducts = {
      name: this.productForm.value.name!,
      data: {
        price: Number(this.productForm.value.price!),
        color: this.productForm.value.color || undefined,
        capacity: this.productForm.value.capacity || undefined,
      },
    };

    console.log('Adding product:', product);

    this.productService.addProducts(product).subscribe({
      next: (data) => {
        console.log('Added successfully:', data);
        this.successMessage = ' Product added successfully!';
        this.isLoading = false;
        this.productForm.reset();
        setTimeout(() => this.router.navigate(['/products']), 800);
      },
      error: (error) => {
        console.error('Error adding:', error);
        this.errorMessage = ' Failed to add product!';
        this.isLoading = false;
      },
    });
  }
}
