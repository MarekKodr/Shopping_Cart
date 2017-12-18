import { GroupService } from '../../service/group.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Service } from '../../service/service'
import { User } from '../../model/user';
import { ActivatedRoute, Params } from '@angular/router';
import { List } from '../../model/list';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-search-in-group',
  templateUrl: './search-in-group.component.html',
  styleUrls: ['./search-in-group.component.css']
})


export class SearchInGroupComponent implements OnInit {


  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public users: any[];
  public idpar: string;
  public startWith = new Subject();
  public endWith = new Subject();
  public friend: boolean = false;

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

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
    
    this.search("");
  }

  ngOnInit() {
    this.search("");

  }


  public search(text: string): void {
    this.startWith.next(text)
    this.endWith.next(text + '\uf8ff')
    this.actUser.findMember(this.startWith, this.endWith, this.idpar)
      .subscribe(users => this.users = users);
  }


  public deleteFriend(id: string): void {
    this.db.list('groups/' + this.idpar + '/lists', { preserveSnapshot: true }).subscribe(delList => {
      delList.forEach(delList => {
        this.db.object('users/' + id + '/lists/' + delList.key).remove();
        this.db.object('lists/' + delList.key + '/users/' + id).remove();
      })
      this.db.object('groups/' + this.idpar + '/users/' + id).remove();
      this.db.object('users/' + id + '/groups/' + this.idpar).remove();
    });
  }

}
