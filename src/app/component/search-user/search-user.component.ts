import { GroupService } from '../../service/group.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../service/service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})

export class SearchUserComponent implements OnInit {

  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public users: any[];
  public idpar: string;
  public startWith = new Subject();
  public endWith = new Subject();

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public activatedRoute: ActivatedRoute,
    public groupService: GroupService) {

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  public findFriend(start, end): FirebaseListObservable<any[]> {
    return this.db.list('/users/' + this.actUser.user.uid + '/friends', {
      query: {
        orderByChild: 'email',
        limitToFirst: 6,
        startAt: start,
        endAt: end
      }
    });
  }

  ngOnInit() {
    this.findFriend(this.startWith, this.endWith)
      .subscribe(searchFriend => this.users = searchFriend);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });


  }

  public addMember(idfriend: string, email: string, foto: any): void {
    this.db.object('groups/' + this.idpar + '/users/' + idfriend).set({ email: email, foto: foto });
    this.db.object('users/' + idfriend + '/groups/' + this.idpar).set({ name: this.groupService.group.name, admin: this.groupService.group.admin });

    this.db.list('groups/' + this.idpar + '/lists').subscribe(newList => {
      newList.forEach(newList => {
        this.db.object('users/' + idfriend + '/lists/' + newList.$key).set({ name: newList.name, picture: newList.picture, admin: newList.admin });
        this.db.object('lists/' + newList.$key + '/users/' + idfriend).set({ uid: idfriend });
      })
    });  //pridani listu k uzivateli  a pridani uzivatelu k listum
  }

  public search($event: any): void {
    let queryText: string = $event.target.value;
    if (queryText.length > 0) {
      this.startWith.next(queryText)
      this.endWith.next(queryText + '\uf8ff')
    }
    else {
      this.users = [];
    }
  }
}
