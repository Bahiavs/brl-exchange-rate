import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CurrentExchangeRateDTO, ExchangeRateService } from '../../services/exchange-rate.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Loader } from "../../components/loader/loader";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";

@Component({
  selector: 'brl-exchange-rate',
  imports: [MatIconModule, ReactiveFormsModule, CurrencyPipe, DatePipe, Loader, Input, Button],
  templateUrl: 'brl-exchange-rate.html',
  styleUrl: 'brl-exchange-rate.scss',
})
export class BrlExchangeRate implements OnInit, OnDestroy {
  private readonly exchangeRateService = inject(ExchangeRateService)
  protected readonly currencyCtrl = new FormControl('')
  protected readonly currentExchangeRate = signal<undefined | 'loading' | CurrentExchangeRateDTO>(undefined)
  protected readonly dailyExchangeRate = signal<undefined | 'loading' | DailyExchangeRate>(undefined)
  protected readonly isExpanded = computed(() => this.dailyExchangeRate() !== undefined)
  private readonly subs = new Subscription()
  private getDailySub = new Subscription()

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
    const dailyExchangeRate = this.dailyExchangeRate()
    if (dailyExchangeRate === undefined) {
      this.getDaily()
      return
    }
    this.dailyExchangeRate.set(undefined)
    this.getDailySub.unsubscribe() // Abort request if loading
    this.getDailySub = new Subscription() // Prevent error when requesting again after any abortion
  }

  protected getCurrent() {
    if (this.currencyCtrl.value === null) return console.error('invalid currency code')
    this.dailyExchangeRate.set(undefined)
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
    const sub = this.exchangeRateService.getDaily(currentExchangeRate.fromSymbol).subscribe({
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
    this.getDailySub.add(sub)
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