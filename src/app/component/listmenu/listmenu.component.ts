import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-listmenu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.css']
})
export class ListmenuComponent implements OnInit {

  private count: number;
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  private modalWindow: NgbModalRef;
  private parid: string;
  public shared: boolean;
  public group: FirebaseListObservable<any[]>;
  public groups: FirebaseListObservable<any[]>;


  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.items = db.list('/items');
  }

  ngOnInit() {
  }

  open(content) {
    this.alreadyShared();
    this.modalWindow = this.modalService.open(content);
  }

  public updateList(newValue: string): void {
    this.db.list('lists/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + this.parid).update({ name: newValue });
      })
    }); // delete list from users

    this.db.list('lists/' + this.parid + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('groups/' + snapshot.key + '/lists/' + this.parid).update({ name: newValue });
      })
    }); // delete list from groups

    this.db.object('lists/' + this.parid).update({ name: newValue }); // delete list from lists

    this.modalWindow.close();
  }


  public deleteList(): void {
    this.db.list('lists/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + this.parid).remove();
      })
      this.db.list('lists/' + this.parid + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.db.object('groups/' + snapshot.key + '/lists/' + this.parid).remove();
        })
        this.db.object('lists/' + this.parid).remove(); // delete list from lists
      }); // delete list from groups
    }); // delete list from users

    this.modalWindow.close();
    this.router.navigate(['/lists']);
  }

  public alreadyShared(): void {
    this.group = this.db.list('/lists/' + this.parid + '/groups', {
      query: {
        orderByChild: 'name'
      }
    });

    let dbRef = this.group.subscribe(gr => {
      this.count = gr.length;
      if (this.count == 0) {
        this.shared = false;
      }
      else {
        this.shared = true;
      }
    });
  }

  public shareList(): void {
    // this.alredyShared();
  }
}
