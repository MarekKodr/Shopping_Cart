import { Service } from '../../service/service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { List } from '../../model/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  public lists: FirebaseListObservable<List[]>;
  public noList: boolean = false;

  constructor(
    public db: AngularFireDatabase,
    public service: Service
  ) { }


  ngOnInit() {
    this.lists = this.db.list('users/' + this.service.user.uid + '/lists');
    this.lists.subscribe(
      count => {
        if (count.length == 0)
          this.noList = true;
        else
          this.noList = false;
      });
  }
}
