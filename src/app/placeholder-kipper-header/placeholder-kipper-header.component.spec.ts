import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderKipperHeaderComponent } from './placeholder-kipper-header.component';

describe('PlaceholderKipperHeaderComponent', () => {
  let component: PlaceholderKipperHeaderComponent;
  let fixture: ComponentFixture<PlaceholderKipperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderKipperHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderKipperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
