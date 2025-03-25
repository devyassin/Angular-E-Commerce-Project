import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutStep, Order } from '../../models/order.type';
import { CartService } from '../../services/cart.service';
import { TruncatePipe } from '../../pipe/truncate.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  setPaymentMethod(arg0: string) {
    throw new Error('Method not implemented.');
  }
  currentStep: CheckoutStep = 'shipping';
  shippingForm: FormGroup;
  billingForm: FormGroup;
  paymentForm: FormGroup;

  order: Order = {
    id: 1,
    items: [
      {
        productId: 1,
        productName: 'Sample Product',
        quantity: 1,
        unitPrice: 99.99,
        subtotal: 99.99,
      },
    ],
    shippingAddress: {
      fullName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    },
    billingAddress: {
      fullName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    },
    paymentMethod: {
      type: 'creditCard',
    },
    subtotal: 99.99,
    shippingCost: 10.0,
    tax: 8.99,
    total: 118.98,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  constructor(private fb: FormBuilder, public cartService: CartService) {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.billingForm = this.fb.group({
      sameAsShipping: [true],
      fullName: [''],
      streetAddress: [''],
      apartment: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
      phoneNumber: [''],
    });

    this.paymentForm = this.fb.group({
      type: ['creditCard', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      nameOnCard: ['', Validators.required],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  ngOnInit() {
    // Initialize forms with any existing data
  }

  nextStep() {
    switch (this.currentStep) {
      case 'shipping':
        if (this.shippingForm.valid) {
          this.currentStep = 'billing';
        }
        break;
      case 'billing':
        if (this.billingForm.valid) {
          this.currentStep = 'payment';
        }
        break;
      case 'payment':
        this.onSubmit();
        if (this.paymentForm.valid) {
          this.currentStep = 'confirmation';
          this.onSubmit();
        }
        break;
    }
  }

  previousStep() {
    switch (this.currentStep) {
      case 'billing':
        this.currentStep = 'shipping';
        break;
      case 'payment':
        this.currentStep = 'billing';
        break;
      case 'confirmation':
        this.currentStep = 'payment';
        break;
    }
  }

  onSubmit() {
    console.log('Order submitted:', this.order);  
    if (
      this.shippingForm.valid &&
      this.billingForm.valid &&
      this.paymentForm.valid
    ) {
      // Handle order submission
      console.log('Order submitted:', this.order);
    }
  }
}
