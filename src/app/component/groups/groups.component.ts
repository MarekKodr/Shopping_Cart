import { GroupService } from '../../service/group.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groups: FirebaseListObservable<any[]>;
  public noNote: boolean;
  public noGroup: boolean = false;
  private modalWindow: NgbModalRef;
  public grId: string;

  constructor(
    public db: AngularFireDatabase,
    public service: Service,
    public groupService: GroupService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.groups = this.db.list('users/' + this.service.user.uid + '/groups');
    this.groups.subscribe(
      count => {
        if (count.length == 0)
          this.noGroup = true;
        else
          this.noGroup = false;
      });
  }

  open(content, id: string) {
    this.grId = id;
    this.modalWindow = this.modalService.open(content);
  }

  public addNote(note: string): void {
    this.groupService.addNote(note, this.grId);
    this.modalWindow.close();
  }
}

