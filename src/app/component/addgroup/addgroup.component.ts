import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public groups: FirebaseListObservable<any[]>;


  constructor(
    private modalService: NgbModal,
    public actUser: Service,
    public db: AngularFireDatabase,
    public goupService: GroupService) {

  }

  ngOnInit() {
    this.groups = this.db.list('/users/' + this.actUser.user.uid + '/groups');
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  // user: User, name: string, note?: string
  private addGroup(name: string, note?: string) {
    if(note == null)
      note = '';
    this.goupService.addGroup(this.actUser.user, name, note);
    this.modalWindow.close();
  }
}
