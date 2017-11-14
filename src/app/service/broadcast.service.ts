import { any } from 'codelyzer/util/function';
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { DataEvent } from '../util/data-event';
import { Event } from '../util/event';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BroadcastService {

  private default: DataEvent = new DataEvent(Event.FIRST, '')
  private broadcastDataSubject: BehaviorSubject<DataEvent> = new BehaviorSubject<DataEvent>(this.default);

  public next(event: Event, data?: any): void {
    let dataEvent: DataEvent;
    if (data) {
      dataEvent = new DataEvent(event, data);
    } else {
      dataEvent = new DataEvent(event, '');
    }
    return this.broadcastDataSubject.next(dataEvent);
  }

  public subject(event: Event): Observable<any> {
    return this.broadcastDataSubject.asObservable().filter(dataEvent => dataEvent.event === event).map((dataEvent) => dataEvent.data);
  }
}
