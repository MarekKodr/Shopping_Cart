import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMenuComponent } from './friend-menu.component';
import { AngularFireAuth } from 'angularfire2/auth';
import {
    _getAngularFireDatabase,
    AngularFireDatabase,
    AngularFireDatabaseModule,
    DATABASE_PROVIDERS,
} from 'angularfire2/database';
import { firebaseConfig } from '../../../environments/firebase.config';
import { AngularFireModule} from 'angularfire2';
import { Service } from '../../service/service';
import { ElementData } from '@angular/core/src/view/types';
import { FirebaseApp } from 'angularfire2/firebase.app.module';
import * as firebase from 'firebase/app';
import { User } from '../../model/user';

describe('FriendMenuComponent', () => {
  let component: FriendMenuComponent;
  let fixture: ComponentFixture<FriendMenuComponent>;
  let db: AngularFireDatabase;
  let actUser: Service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendMenuComponent ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [
          Service
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(FriendMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Friend Menu component should create', () => {
    expect(component).toBeTruthy();
  });

  it('set flag', () => {
    actUser = new Service(db);
    actUser.user = new User("ahoj", "jana", null);
    
    component = new FriendMenuComponent( db, actUser  );
    // expect(this.db).toBeDefined();
    expect(component.flag).toBe('');
    // component.showMyReq();
  });
 
  
});
