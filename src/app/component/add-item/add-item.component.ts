import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  private id: string = '';
  
  constructor(private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.items = db.list('/food');
   }

  ngOnInit() {
  }

  private addItem(name: string, quantity: number, node: string): void {
    console.log('num: ' + quantity);
    this.items.push({ value: name, quantity: quantity, node: node, lid: this.id, reserved: '0', email: '' });
  }

}
