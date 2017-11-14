import { FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Group } from '../model/group';

@Injectable()

export class GroupService {
    public group: Group;

    constructor() {
        // this.group = new Group();
        // this.group.name = '';
        // this.group.picture = '';
        // this.group.admin = '';
        // this.group.note = '';
    }

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

    public addGroup() {

    }

}