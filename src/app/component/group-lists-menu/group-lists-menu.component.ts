import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group-lists-menu',
  templateUrl: './group-lists-menu.component.html',
  styleUrls: ['./group-lists-menu.component.css']
})
export class GroupListsMenuComponent implements OnInit {

  private modalWindow: NgbModalRef;
  public closeResult: String;
  groups: FirebaseListObservable<any[]>;
  group: FirebaseObjectObservable<any>;
  private parid: string;

  constructor(private modalService: NgbModal, public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.groups = this.db.list('/groups');
    // this.group = this.db.object('/groups/' + this.id);
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


  open(content) {
    this.modalWindow = this.modalService.open(content);
  }
  
  public deleteGroup(): void {
    this.group = this.db.object('/groups/' + this.parid);
    this.group.remove();
  }

  public updateGroup(newValue: string): void {
    this.groups.update(this.parid, { name: newValue });
    this.modalWindow.close();
  }
}
