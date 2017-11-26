import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';


@Component({
  selector: 'app-my-list-menu',
  templateUrl: './my-list-menu.component.html',
  styleUrls: ['./my-list-menu.component.css']
})
export class MyListMenuComponent implements OnInit {
  public items: FirebaseListObservable<any[]>;
  public flag: string = '';

  constructor(private db: AngularFireDatabase,
    // public activatedRoute: ActivatedRoute,
    public service: Service,
    // private modalService: NgbModal,
    public listService: ListService) { }
  
    ngOnInit() {
      this.items = this.db.list('/food', {
      query: {
        orderByChild: 'email',
        equalTo: this.service.user.email
      }
    });
    }

  public showBookItems(): void {
    this.flag = 'showBookItems';
  }

  public showBuyItems(): void {
    this.flag = 'showBuyItems';
  }

  public showAllItems(): void {
    this.flag = 'showAllItems';
  }

}
