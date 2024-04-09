/* Angular */
import { NgModule } from '@angular/core';

/* PrimeNG */
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@NgModule({
  imports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule
  ],
  exports: [
    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule
  ]
})
export class PrimeNGModule { }
