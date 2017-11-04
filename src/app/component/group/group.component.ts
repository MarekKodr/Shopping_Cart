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
  public friends: FirebaseListObservable<any[]>;
  public actFriend: FirebaseObjectObservable<any>;
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
    this.friends = this.db.list('groups/' + this.idpar + '/friends');
  }

  public findFriend(id: string): any {
    // this.actFriend = this.db.object('users/' + id);
    // return this.actFriend;
  }

  public deleteFriend(id: string): void {
    this.db.object('groups/' + this.idpar + '/friends/' + id).remove()
  }
}
