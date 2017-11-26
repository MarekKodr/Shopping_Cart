import { any } from 'codelyzer/util/function';
import { Service } from './service';
// import { List } from '../model/list';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';



@Injectable()


export class ItemService {

    items: FirebaseListObservable<any[]>;
    constructor(
        public db: AngularFireDatabase,
        public userService: Service
    ) { }

    public findItem(start, end): FirebaseListObservable<any[]> {
        return this.db.list('/food', {
            query: {
                orderByChild: 'value',
                limitToFirst: 6,
                startAt: start,
                endAt: end
            }
        });
    }
}