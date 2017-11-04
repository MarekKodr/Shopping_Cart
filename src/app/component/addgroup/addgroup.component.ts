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
  closeResult: String;
  items: FirebaseListObservable<any[]>;
  private modalWindow: NgbModalRef;


  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public actUser: Service) { }

  ngOnInit() {
    
    
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private addGroup(name: string) {
    let dbRef = firebase.database().ref('/groups').push({ uid: this.actUser.user.uid, name: name });
    firebase.database().ref('/groups/' + dbRef.key + '/friends').push({ uid: this.actUser.user.uid });
    this.modalWindow.close();
  }
}
