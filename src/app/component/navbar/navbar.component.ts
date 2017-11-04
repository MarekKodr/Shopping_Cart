import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Service } from '../../service/service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor( public afAuth: AngularFireAuth, public service: Service) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.service.user.setNull();
  }

}
