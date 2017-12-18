import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '../../service/group.service';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent implements OnInit {
  public lists: FirebaseListObservable<any[]>;
  public parid: string;
  
  constructor(
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute, 
    public groupService: GroupService,
    public listService: ListService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.lists = this.db.list('groups/' + this.parid + '/lists');

  }

}
