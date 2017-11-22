import { any } from 'codelyzer/util/function';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';


import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../model/user';
import { Service } from '../../service/service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public friends: FirebaseListObservable<any[]>;
  public noFriends: boolean = false;

  constructor(
    public db: AngularFireDatabase,
    public actUser: Service
  ) { }

  ngOnInit() {
    this.friends = this.db.list('/users/' + this.actUser.user.uid + '/friends');
    this.friends.subscribe(
      count => {
        if (count.length == 0)
          this.noFriends = true;
        else
          this.noFriends = false;
      });

  }

  public deleteFriend(id: string): void {
    this.db.object('users/' + this.actUser.user.uid + '/friends/' + id).remove();
  }
}
