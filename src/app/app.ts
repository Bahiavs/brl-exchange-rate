import { Component } from '@angular/core';
import { BrlExchangeRate } from "./pages/brl-exchange-rate/brl-exchange-rate";

@Component({
  selector: 'app-root',
  imports: [BrlExchangeRate],
  template: `
    <brl-exchange-rate />
  `,
})
export class App {
}