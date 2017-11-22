import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';


@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.css']
})
export class SearchGroupComponent implements OnInit {

  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public searchGroups: any[];
  public idpar: string;
  startWith = new Subject();
  endWith = new Subject();

  constructor(private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public activatedRoute: ActivatedRoute,
    public listService: ListService) {

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  public findGroup(start, end): FirebaseListObservable<any[]> {
    return this.db.list('/users/' + this.actUser.user.uid + '/groups', {
      query: {
        orderByChild: 'name',
        limitToFirst: 6,
        startAt: start,
        endAt: end
      }
    });
  }

  ngOnInit() {
    this.findGroup(this.startWith, this.endWith)
      .subscribe(searchGroups => this.searchGroups = searchGroups);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }

  public shareWithGroup(idGroup: string, groupName: string): void {
    this.db.list('groups/' + idGroup + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + this.idpar).set({ name: this.listService.list.name, picture: this.listService.list.picture, admin: this.listService.list.admin });
        this.db.object('lists/' + this.idpar + '/users/' + snapshot.key).set({ uid: snapshot.key });
      });
    })
    this.db.object('groups/' + idGroup + '/lists/' + this.idpar).set({ name: this.listService.list.name, picture:  this.listService.list.picture, admin: this.listService.list.admin});
    this.db.object('lists/' + this.idpar + '/groups/' + idGroup).set({ name: groupName });
  }

  public search($event: any): void {
    let queryText: string = $event.target.value;
    if (queryText.length > 0) {
      this.startWith.next(queryText)
      this.endWith.next(queryText + '\uf8ff')
    }
    else {
      this.searchGroups = [];
    }
  }

}
