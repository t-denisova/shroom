import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TriggerService {
    togglePanelEmitter = new Subject<boolean>();
    toggleMenuEmitter = new Subject<boolean>();
}