import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class Service {
    public user: User;
    constructor(private db: AngularFireDatabase) {
        this.user = new User();
    }

    public findCustomers(start, end): FirebaseListObservable<User[]> {
        return this.db.list('/users', {
            query: {
                orderByChild: 'email',
                limitToFirst: 6,
                startAt: start,
                endAt: end
            }
        });
    }

}