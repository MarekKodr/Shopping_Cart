import { Service } from '../../service/service';
import { ListService } from '../../service/list.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  items: FirebaseListObservable<any[]>;
  fItems: any[];
  private id: string = '';
  startWith = new Subject();
  endWith = new Subject();
  
  constructor(
    private db: AngularFireDatabase,
    public activatedRoute: ActivatedRoute,
    public litService: ListService,
    public actUser: Service) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.items = db.list('/food');
   }

   public findItem(start, end): FirebaseListObservable<any[]> {
    return this.db.list('/users/' + this.actUser.user.uid + '/items', {
      query: {
        orderByChild: 'name',
        limitToFirst: 6,
        startAt: start,
        endAt: end
      }
    });
  }

  ngOnInit() {
    this.findItem(this.startWith, this.endWith)
    .subscribe(fItems => this.fItems = fItems);

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

    this.db.list('users/' + this.actUser.user.uid + '/items').push({name: name});
  }


  public search(email: string): void {
    if (email.length > 0) {
      this.startWith.next(email)
      this.endWith.next(email + '\uf8ff')
    }
    else {
      this.fItems = [];
    }
  }
}
