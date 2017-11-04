import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../../service/service';
import { Params, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-add-list-to-group',
  templateUrl: './add-list-to-group.component.html',
  styleUrls: ['./add-list-to-group.component.css']
})
export class AddListToGroupComponent implements OnInit {

  closeResult: String;
  public items: FirebaseListObservable<any[]>;
  public groupLists: FirebaseListObservable<any[]>;
  private modalWindow: NgbModalRef;
  public tmp: string = '';
  public parid: string;

  constructor(private modalService: NgbModal,
    public db: AngularFireDatabase,
    public service: Service,
    public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
    this.items = this.db.list('/items');
    // this.groupLists = this.db.list('/groups/' + this.parid + '/lists');
    
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
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

  private addList(name: string) {
    this.items.push({ value: name, uid: this.service.user.uid });
    // this.groupLists
    let dbRef: firebase.database.Reference = firebase.database().ref('/groups' + this.parid + '/lists').child(this.parid);
    dbRef.set({ lid: dbRef.key});
    this.modalWindow.close();
    this.tmp = '';
  }

}
