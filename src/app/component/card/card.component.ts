import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  
    constructor(public db: AngularFireDatabase) {
      this.items = db.list('/items');
    }

  ngOnInit() {
  }

}
