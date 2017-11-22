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

  constructor(public afAuth: AngularFireAuth,
    public userService: Service,
    private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userService.user = new User(user.uid, user.email, this.getFoto(user.photoURL));
        this.myUser = new User(user.uid, user.email, this.getFoto(user.photoURL));
        let usersRef = firebase.database().ref('/users');

        usersRef.child(user.uid).once('value', function (snapshot) {
          let exists = (snapshot.val() !== null);
          if (!exists) {
            console.log('uzivatel neexistuje!!');
            firebase.database().ref('users').child(this.userService.user.uid)
              .set({ email: this.userService.user.email, foto: this.userService.user.foto });
          }
        })
        
        this.router.navigate(['/lists']);
      } else {
        this.userService.user = null;
      }
    });

  }

  public getFoto(foto: string): string {
    return !foto ? '../../assets/images/user.png' : foto;
  }

  public authentication() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) { });
  }

  public login(email, password): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(function (result) { });
  }

  ngOnInit() {
    this.myUser = new User('', '', '');
  }


}
