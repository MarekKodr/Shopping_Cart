import { AppModule } from '../../app.module';
import { ListComponent } from '../list/list.component';
import { LoginComponent } from '../login/login.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { router } from '../../app.router';
import { ListsComponent } from '../lists/lists.component';
import { GroupsComponent } from '../groups/groups.component';
import { FriendsComponent } from '../friends/friends.component';
import { GroupComponent } from '../group/group.component';
import { GroupListsComponent } from '../group-lists/group-lists.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
      
  //     declarations: [ CardComponent, LoginComponent, ListComponent, ListsComponent, GroupsComponent, FriendsComponent, GroupComponent, GroupListsComponent
  //      ],
  //     imports: [
  //       router,
  //       NgbModule.forRoot()
  //     ]

  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should be created', () => {
    // expect(component).toBeTruthy();
  });
});
