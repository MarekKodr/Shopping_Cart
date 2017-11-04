import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Service } from '../../service/service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groups: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
    public service: Service) { 
      
    }

  ngOnInit() {
    this.groups = this.db.list('/groups', {
      query: {
        orderByChild: 'uid',
        equalTo: this.service.user.uid
      }
    });
  }
}

