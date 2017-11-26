import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Service } from '../../service/service'
import { User } from '../../model/user';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.css']
})



export class SearchFriendComponent implements OnInit {

  @Input() name: string;

  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public users: FirebaseListObservable<User[]>;
  public idpar: string;
  public friend: boolean = false;
  public email = new Subject();


  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public activatedRoute: ActivatedRoute) {

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }

  public addFriend(id: string, email: string, foto: string): void {
    
    firebase.database().ref('/users/' + this.actUser.user.uid + '/friends').child(id).set({ email: email, foto: foto });
  }

  public sendRequest(id: string, email: string, foto: string): void {
    firebase.database().ref('/users/' + id + '/request').child(this.actUser.user.uid).set({ email: this.actUser.user.email, foto: this.actUser.user.foto });
    firebase.database().ref('/users/' + this.actUser.user.uid + '/sendRequest').child(id).set({ email: email, foto: foto });
  }


  public search(email: string): void {
      this.users = this.actUser.findFriend(email);
  }
}


