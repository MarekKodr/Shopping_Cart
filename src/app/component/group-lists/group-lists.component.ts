import { Group } from '../../model/group';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Params, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../service/group.service';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-group-lists',
  templateUrl: './group-lists.component.html',
  styleUrls: ['./group-lists.component.css']
})
export class GroupListsComponent implements OnInit {
  public parid: string;
  public lists: FirebaseListObservable<any[]>;
  public group: Group;

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
    this.group = this.groupService.group;
  }

}
