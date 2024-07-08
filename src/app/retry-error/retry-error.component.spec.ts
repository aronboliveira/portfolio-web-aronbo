import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryErrorComponent } from './retry-error.component';

describe('RetryErrorComponent', () => {
  let component: RetryErrorComponent;
  let fixture: ComponentFixture<RetryErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetryErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetryErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
