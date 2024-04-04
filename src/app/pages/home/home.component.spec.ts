/* Angular */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* Components */
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  let component!: HomeComponent;
  let fixture!: ComponentFixture<HomeComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
