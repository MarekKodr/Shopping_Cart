import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Service } from './service/service';
import { User } from './model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: Observable<firebase.User>;
  public myUser: User;

  constructor(public router: Router,
    public service: Service,
    public afAuth: AngularFireAuth
  ) {
    router.events.subscribe(
      (url: any) => console.log(url)
    );
    this.user = afAuth.authState;
    this.user.subscribe(
      (user: firebase.User) => {
        if (user) {
          this.myUser.setUser(user.uid, user.email, user.photoURL);
          this.service.user = this.myUser;
        }
      }

    );
  }

  ngOnInit() {
    this.myUser = new User('', '', '');
  }

}
