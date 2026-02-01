import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';

import { routes } from './app.routes';
import { SnackbarService } from './services/snackbar.service';

registerLocaleData(localePtBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    SnackbarService
  ]
};
