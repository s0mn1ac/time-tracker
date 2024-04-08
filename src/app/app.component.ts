/* Angular */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* Components */
import { HeaderComponent } from './shared/components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  private _isContentScrolled: boolean = false;

  /* --------- Getters & Setters ------------------------------------------------------------------------------------------------------------------------------- */

  get isContentScrolled(): boolean {
    return this._isContentScrolled;
  }

  set isContentScrolled(isContentScrolled: boolean) {
    this._isContentScrolled = isContentScrolled;
  }


  /* --------- Other public methods ------------------------------------------------------------------------------------------------------- */

  public onScroll(scrollEvent: any): void {
    
    if (!scrollEvent || !scrollEvent.target) {
      return;
    }

    this.isContentScrolled = scrollEvent?.target['scrollTop'] > 0;
  }

}
