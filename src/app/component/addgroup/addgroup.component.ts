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


  private addGroup(name: string, note?: string) {
    if(note == null)
      note = '';
    console.log(this.actUser.user.uid);
    let dbRef = this.db.list('/users/' + this.actUser.user.uid + '/groups').push({ name: name, admin: this.actUser.user.email, note: note });
    this.db.object('/groups/' + dbRef.key).set({ name: name, admin: this.actUser.user.email, note: note });
    this.db.object('/groups/' + dbRef.key + '/users/' + this.actUser.user.uid).set({ email: this.actUser.user.email, foto: this.actUser.user.photoURL });
    this.modalWindow.close();
  }
}
