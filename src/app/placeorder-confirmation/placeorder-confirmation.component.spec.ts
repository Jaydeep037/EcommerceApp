import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceorderConfirmationComponent } from './placeorder-confirmation.component';

describe('PlaceorderConfirmationComponent', () => {
  let component: PlaceorderConfirmationComponent;
  let fixture: ComponentFixture<PlaceorderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceorderConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceorderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
