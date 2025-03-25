import { Component } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";
import { FilterComponent } from "../filter/filter.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-home',
  imports: [ProductListComponent, FilterComponent, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
