import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class Service {
    public user: User;
    public friend: boolean;
    public afAuth: AngularFireAuth;

    constructor(private db: AngularFireDatabase) {
        this.user = new User();
        
    }

    public findFriend(uEmail: string): FirebaseListObservable<User[]> {
        console.log('findFriend: ', uEmail);
        return this.db.list('/users', {
            query: {
                orderByChild: 'email',
                equalTo: uEmail
            }
        });
    }



    public findMember(start, end, grId: string): FirebaseListObservable<User[]> {
        return this.db.list('/groups/' + grId + '/users', {
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

    public delUserFromGroup(grid: string, idUser: string): void {
        this.db.list('groups/' + grid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.db.object('users/' + idUser + '/lists/' + snapshot.key).remove();
            })
            this.db.object('users/' + idUser + '/groups/' + grid).remove();
        });
    }
}