import { List } from '../../model/list';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Service } from '../../service/service';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '../../service/group.service';
import { ListService } from '../../service/list.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})

export class SearchListComponent implements OnInit {

  public user: FirebaseListObservable<any>;
  public lists: List[];
  public idpar: string;
  public startWith = new Subject();
  public endWith = new Subject();
  queryText: string = '';
  public lsId: string;
  private modalWindow: NgbModalRef;

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public activatedRoute: ActivatedRoute,
    public listService: ListService,
    private modalService: NgbModal) {

      
    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
    this.search("");
  }

  ngOnInit() {
    this.search("");
  }

  open(content, id: string) {
    this.lsId = id;
    this.modalWindow = this.modalService.open(content);
  }

  public search(text: string ): void {
    this.startWith.next(text)
    this.endWith.next(text + '\uf8ff')
    this.listService.findList(this.startWith, this.endWith, this.idpar)
    .subscribe(lists => this.lists = lists);  
  }
}
