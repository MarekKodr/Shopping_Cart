import { Subscription } from 'rxjs/Rx';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { OnDestroy } from '@angular/core';
import { BroadcastService } from '../service/broadcast.service';
import { Event } from './event';

export class MySubscriable implements OnDestroy {
    private subscription: Subscription[] = [];

    constructor(
        public broadcastService: BroadcastService,
    ) { }

    public subscribe(event: Event, callback: (data?: any) => void) {
        let sub: Subscription = this.broadcastService.subject(event).subscribe((data) => callback(data));
        this.subscription.push(sub);
    }

    public next(event: Event, data?: any) {
        this.broadcastService.next(event, data);
    }

    ngOnDestroy() {
        for(let sub of this.subscription) {
            sub.unsubscribe();
        }
    }
}