import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Service } from '../../service/service';
import * as firebase from 'firebase/app';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  private modalWindow: NgbModalRef;
  public tmp: string = '';
  public listPicture: string = '';

  constructor(
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public service: Service, 
    public listService: ListService
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private addList(name: string, note?: string) {
    this.listService.addList(name, this.service, note);
    this.modalWindow.close();
    this.tmp = '';
  }
}
