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
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public groupService: GroupService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }


  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private addMember(idfriend: string, email: string, foto: any): void {
    this.db.object('groups/' + this.idpar + '/users/' + idfriend).set({ email: email, foto: foto });
    this.db.object('users/' + idfriend + '/groups/' + this.idpar).set({ name: this.groupService.group.name, admin: this.groupService.group.admin });

    this.db.list('groups/' + this.idpar + '/lists').subscribe(newList => {
      newList.forEach(newList => {
        this.db.object('users/' + idfriend + '/lists/' + newList.$key).set({ name: newList.name, picture: newList.picture, admin: newList.admin });
        this.db.object('lists/' + newList.$key + '/users/' + idfriend).set({ uid: idfriend });
      })
    });  //pridani listu k uzivateli  a pridani uzivatelu k listum
  }
}

