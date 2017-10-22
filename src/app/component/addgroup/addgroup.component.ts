import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Service } from '../../service/service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public groups: FirebaseListObservable<any[]>;


  constructor(private modalService: NgbModal,
    public actUser: Service,
    public db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.groups = this.db.list('/users/' + this.actUser.user.uid + '/groups');
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }


  private addGroup(name: string) {
    console.log(this.actUser.user.uid);
    let dbRef = this.db.list('/users/' + this.actUser.user.uid + '/groups').push({ name: name });
    firebase.database().ref('/groups').child(dbRef.key).set({ name: name });
    firebase.database().ref('/groups/' + dbRef.key + '/users')
      .child(this.actUser.user.uid).set({ email: this.actUser.user.email, foto: this.actUser.user.photoURL });
    this.modalWindow.close();
  }
}
