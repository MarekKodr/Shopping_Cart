import { ElementData } from '@angular/core/src/view/types';
import { query } from '@angular/core/src/animation/dsl';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth'


import * as firebase from 'firebase/app';
import { User } from '../../model/user';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseListObservable } from 'angularfire2/database';
import { Service } from '../../service/service';
// import { AngularFire } from 'angularfire2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public user: User;


  constructor(
    private modalService: NgbModal,
    private service: Service,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.user = new User();
  }


  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public addNewUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(
      function (result) {
      });
    this.modalWindow.close();
  }
}
