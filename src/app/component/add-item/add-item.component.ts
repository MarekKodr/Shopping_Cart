import { ListService } from '../../service/list.service';
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
  
  constructor(
    private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public litService: ListService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.items = db.list('/food');
   }

  ngOnInit() {
  }

  private addItem(name: string, quantity: number, node: string): void {
    console.log('num: ' + quantity);
    for(var i = 0; i < quantity.toString().length; i++) {
      if(quantity.toString().charAt(i) < '0' || quantity.toString().charAt(i) > '9') {
        return;
      }
    }
    if(!node) {
      node = '';
    }
    this.items.push({ value: name.charAt(0).toUpperCase() + name.slice(1), quantity: quantity, 
      node: node, lid: this.id, lname: this.litService.list.name, reserved: '0', email: '' });

    // this.db.object('users/' + this.)  
  }

}
