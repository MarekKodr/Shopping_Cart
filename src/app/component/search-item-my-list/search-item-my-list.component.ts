import { ListService } from '../../service/list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Service } from '../../service/service';
import { CapitalizePipe } from '../../pipe/capitalize.pipe';
import { List } from '../../model/list';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-search-item-my-list',
  templateUrl: './search-item-my-list.component.html',
  styleUrls: ['./search-item-my-list.component.css']
})
export class SearchItemMyListComponent implements OnInit {

  public items: FirebaseListObservable<any>;
  private modalWindow: NgbModalRef;
  private checked: string[] = [];

  public user: FirebaseListObservable<any>;
  public selItems: any[];
  public startWith = new Subject();
  public endWith = new Subject();

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public itemService: ItemService,
    private modalService: NgbModal) {


    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
    this.search("");
  }

  ngOnInit() {
    this.search("");
  }

  open(content) {
    this.modalWindow = this.modalService.open(content);
  }

  public search(text: string): void {
    this.startWith.next(text)
    this.endWith.next(text + '\uf8ff')
    this.itemService.findItem(this.startWith, this.endWith)
      .subscribe(selItems => this.selItems = selItems);
  }

  public onChange(id: string, flag): void {
    console.log(id + " : " + flag);
    if (flag) {
      this.checked.push(id);
    } else {
      this.checked = this.checked.filter(item => item.toString() !== id);
    }
  }

  public resetChecked() {
    this.checked = this.checked.filter(item => item.toString() == '');
  }

  public deleteItems(): void {
    this.checked.forEach(id => {
      this.items.remove(id);
    });
    this.resetChecked();
    this.modalWindow.close();
  }

  public unSelect(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '0', email: '' });
    });
    this.resetChecked();
  }

  public buyItems(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '2', email: this.actUser.user.email });
    });
    this.resetChecked();
    this.modalWindow.close();
  }

  public getResult(reserved: string): string {
    return reserved == '2' ? 'Purchased' : 'Reserved';
  }

  public increaseQuantity(id: string, newQuantity: number): void {
    this.items.update(id, { quantity: ++newQuantity });
  }

  public reduceQuantity(id: string, newQuantity: number): void {
    if (newQuantity > 1) {
      this.items.update(id, { quantity: --newQuantity });
    }
  }
}
