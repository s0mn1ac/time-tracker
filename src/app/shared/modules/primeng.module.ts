/* Angular */
import { NgModule } from '@angular/core';

/* PrimeNG */
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@NgModule({
  imports: [
    ButtonModule,
    CheckboxModule,
    RippleModule,
    InputTextModule,
    DividerModule
  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    RippleModule,
    InputTextModule,
    DividerModule
  ]
})
export class PrimeNGModule { }
