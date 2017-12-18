import { List } from '../../model/list';
import { ListService } from '../../service/list.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Service } from '../../service/service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  public lists: FirebaseListObservable<List[]>;
  public lsId: string = '';
  private modalWindow: NgbModalRef;

  constructor(
    public db: AngularFireDatabase,
    public service: Service,
    public listService: ListService,
    private modalService: NgbModal
  ) {}

  open(content, id: string) {
    this.lsId = id;
    this.modalWindow = this.modalService.open(content);
  }

  ngOnInit() {
    this.lists = this.db.list('users/' + this.service.user.uid + '/lists');
  }

  public addNote(note?: string) {
    this.listService.addNote(this.lsId, note);
    this.modalWindow.close();
  }
}
