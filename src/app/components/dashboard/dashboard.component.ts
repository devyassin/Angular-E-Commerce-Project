import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">Dashboard</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Sales Overview Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Sales</h3>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">$24,500</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-2">+12% from last month</p>
          </div>

          <!-- Orders Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Orders</h3>
            <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">1,234</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-2">+8% from last month</p>
          </div>

          <!-- Products Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Products</h3>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">856</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-2">+5% from last month</p>
          </div>

          <!-- Customers Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Customers</h3>
            <p class="text-3xl font-bold text-red-600 dark:text-red-400">3,456</p>
            <p class="text-sm text-green-600 dark:text-green-400 mt-2">+15% from last month</p>
          </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recent Orders</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">#12345</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">John Doe</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Completed
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">$299.99</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">2024-03-15</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">#12346</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">Jane Smith</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                      Pending
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">$199.99</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">2024-03-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
} 