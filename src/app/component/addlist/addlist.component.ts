import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Service } from '../../service/service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  private modalWindow: NgbModalRef;
  public tmp: string = '';

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public service: Service) {
  }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private addList(name: string) { // upravit
    let dbRef = this.db.list('/lists').push({ name: name });
    firebase.database().ref('lists/' + dbRef.key + '/users').child(this.service.user.uid).set({ email: this.service.user.email, foto: this.service.user.photoURL });
    firebase.database().ref('users/' + this.service.user.uid + '/lists').child(dbRef.key).set({ name:  name});

    this.modalWindow.close();
    this.tmp = '';
  }
}
