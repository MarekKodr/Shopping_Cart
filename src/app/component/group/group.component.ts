
import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public dbGroup: FirebaseObjectObservable<any>;
  public users: FirebaseListObservable<any[]>;

  private idpar: string = '';


  constructor(
    private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public actUser: Service,
    public groupService: GroupService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
    this.groupService.convertGroup(this.db.object('groups/' + this.idpar));
    this.users = this.db.list('groups/' + this.idpar + '/users');

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
