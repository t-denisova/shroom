import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TriggerService } from '../header/trigger.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  expanded = false;
  private toggleSub: Subscription;

  constructor(private triggerService: TriggerService) { }

  ngOnInit() {
    this.toggleSub = this.triggerService.toggleMenuEmitter.subscribe(didExpand => {
      this.expanded = didExpand;
    });
  }

  ngOnDestroy() {
    this.toggleSub.unsubscribe();
  }
}
