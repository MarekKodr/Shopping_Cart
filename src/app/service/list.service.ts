import { Service } from './service';
import { List } from '../model/list';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';



@Injectable()

export class ListService {
  public list: List; // name?: string, picture?: string, admin?: string, note?: string

  constructor(
    public db: AngularFireDatabase
  ) {
    this.list = new List();
  }

  public setList(list: List) {
    this.list = list;
  }

  public convertList(dbList: FirebaseObjectObservable<List>) {
    dbList.subscribe(snlist => {
      this.list = new List(snlist.name, snlist.picture, snlist.admin, snlist.note);
    });
  }


  public findList(start, end, idGroup: string): FirebaseListObservable<List[]> {
    return this.db.list('/groups/' + idGroup + '/lists', {
      query: {
        orderByChild: 'name',
        limitToFirst: 6,
        startAt: start,
        endAt: end
      }
    });
  }

  /* ADD LIST -------------------------------------------------------------------------------------*/

  public random(): number {
    return Math.floor(Math.random() * 10) % 10;
  }

  public picture(): string {
    return "../assets/images/lists/food" + this.random() + ".png";
  }

  public addListToGroup(idList, idGroup: string) {
    this.db.list('groups/' + idGroup + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + idList).set(this.list);
        this.db.object('lists/' + idList + '/users/' + snapshot.key).set({ uid: snapshot.key });
      });
    })
    this.db.object('lists/' + idList + '/groups/' + idGroup).set({ gid: idGroup });
    this.db.object('groups/' + idGroup + '/lists/' + idList).set(this.list);
  }

  public addList(name: string, userService: Service, note?: string, idGroup?: string) { // pridani admina do users!!!
    if (note == null) {
      note = '';
    }
    this.list = new List(name, this.picture(), userService.user.email, note);

    let listRef = this.db.list('lists').push(this.list); // problemek v testu
    this.db.object('lists/' + listRef.key + '/users/' + userService.user.uid).set(userService.user);

    if (idGroup != null) {
      this.addListToGroup(listRef.key, idGroup);
    }
    else {
      this.db.object('users/' + userService.user.uid + '/lists/' + listRef.key).set(this.list);
    }
  }

  /* RENAME LIST -------------------------------------------------------------------------------*/

  public renameList(newName: string, idList: string): void {
    this.list.name = newName
    this.db.list('lists/' + idList + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + idList).update({ name: this.list.name });
      })
    });

    this.db.list('lists/' + idList + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('groups/' + snapshot.key + '/lists/' + idList).update({ name: this.list.name });
      })
    });

    this.db.object('lists/' + idList).update({ name: this.list.name });
  }

  /* DELETE LIST--------------------------------------------------------------------------------*/

  public delList(idList: string): void {

    this.db.list('lists/' + idList + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log('1');
        this.db.object('users/' + snapshot.key + '/lists/' + idList).remove();

      })

      this.db.list('lists/' + idList + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.db.object('groups/' + snapshot.key + '/lists/' + idList).remove();
        })
        this.db.object('lists/' + idList).remove();
      });

    });

  }

  /* -------------------------------------------------------------------------------------*/

  public addNote(idList: string, note?: string) {
    this.list.note = note;
    this.db.list('lists/' + idList + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('users/' + snapshot.key + '/lists/' + idList).update({ note: this.list.note });
      })
    });

    this.db.list('lists/' + idList + '/groups', { preserveSnapshot: true }).subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.db.object('groups/' + snapshot.key + '/lists/' + idList).update({ note: this.list.note });
      })
    });

    this.db.object('lists/' + idList).update({ note: this.list.note });
  }

  /*----------------------------------------------------------------------------------------*/

}