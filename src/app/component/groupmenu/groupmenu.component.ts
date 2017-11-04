import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-groupmenu',
  templateUrl: './groupmenu.component.html',
  styleUrls: ['./groupmenu.component.css']
})
export class GroupmenuComponent implements OnInit {
  private modalWindow: NgbModalRef;
  private parid: string;

  constructor(private modalService: NgbModal, public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public deleteGroup(): void {
    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true}).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/groups/' + this.parid ).remove();
      });
    })
    this.db.object('/groups/' + this.parid).remove();
  }

  public updateGroup(newValue: string): void {
    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true}).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/groups/' + this.parid ).update({name: newValue});
      });
    })
    this.db.object('/groups/' + this.parid).update({ name: newValue });
    this.modalWindow.close();
  }
}
