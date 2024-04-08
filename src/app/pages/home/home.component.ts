/* Angular */
import { Component } from '@angular/core';

/* Transloco */
import { TranslocoModule,  } from "@jsverse/transloco";

/* PrimeNg */
import { PrimeNGModule } from '../../shared/modules/primeng.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslocoModule,
    PrimeNGModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
