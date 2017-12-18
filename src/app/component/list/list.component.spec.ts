import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';


describe('ListComponent', () => {
  it('getResult()', () => {
    let component = new ListComponent( );
    const result = component.getResult('2');
    expect(result).toBe('Purchased');
    const result2 = component.getResult('1');
    expect(result2).toBe('Reserved');
  });

  it('resetChecked()', () => {
    let component = new ListComponent( );
    component.resetChecked();
    expect(component.checked.length).toBe(0);
  });

  
});
