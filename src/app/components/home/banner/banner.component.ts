import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative bg-black text-white overflow-hidden my-10 rounded-lg drop-shadow-lg">
      <div class="container mx-auto px-4 py-16 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left Content -->
          <div class="space-y-6 z-10">
            <div class="text-green-500 font-medium">Categories</div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Enhance Your <br />
              Shopping Experience
            </h1>
            
            <!-- Countdown Timer -->
            <div class="flex gap-4 my-8">
              <div class="flex flex-col items-center">
                <div class="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {{timeLeft.hours}}
                </div>
                <span class="text-sm mt-2">Hours</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {{timeLeft.minutes}}
                </div>
                <span class="text-sm mt-2">Minutes</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {{timeLeft.seconds}}
                </div>
                <span class="text-sm mt-2">Seconds</span>
              </div>
            </div>

            <button 
              routerLink="/products"
              class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 duration-200 inline-flex items-center group"
            >
              Buy Now!
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <!-- Right Content - Product Image -->
          <div class="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <img
              src="assets/images/casque.png"
              alt="JBL Speaker"
              class="w-full h-auto max-w-lg mx-auto"
            />
          </div>
        </div>

        <!-- Background Elements -->
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BannerComponent implements OnInit, OnDestroy {
  timeLeft = {
    hours: 23,
    minutes: 59,
    seconds: 59
  };

  private timerSubscription: Subscription | undefined;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft.seconds > 0) {
        this.timeLeft.seconds--;
      } else {
        this.timeLeft.seconds = 59;
        if (this.timeLeft.minutes > 0) {
          this.timeLeft.minutes--;
        } else {
          this.timeLeft.minutes = 59;
          if (this.timeLeft.hours > 0) {
            this.timeLeft.hours--;
          } else {
            this.timeLeft.hours = 23;
          }
        }
      }
    });
  }
} 