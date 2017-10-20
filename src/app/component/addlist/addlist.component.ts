import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Service } from '../../service/service';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

 closeResult: String;
  items: FirebaseListObservable<any[]>;
  private modalWindow: NgbModalRef;

  constructor(private modalService: NgbModal,
              public db: AngularFireDatabase,
              public service: Service) {
    this.items = db.list('/items');
  }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private addList(name: string) {
    this.items.push({ value: name, uid: this.service.user.uid });
    this.modalWindow.close();
  }
}
