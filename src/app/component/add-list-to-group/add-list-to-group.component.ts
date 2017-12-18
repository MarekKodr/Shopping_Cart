import { group } from '@angular/animations/src/animation_metadata';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Params, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';
import { ListService } from '../../service/list.service';


@Component({
  selector: 'app-add-list-to-group',
  templateUrl: './add-list-to-group.component.html',
  styleUrls: ['./add-list-to-group.component.css']
})
export class AddListToGroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public parid: string;
  public users: FirebaseListObservable<any[]>;
  public listPicture: string = '';

  constructor(
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public userService: Service,
    public groupService: GroupService,
    public listService: ListService ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }


  public addList(name: string, note?: string) { //zmena    
    this.listService.addList(name, this.userService, note, this.parid)
    this.modalWindow.close();
  }
}
