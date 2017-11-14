import { group } from '@angular/animations/src/animation_metadata';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Params, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import { Service } from '../../service/service';
import { GroupService } from '../../service/group.service';


@Component({
  selector: 'app-add-list-to-group',
  templateUrl: './add-list-to-group.component.html',
  styleUrls: ['./add-list-to-group.component.css']
})
export class AddListToGroupComponent implements OnInit {
  private modalWindow: NgbModalRef;
  public parid: string;
  public users: FirebaseListObservable<any[]>;
  public listPicture: string = '';

  constructor(
    private modalService: NgbModal,
    public db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public userService: Service,
    public groupService: GroupService ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }


  
  public random(): number {
    return Math.floor(Math.random() * 10) % 10;
  }

  public picture(): string {
    return  "../assets/images/lists/food" + this.random() +  ".png";
  }
  

  private addList(name: string) {
    
    this.listPicture = this.picture();
    let listsRef = this.db.list('lists').push({ name: name, picture: this.listPicture, admin: this.userService.user.email });

    this.db.list('groups/' + this.parid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + listsRef.key).set({ name: name, picture: this.listPicture, admin: this.userService.user.email });
        this.db.object('lists/' + listsRef.key + '/users/' + snapshot.key).set({ uid: snapshot.key });
      });
    })

    this.db.object('groups/' + this.parid + '/lists/' + listsRef.key).set({ name: name, picture: this.listPicture, admin: this.userService.user.email });
    this.db.object('lists/' + listsRef.key + '/groups/' + this.parid).set({ name: this.groupService.group.name});
    this.modalWindow.close();
  }
}
