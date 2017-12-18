import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';
import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-group-lists',
  templateUrl: './group-lists.component.html',
  styleUrls: ['./group-lists.component.css']
})

export class GroupListsComponent implements OnInit {
  private idpar: string;

  
  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public actUser: Service,
    public groupService: GroupService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
    this.groupService.convertGroup(this.db.object('groups/' + this.idpar));
    // this.users = this.db.list('groups/' + this.idpar + '/users');
  }
}
