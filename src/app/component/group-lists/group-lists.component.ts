import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-lists',
  templateUrl: './group-lists.component.html',
  styleUrls: ['./group-lists.component.css']
})
export class GroupListsComponent implements OnInit {
  public parid: string;
  public items: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.items = this.db.list('groups/' + this.parid + '/lists');
  }

}
