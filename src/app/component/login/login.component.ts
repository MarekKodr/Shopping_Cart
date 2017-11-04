import { ErrorLine } from 'tslint/lib/verify/lines';
import { Component, OnInit, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { User } from '../../model/user';
import { Service } from '../../service/service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  public myUser: User;
  public loginFaild: boolean; //--
  public auth: boolean;

  constructor(public afAuth: AngularFireAuth,
    public userService: Service,
    private router: Router) {

    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userService.user = new User(user.uid, user.email, user.photoURL);
        this.myUser = new User(user.uid, user.email, user.photoURL);
        let dbRef: firebase.database.Reference = firebase.database().ref('users').child(this.userService.user.uid);
        dbRef.set({ email: this.userService.user.email });
        this.router.navigate(['/lists']);
        this.loginFaild = false;
      } else {
        this.userService.user = null;
        this.loginFaild = true;
      }
    });

  }

  public authentication() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {});
    this.auth = true;
  }

  public login(email, password): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function (result) {});
    this.auth = true;
  }

  ngOnInit() {
    this.myUser = new User('', '', '');
    this.auth = false;
  }


}
