import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExchangeRateService } from './services/exchange-rate.service';

@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App {
  private readonly exchangeRateService = inject(ExchangeRateService)
  protected readonly last30DaysExchange = [
    {
      date: '09/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: -1.15
    },
    {
      date: '07/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: 1.15
    },
    {
      date: '09/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: -1.15
    },
    {
      date: '07/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: 1.15
    },
    {
      date: '09/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: -1.15
    },
    {
      date: '07/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: 1.15
    },
    {
      date: '09/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: -1.15
    },
    {
      date: '07/03/2022',
      open: 5.0666,
      close: 5.0038,
      high: 5.0689,
      low: 4.9836,
      closeFiff: 1.15
    },
  ]
  protected readonly isExpanded = signal(true)

  protected toggleExpansion() {
    this.isExpanded.update(isExpanded => !isExpanded)
  }

  protected getCurrent() {
    this.exchangeRateService.getCurrent('BRL', 'USD').subscribe({
      next: res => {
        console.log(res)
      }
    })
  }

  protected getDaily() {
    this.exchangeRateService.getDaily('BRL', 'USD').subscribe({
      next: res => {
        console.log(res)
      }
    })
  }
}
