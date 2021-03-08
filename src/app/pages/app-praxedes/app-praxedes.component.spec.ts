import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPraxedesComponent } from './app-praxedes.component';

describe('AppPraxedesComponent', () => {
  let component: AppPraxedesComponent;
  let fixture: ComponentFixture<AppPraxedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPraxedesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPraxedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
