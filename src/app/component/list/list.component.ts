import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any[]>;
  food: FirebaseListObservable<any[]>;
  private id: string = '';
  private checked: string[] = [];

  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.item = db.object('/items/' + this.id);
    this.items = db.list('/food');
    this.food = db.list('/food', {
      query: {
        orderByChild: 'lid',
        equalTo: this.id
      }
    });
  }

  ngOnInit() {
  }

  private addItem(name: string): void {
    this.items.push({ value: name, lid: this.id });
  }

  public searchItems(name: string): void {
    console.log('name: ' + name);
    this.food = this.db.list('/food', {
      query: {
        orderByChild: 'value',
        startAt: name
      }
    });
  }

  public deleteList(): void {
    this.item.remove();
    this.router.navigate(['/lists']);
  }

  public onChange(id: string, flag): void {
    console.log(id + " : " + flag);
    if (flag) {
      this.checked.push(id);
    } else {
      this.checked = this.checked.filter(item => item.toString() !== id);
    }
  }

  public deleteItems(): void {
    this.checked.forEach(element => {
      this.items.remove(element);
    });
  }

}
