import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddlistComponent } from './addlist.component';
import { GroupService } from './group.service';
import { Service } from './service';
import { User } from '../model/user';
import { List } from '../model/list';



import server from "karma-firebase-server";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Group } from '../model/group';
import { ListService } from './list.service';
  
describe('GroupService', () => {
    let db: AngularFireDatabase;
    let groupService: GroupService;
    let listService: ListService;

    it('create an instance of Group', () => {
        let group = new Group();
        expect(group).toBeTruthy();
    });

    it('setGroup()', () => {
        listService = new ListService(db);
        groupService = new GroupService(db, listService);
        groupService.setGroup('testGroup', null, 'test@test.com', 'testNote');
        expect(groupService.group.name).toBe('testGroup');
        expect(groupService.group.picture).toBe(null);
        expect(groupService.group.admin).toBe('test@test.com');
        expect(groupService.group.note).toBe('testNote');
    });


});