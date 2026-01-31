import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CurrentExchangeRateDTO, ExchangeRateService } from './services/exchange-rate.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
})
export class App implements OnInit, OnDestroy {
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
  protected readonly currencyCtrl = new FormControl('')
  protected readonly currentExchangeRate = signal<undefined | 'loading' | CurrentExchangeRateDTO>(undefined)
  private readonly subs = new Subscription()

  ngOnInit() {
    const sub = this.currencyCtrl.valueChanges.subscribe(value => {
      if (value === null) return
      const uppercaseValue = value.toUpperCase()
      if (value === uppercaseValue) return
      this.currencyCtrl.setValue(uppercaseValue, { emitEvent: false })
    })
    this.subs.add(sub)
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  protected toggleExpansion() {
    this.isExpanded.update(isExpanded => !isExpanded)
  }

  protected getCurrent() {
    if (this.currencyCtrl.value === null) return console.error('invalid currency code')
    this.currentExchangeRate.set('loading')
    this.exchangeRateService.getCurrent(this.currencyCtrl.value).subscribe({
      next: res => {
        if (!res.success) {
          alert('Error getting current exchange rate')
          this.currentExchangeRate.set(undefined)
          return
        }
        this.currentExchangeRate.set(res)
      },
      error: err => {
        alert('Error getting current exchange rate')
        this.currentExchangeRate.set(undefined)
      }
    })
  }

  protected getDaily() {
    if (this.currencyCtrl.value === null) return console.error('invalid currency code')
    this.exchangeRateService.getDaily(this.currencyCtrl.value).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }
}