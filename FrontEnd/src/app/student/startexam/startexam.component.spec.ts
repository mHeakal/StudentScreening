import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartexamComponent } from './startexam.component';

describe('StartexamComponent', () => {
  let component: StartexamComponent;
  let fixture: ComponentFixture<StartexamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartexamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
