import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Params, ActivatedRoute } from '@angular/router';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  private modalWindow: NgbModalRef;
  private idpar: string;

  constructor(
    private modalService?: NgbModal,
    public db?: AngularFireDatabase,
    public activatedRoute?: ActivatedRoute,
    public groupService?: GroupService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }


  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

}

