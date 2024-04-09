/* Angular */
import { NgModule } from '@angular/core';

/* PrimeNG */
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  imports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
  ],
  exports: [
    ButtonModule,
    RippleModule,
    InputTextModule
  ]
})
export class PrimeNGModule { }
