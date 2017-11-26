import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(
    private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public service: Service,
    private modalService: NgbModal,
    public listService: ListService
  ) { }

  ngOnInit() {
  }


  
}
