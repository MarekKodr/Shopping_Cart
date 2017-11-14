import { List } from '../../model/list';
import { ListService } from '../../service/list.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Service } from '../../service/service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public lists: FirebaseListObservable<List[]>;
  
  constructor(
    public db: AngularFireDatabase,
    public service: Service,
    public listService: ListService 
  ) {}

  ngOnInit() {
    this.lists = this.db.list('users/' + this.service.user.uid + '/lists');
  }

  public addNote(note?: string) {

  }
}
