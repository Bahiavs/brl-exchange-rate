import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
    private readonly http = inject(HttpClient)
    private readonly apiKey = 'RVZG0GHEV2KORLNA'
    private readonly baseUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/'

    getCurrent(from: string, to: string): Observable<CurrentExchangeRateDTO> {
        const url = `${this.baseUrl}currentExchangeRate?apiKey=${this.apiKey}&from_symbol=${from}&to_symbol=${to}`
        return this.http.get<CurrentExchangeRateDTO>(url)
    }

    getDaily(from: string, to: string): Observable<DailyExchangeRateDTO> {
        const url = `${this.baseUrl}dailyExchangeRate?apiKey=${this.apiKey}&from_symbol=${from}&to_symbol=${to}`
        return this.http.get<DailyExchangeRateDTO>(url)
    }
}

type CurrentExchangeRateDTO = {
    exchangeRate: number
    fromSymbol: string
    lastUpdatedAt: string
    rateLimitExceeded: boolean
    success: boolean
    toSymbol: string
}

type DailyExchangeRateDTO = {
    data: {
        close: number
        date: string
        high: number
        low: number
        open: number
    }[]
    from: string
    lastUpdatedAt: string
    rateLimitExceeded: boolean
    success: boolean
    to: string
}