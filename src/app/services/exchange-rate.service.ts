import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
    private readonly http = inject(HttpClient)
    // In real world, it should be get from an environment file.
    // For this simple project it's safe using the API key directly in the service 
    // and also upload it to a remote repo
    private readonly apiKey = 'RVZG0GHEV2KORLNA'
    private readonly baseUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open/'

    getCurrent(from: string): Observable<CurrentExchangeRateDTO> {
        const url = `${this.baseUrl}currentExchangeRate?apiKey=${this.apiKey}&from_symbol=${from}&to_symbol=BRL`
        return this.http.get<CurrentExchangeRateDTO>(url)
    }

    getDaily(from: string): Observable<DailyExchangeRateDTO> {
        const url = `${this.baseUrl}dailyExchangeRate?apiKey=${this.apiKey}&from_symbol=${from}&to_symbol=BRL`
        return this.http.get<DailyExchangeRateDTO>(url)
    }
}

export type CurrentExchangeRateDTO = {
    exchangeRate: number
    fromSymbol: string
    lastUpdatedAt: string
    rateLimitExceeded: boolean
    success: boolean
    toSymbol: string
}

export type DailyExchangeRateDTO = {
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