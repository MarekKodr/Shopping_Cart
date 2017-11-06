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

  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  private modalWindow: NgbModalRef;
  private parid: string;

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.items = db.list('/items');
    // this.item = db.object('/items/' + this.id);
  }

  ngOnInit() {
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public updateList(newValue: string): void {
    // this.items.update(this.id, { value: newValue });
  }


  public deleteList(): void {
    this.db.list('lists/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.list('users/' + snapshot.key + '/lists/' + this.parid).remove();
      })
    }).unsubscribe(); // delete list from users

    this.db.list('lists/' + this.parid + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.list('groups/' + snapshot.key + '/lists/' + this.parid).remove();
      })
    }).unsubscribe(); // delete list from groups

    this.db.object('lists/' + this.parid).remove(); // delete list from lists

    this.modalWindow.close();
    this.router.navigate(['/lists']);
  }
}
