import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.component.html',
  styleUrls: ['./addlist.component.css']
})
export class AddlistComponent implements OnInit {

  private modalWindow: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  open(content) {
    this.modalWindow = this.modalService.open(content);
  }
}
