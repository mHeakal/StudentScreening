import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffDialogComponent } from './add-staff-dialog.component';

describe('AddStaffDialogComponent', () => {
  let component: AddStaffDialogComponent;
  let fixture: ComponentFixture<AddStaffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
