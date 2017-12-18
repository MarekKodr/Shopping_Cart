import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  public items: FirebaseListObservable<any[]>;
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
    this.items = this.db.list('/food');
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

  public bookItems(): void {
    this.checked.forEach(id => {
      this.items.update(id, { reserved: '1', email: this.actUser.user.email });
    });
    this.resetChecked();
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
