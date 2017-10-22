import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInGroupComponent } from './search-in-group.component';

describe('SearchInGroupComponent', () => {
  let component: SearchInGroupComponent;
  let fixture: ComponentFixture<SearchInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
