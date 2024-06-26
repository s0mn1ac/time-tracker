/* Angular */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* Components */
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component!: AppComponent;
  let fixture!: ComponentFixture<AppComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
