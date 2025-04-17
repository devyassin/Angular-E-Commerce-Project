import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <!-- Left side - Image -->
      <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 mix-blend-multiply dark:from-gray-900/80 dark:to-gray-800/80 z-10"></div>
        <img
          src="assets/images/shopping-cart.png"
          alt="Shopping cart with mobile"
          class="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110"
        />
        <div class="absolute inset-0 flex items-center justify-center z-20">
          <div class="text-center text-white p-8 bg-black/20 backdrop-blur-sm rounded-xl">
            <h1 class="text-4xl font-bold mb-4">Join Us Today!</h1>
            <p class="text-lg">Start your shopping journey with us</p>
          </div>
        </div>
      </div>

      <!-- Right side - Sign Up Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter your details below</p>
          </div>

          <form class="mt-8 space-y-6">
            <div class="space-y-4">
              <div>
                <label for="name" class="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                  placeholder="Name"
                />
              </div>
              <div>
                <label for="email" class="sr-only">Email or Phone Number</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                  placeholder="Email or Phone Number"
                />
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Create Account
              </button>
            </div>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div class="mt-6">
                <button
                  type="button"
                  class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <img src="assets/images/google.svg" alt="Google logo" class="h-5 w-5 mr-2" />
                  Sign up with Google
                </button>
              </div>
            </div>

            <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <a routerLink="/login" class="font-medium text-red-500 hover:text-red-400"> Log In </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {} 