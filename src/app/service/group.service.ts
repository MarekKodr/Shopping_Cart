import { User } from '../model/user';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';
import { ListService } from './list.service';

@Injectable()

export class GroupService {
    public group: Group;

    constructor(
        public db: AngularFireDatabase,
        public listService: ListService
    ) { }

    public setGroup(name?: string, gid?: string, picture?: string, admin?: string, note?: string): void {
        this.group.name = name;
        this.group.picture = picture;
        this.group.admin = admin;
        this.group.note = note;
    }


    public convertGroup(dbGroup: FirebaseObjectObservable<Group>) {
        dbGroup.subscribe(sngroup => {
            this.group = new Group(sngroup.name, sngroup.picture, sngroup.admin, sngroup.note);
        });
    }

    // name?: string, picture?: string, admin?: string, note?: string
    public addGroup(user: User, name: string, note?: string) {
        if(note == null) 
            note = '';
        console.log('note: ', note);
        this.group = new Group(name, '', user.email, note);
        let dbRef = this.db.list('/users/' + user.uid + '/groups').push(this.group);
        this.db.object('/groups/' + dbRef.key).set(this.group);
        this.db.object('/groups/' + dbRef.key + '/users/' + user.uid).set(user);
    }

    public addNote(note: string, grId: string): void {
        console.log('addNote');
        this.db.list('groups/' + grId + '/users', { preserveSnapshot: true }).subscribe(grUsers => {
            grUsers.forEach(grUser => {
                this.db.object('users/' + grUser.key + '/groups/' + grId).update({ note: note });
            })
        });
        this.db.object('/groups/' + grId).update({ note: note });
    }


    private delLists(grid: string) {
        this.db.list('groups/' + grid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                console.log('1');
                this.listService.delList(snapshot.key);
            })
        });
    }

    private delGroups(grid: string) {
        this.db.list('groups/' + grid + '/users', { preserveSnapshot: true }).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                console.log('2');
                this.db.object('users/' + snapshot.key + '/groups/' + grid).remove();
            })
        });
    }

    public delGroup(grid: string): void {
        this.delLists(grid);
        this.delGroups(grid);
        this.db.object('groups/' + grid).remove();
    }


    public renameGroup(newName: string, grid: string): void { // asi dobry

        this.db.list('groups/' + grid + '/users', { preserveSnapshot: true }).subscribe(delUsers => {
            delUsers.forEach(delUser => {
                this.db.object('users/' + delUser.key + '/groups/' + grid).update({ name: newName });
            })
        });

        this.db.list('groups/' + grid + '/lists', { preserveSnapshot: true }).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.db.object('lists/' + snapshot.key).update({ name: newName });
            })
        }); 
        this.db.object('/groups/' + grid).update({ name: newName }); 
    }



}