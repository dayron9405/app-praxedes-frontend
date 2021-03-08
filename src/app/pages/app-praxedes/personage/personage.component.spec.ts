import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonageComponent } from './personage.component';

describe('PersonageComponent', () => {
  let component: PersonageComponent;
  let fixture: ComponentFixture<PersonageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
