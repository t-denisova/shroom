import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TriggerService {
    toggleEmitter = new Subject<boolean>();
}