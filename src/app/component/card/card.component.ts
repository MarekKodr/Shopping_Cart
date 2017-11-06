import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Service } from '../../service/service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public lists: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
    public service: Service) {
  }

  ngOnInit() {
    this.lists = this.db.list('users/' + this.service.user.uid + '/lists');
  }
}
