import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceHolderKipperMainComponent } from './placeholder-kipper-main.component';

describe('PlaceHolderKipperMainComponent', () => {
  let component: PlaceHolderKipperMainComponent;
  let fixture: ComponentFixture<PlaceHolderKipperMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceHolderKipperMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceHolderKipperMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
