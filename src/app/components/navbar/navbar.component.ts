import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

// app.component.html

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent  {
  cartItemCount = 15; 

  // Navigation items with routing
  navItems = [
    { label: 'Products', route: '/products' },
    { label: 'Favourites', route: '/favourites' },
    { label: 'Contact', route: '/contact' }
  ];
}
