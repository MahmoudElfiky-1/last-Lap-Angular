import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducts } from '../../Models/iproducts';
import { Product } from '../../Services/product';
@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // keep it simple like your example
  productList: any[] = [];
  updateForm!: FormGroup;

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private productService: Product,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [''],
      color: [''],
      capacity: [''],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        // map endpoint shape -> easy UI shape
        this.productList = (data ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          data: p.data ?? null,
        }));
        this.isLoading = false;
        console.log(this.productList);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.errorMessage = 'Failed to load products!';
        this.isLoading = false;
      },
    });
  }

  getProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.productList = (data ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          data: p.data ?? null,
        }));
        this.isLoading = false;
        console.log(this.productList);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.errorMessage =
          err?.message
            ? `Failed to load products: ${err.message}`
            : 'Failed to load products!';
        this.isLoading = false;
      },
    });
  }

  showUpdateModal(product: any) {
    this.successMessage = '';
    this.errorMessage = '';

    const data = product?.data ?? {};
    this.updateForm.patchValue({
      id: product.id,
      title: product.name,
      price: data?.price ?? data?.Price ?? '',
      color: data?.color ?? data?.Color ?? '',
      capacity: data?.capacity ?? data?.['capacity GB'] ?? data?.Capacity ?? '',
    });
    (
      document.getElementById('my_modal_5') as HTMLDialogElement
    ).showModal();
  }

  closeUpdateModal(): void {
    this.successMessage = '';
    this.errorMessage = '';
    (
      document.getElementById('my_modal_5') as HTMLDialogElement
    ).close();
  }

  updateProduct(): void {
    if (this.updateForm.invalid) return;

    const id = String(this.updateForm.value.id);
    const updatedProduct: IProducts = {
      name: this.updateForm.value.title,
      data: {
        ...(this.updateForm.value.price !== '' ? { price: Number(this.updateForm.value.price) } : {}),
        ...(this.updateForm.value.color ? { color: this.updateForm.value.color } : {}),
        ...(this.updateForm.value.capacity ? { capacity: this.updateForm.value.capacity } : {}),
      },
    };

    console.log(this.updateForm.value);
    this.productService.updateProducts(id, updatedProduct).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        const idx = this.productList.findIndex((p: any) => String(p.id) === id);
        if (idx !== -1) {
          this.productList[idx] = { id, name: updatedProduct.name, data: updatedProduct.data };
        }
        this.closeUpdateModal();
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.errorMessage = 'Error updating product';
      },
    });
  }

  deleteProduct(id: string | number) {
    this.productService.deleteProducts(String(id)).subscribe({
      next: () => {
        this.productList = this.productList.filter((p) => String(p.id) !== String(id));
        console.log('Product deleted successfully:', id);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage = 'Error deleting product';
      },
    });
  }
}
