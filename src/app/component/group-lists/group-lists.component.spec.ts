import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListsComponent } from './group-lists.component';

describe('GroupListsComponent', () => {
  let component: GroupListsComponent;
  let fixture: ComponentFixture<GroupListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
