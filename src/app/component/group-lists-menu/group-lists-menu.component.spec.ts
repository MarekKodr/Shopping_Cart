import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListsMenuComponent } from './group-lists-menu.component';

describe('GroupListsMenuComponent', () => {
  let component: GroupListsMenuComponent;
  let fixture: ComponentFixture<GroupListsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
