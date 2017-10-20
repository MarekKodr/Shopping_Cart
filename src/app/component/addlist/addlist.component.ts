import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  private modalWindow: NgbModalRef;

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase) {
    this.items = db.list('/items');
  }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private addList(name: string) {
    this.items.push({ value: name });
    this.modalWindow.close();
  }
}
