/* Angular */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* Transloco */
import { TranslocoModule } from '@jsverse/transloco';

/* PrimeNG */
import { PrimeNGModule } from '../../modules/primeng.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    PrimeNGModule,
    TranslocoModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public search: string = '';


  /* --------- On change methods -------------------------------------------------------------------------------------------------------- */

  public onChangeSearch(search: string): void {
    console.log(' -> search', search);
  }

}
