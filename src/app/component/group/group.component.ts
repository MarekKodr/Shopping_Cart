import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Service } from '../../service/service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public group: FirebaseObjectObservable<any>;
  public users: FirebaseListObservable<any[]>;
  private idpar: string = '';

  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public actUser: Service) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
    this.group = this.db.object('groups/' + this.idpar);
    this.users = this.db.list('groups/' + this.idpar + '/users');
  }

  public deleteFriend(id: string): void { 
    this.db.object('groups/' + this.idpar + '/users/' + id).remove();
    this.db.object('users/' + id + '/groups/' + this.idpar).remove();
  }
}
