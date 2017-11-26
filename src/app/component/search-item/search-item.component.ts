import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../service/service';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

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
