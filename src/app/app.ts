import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CurrentExchangeRateDTO, DailyExchangeRateDTO, ExchangeRateService } from './services/exchange-rate.service';
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
  protected readonly isExpanded = signal(false)
  protected readonly currencyCtrl = new FormControl('')
  protected readonly currentExchangeRate = signal<undefined | 'loading' | CurrentExchangeRateDTO>(undefined)
  protected readonly dailyExchangeRate = signal<undefined | 'loading' | DailyExchangeRate>(undefined)
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
    const isExpanded = this.isExpanded()
    if (!isExpanded) this.getDaily()
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
    const currentExchangeRate = this.currentExchangeRate()
    if (currentExchangeRate === undefined) return
    if (currentExchangeRate === 'loading') return
    this.dailyExchangeRate.set('loading')
    this.exchangeRateService.getDaily(currentExchangeRate.fromSymbol).subscribe({
      next: res => {
        if (!res.success) {
          alert('Error getting daily exchange rate')
          this.dailyExchangeRate.set(undefined)
          return
        }
        const dailyExchangeRate: DailyExchangeRate = {
          lastUpdatedAt: res.lastUpdatedAt,
          data: res.data
            .map((item, i) => {
              if (i === res.data.length - 1) return { ...item, closeDiff: null }
              const currentClose = item.close
              const previousClose = res.data[i + 1].close
              return {
                ...item,
                closeDiff: (currentClose / (previousClose / 100)) - 100
              }
            })
            .slice(0, 30)
        }
        this.dailyExchangeRate.set(dailyExchangeRate)
      },
      error: err => {
        alert('Error getting daily exchange rate')
        this.dailyExchangeRate.set(undefined)
      }
    })
  }
}

type DailyExchangeRate = {
  data: {
    close: number
    date: string
    high: number
    low: number
    open: number
    closeDiff: null | number
  }[]
  lastUpdatedAt: string
}