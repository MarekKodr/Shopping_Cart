import { GroupService } from '../../service/group.service';
import { Component, OnInit} from '@angular/core';
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
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.actUser.findCustomers(this.startWith, this.endWith)
      .subscribe(users => this.users = users);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
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



  public addFriend(idfriend: string, email: string, foto: any): void {// funguje
    this.db.object('groups/' + this.idpar + '/users/' + idfriend).set({ email: email, foto: foto });
    this.db.object('users/' + idfriend + '/groups/' + this.idpar).set({ name: this.groupService.group.name, admin: this.groupService.group.admin });

    this.db.list('groups/' + this.idpar + '/lists').subscribe(newList => {
      newList.forEach(newList => {
        this.db.object('users/' + idfriend + '/lists/' + newList.$key).set({ name: newList.name, picture: newList.picture, admin: newList.admin });
        this.db.object('lists/' + newList.$key + '/users/' + idfriend).set({ uid: idfriend });
      })
    });  //pridani listu k uzivateli  a pridani uzivatelu k listum

  }

}
