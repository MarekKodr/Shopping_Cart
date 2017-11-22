import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MySubscriable } from '../../util/my-subscriable';
import { BroadcastService } from '../../service/broadcast.service';
import { Event } from '../../util/event';
import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';


@Component({
  selector: 'app-group-edit-menu',
  templateUrl: './group-edit-menu.component.html',
  styleUrls: ['./group-edit-menu.component.css']
})

export class GroupEditMenuComponent extends MySubscriable implements OnInit {

  private modalWindow: NgbModalRef;
  private parid: string;

  constructor(
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public broadcastService: BroadcastService,
    public actUser: Service,
    public groupService: GroupService, 
    private router: Router) {

    super(broadcastService);

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }


  public delGroup(): void {
    this.groupService.delGroup(this.parid);
    this.modalWindow.close();
    this.router.navigate(['/groups']);
  }


  public updateGroup(newName: string): void {
    this.groupService.renameGroup(newName, this.parid);
    this.modalWindow.close();
  }

  public leaveGroup(): void { // zmena!!

    this.actUser.delUserFromGroup(this.parid, this.actUser.user.uid);
    // this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
    //   snapshots.forEach(snapshot => {
    //     this.db.object('users/' + this.actUser.user.uid + '/lists/' + snapshot.key).remove();
    //   })
    //   this.db.object('users/' + this.actUser.user.uid + '/groups/' + this.parid).remove();
    // });
    this.modalWindow.close();
  }
}
