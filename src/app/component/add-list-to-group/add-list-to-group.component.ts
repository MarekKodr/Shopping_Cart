import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase } from 'angularfire2/database';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Params, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-add-list-to-group',
  templateUrl: './add-list-to-group.component.html',
  styleUrls: ['./add-list-to-group.component.css']
})
export class AddListToGroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public parid: string;

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private addList(name: string) {
    let listsRef = this.db.list('lists').push({ value: name, uid: this.parid });
    firebase.database().ref('groups/' + this.parid + '/lists').child(listsRef.key).set({ name: name });
    this.modalWindow.close();
  }
}
