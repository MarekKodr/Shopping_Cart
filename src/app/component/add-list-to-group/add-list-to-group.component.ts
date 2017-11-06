import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Params, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-add-list-to-group',
  templateUrl: './add-list-to-group.component.html',
  styleUrls: ['./add-list-to-group.component.css']
})
export class AddListToGroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public parid: string;
  public users: FirebaseListObservable<any[]>;

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
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

  private addList(name: string) {
    let listsRef = this.db.list('lists').push({ name: name });

    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + listsRef.key).set({ name: name });
        // this.db.object('lists/' + listsRef.key + '/users/' + snapshot.key).set({ uid: snapshot.key });
      });
    })
    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        // this.db.object('users/' + snapshot.key + '/lists/' + listsRef.key).set({ name: name });
        this.db.object('lists/' + listsRef.key + '/users/' + snapshot.key).set({ uid: snapshot.key });
      });
    })
    firebase.database().ref('groups/' + this.parid + '/lists').child(listsRef.key).set({ name: name });
    firebase.database().ref('lists/' + listsRef.key + '/groups').child(this.parid).set({ gid: this.parid });
    this.modalWindow.close();
  }
}
