import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Service } from '../../service/service'
import { User } from '../../model/user';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-in-group',
  templateUrl: './search-in-group.component.html',
  styleUrls: ['./search-in-group.component.css']
})
export class SearchInGroupComponent implements OnInit {

  @Input() groupName: string;

  public user: FirebaseListObservable<any>;
  public users: any[];
  public idpar: string;
  
  startWith = new Subject();
  endWith = new Subject();

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public actUser: Service,
    public activatedRoute: ActivatedRoute) {
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  ngOnInit() {
    this.actUser.findCustomers(this.startWith, this.endWith)
      .subscribe(users => this.users = users);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }

  public addFriend(idfriend: string, email: string, foto: any): void {
    firebase.database().ref('groups/' + this.idpar + '/users').child(idfriend).set({ email: email, foto: foto });
    firebase.database().ref('/users/' + idfriend + '/groups').child(this.idpar).set({ name: this.groupName });
  }

  public search($event: any): void {
    let queryText: string = $event.target.value;
    if (queryText.length > 0) {
      this.startWith.next(queryText)
      this.endWith.next(queryText + '\uf8ff')
    }
  }
}
