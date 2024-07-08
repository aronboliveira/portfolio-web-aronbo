import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainBodyComponent } from './home-main-body.component';

describe('HomeMainBodyComponent', () => {
  let component: HomeMainBodyComponent;
  let fixture: ComponentFixture<HomeMainBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMainBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMainBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
