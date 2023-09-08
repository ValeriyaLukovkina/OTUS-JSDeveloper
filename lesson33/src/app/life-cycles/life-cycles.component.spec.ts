import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCyclesComponent } from './life-cycles.component';

describe('LifeCyclesComponent', () => {
  let component: LifeCyclesComponent;
  let fixture: ComponentFixture<LifeCyclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeCyclesComponent]
    });
    fixture = TestBed.createComponent(LifeCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});