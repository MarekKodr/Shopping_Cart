import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';

@Injectable()

export class Service {
    public user: User;
    constructor() {}
}