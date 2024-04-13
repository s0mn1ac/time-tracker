/* Angular */
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

/* Transloco */
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

/* PrimeNG */
import { PrimeNGConfig } from 'primeng/api';

/* Constants */
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => (): boolean => primeConfig.ripple = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ]),
    provideTransloco({
      config: { 
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true
    }
  ]
};
