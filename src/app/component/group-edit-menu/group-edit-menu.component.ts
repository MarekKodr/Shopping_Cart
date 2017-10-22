import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from 'angularfire2/database';
import { Params, ActivatedRoute } from '@angular/router';
import { MySubscriable } from '../../util/my-subscriable';
import { BroadcastService } from '../../service/broadcast.service';
import { Event } from '../../util/event';


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
    public broadcastService: BroadcastService) {

    super(broadcastService);

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });

    // this.subscribe(Event.LIST_DEL_FINISH, () => {});


  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  private delList(idlist: string): void {
    this.db.list('lists/' + idlist + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
      delUsers.forEach(delUser => {
        this.db.object('users/' + delUser.key + '/lists/' + idlist).remove();
      })
    });
  }

  public delGroup(): void {
    this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.delList(snapshot.key);
      })
      this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
        delUsers.forEach(delUser => {
          this.db.object('users/' + delUser.key + '/groups/' + this.parid).remove();
        })
        this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            this.db.object('lists/' + snapshot.key).remove();
          })
          this.db.object('/groups/' + this.parid).remove(); // mazani skupiny ze skupiny
        }); // mazani listu, ktere nalezeli dane skupine z listu
      });
    }); // mazani listu, ktere nalezeli dane skupine z uzivatelu
  }


  public updateGroup(newValue: string): void { // asi dobry

    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
      delUsers.forEach(delUser => {
        this.db.object('users/' + delUser.key + '/groups/' + this.parid).update({ name: newValue });
      })

      this.db.list('groups/' + this.parid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.db.object('lists/' + snapshot.key).update({ name: newValue });
        })
      }); // mazani listu, ktere nalezeli dane skupine z listu
      this.db.object('/groups/' + this.parid).update({ name: newValue }); // mazani skupiny ze skupiny
    });
    this.modalWindow.close();
  }
}
