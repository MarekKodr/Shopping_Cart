import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class Service {
    public user: User;
    public friend: boolean;

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

    public isFriend(id: string, email: string) {
        console.log('USER: ', email);

        this.db.list('/users/' + this.user.uid + '/friends/' + id).subscribe(gr => {
            if (gr.length == 0) {
                console.log('this.friend == false');
                this.friend = false;
            } else {
                console.log('this.friend == true');
                this.friend = true;
            }
        });
    }


}