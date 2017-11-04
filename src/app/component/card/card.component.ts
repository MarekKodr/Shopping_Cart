import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Service } from '../../service/service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
    public service: Service) {
    //      this.items = db.list('/items');

  }

  ngOnInit() {
    this.items = this.db.list('/items', {
      query: {
        orderByChild: 'uid',
        equalTo: this.service.user.uid
      }
    });
  }

}
