import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddlistComponent } from './addlist.component';
import { GroupService } from './group.service';
import { Service } from './service';
import { User } from '../model/user';
import { List } from '../model/list';



import server from "karma-firebase-server";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';



describe('GroupService', () => {
    let db: AngularFireDatabase;
    let groupService: GroupService;

    it('setGroup()', () => {
        groupService.setGroup('testGroup', null, null, 'test@test.com', 'testNote');
        expect(groupService.group.name).toBe('testGroup');
        expect(groupService.group.picture).toBe(null);
        expect(groupService.group.admin).toBe('test@test.com');
        expect(groupService.group.note).toBe('testNote');
    });


});