import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListToGroupComponent } from './add-list-to-group.component';

describe('AddListToGroupComponent', () => {
  let component: AddListToGroupComponent;
  let fixture: ComponentFixture<AddListToGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListToGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
