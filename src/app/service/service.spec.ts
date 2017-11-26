import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFireDatabase } from 'angularfire2/database';
import { Service } from './service';
import { User } from '../model/user';



describe('Service', () => {

    it('create an instance of User', () => {
        let user = new User();
        expect(user).toBeTruthy();
    });


    it('getResult()', () => {
        // let component = new ListComponent( );

        // const result = component.getResult('2');
        // expect(result).toBe('Purchased');
        // const result2 = component.getResult('1');
        // expect(result2).toBe('Reserved');
      });

});