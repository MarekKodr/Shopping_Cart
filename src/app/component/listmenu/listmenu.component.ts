import { GroupService } from '../../service/group.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ListService } from '../../service/list.service';
import { Group } from '../../model/group';

@Component({
  selector: 'app-listmenu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.css']
})
export class ListmenuComponent implements OnInit {

  private count: number;
  private modalWindow: NgbModalRef;
  private parid: string;

  public shareWithName: string = '';
  public shareWithId: string;

  public group: FirebaseListObservable<Group[]>;

  constructor(
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public groupService: GroupService,
    public listService: ListService
  ) {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  ngOnInit() { }

  open(content) {
    this.alreadyShared();
    this.modalWindow = this.modalService.open(content);
  }

  public updateList(newName: string): void {
    this.listService.renameList(newName, this.parid);
    this.modalWindow.close();
  }


  public deleteList(): void {
    this.listService.delList(this.parid);
    this.modalWindow.close();
    this.router.navigate(['/lists']);
  }

  public alreadyShared(): void {
    this.group = this.db.list('/lists/' + this.parid + '/groups');

    this.group.subscribe(gr => {
      this.count = gr.length;
      if (this.count != 0) {
        this.shareWithName = gr[0].name;
        // this.shareWithId = gr[0].$key;
      }
    });
  }
}
