import { FirebaseApp } from 'angularfire2/firebase.app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddlistComponent } from './addlist.component';
import { ListService } from './list.service';
import { Service } from './service';
import { User } from '../model/user';
import { List } from '../model/list';


import server from "karma-firebase-server";
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AddlistComponent } from '../component/addlist/addlist.component';
import * as firebase from 'firebase/app';


describe('ListService', () => {
    let db: AngularFireDatabase;
    let listService: ListService;
    let list: List;
    let userService: Service;
    // let port;



    beforeEach(() => {

        listService = new ListService(db);
        list = new List('testListName', null, 'test@test.com', 'test');
        userService = new Service(db);
        // server.start(res => {
        //     port = res.text;
        // });
    });


    it('create an instance of List', () => {
        let list = new List();
        expect(list).toBeTruthy();
    });

    it('create an instance of ListService', () => {
        this.listService = new ListService(db);
        expect(listService).toBeTruthy();
    });

    it('setList()', () => {
        listService.setList(list);
        expect(list.name).toBe('testListName');
        expect(list.picture).toBe(null);
        expect(list.admin).toBe('test@test.com');
        expect(list.note).toBe('test');

        expect(listService.list.name).toBe('testListName');
        expect(listService.list.picture).toBe(null);
        expect(listService.list.admin).toBe('test@test.com');
        expect(listService.list.note).toBe('test');
    });

    it('addList()', () => {
        var ref = firebase.database;
        // var ref = new FirebaseApp();
        // this.db = new AngularFireDatabase(ref );
        // this.listService = new ListService( ref. );
        // this.listService.addlist( list );
    });

    // it('renameList(newName: string, idList: string)', () => {
    //     // let listService = new ListService(db);
    //     // let list = new List('testListName', null, 'test@test.com', 'test');
    //     // listService.renameList(list);
    //     // let userService = new Service(db);
    //     // listService.addList('testListName', userService);
    // });


    afterAll(() => {
        // server.close(port, function () { });
    });

});