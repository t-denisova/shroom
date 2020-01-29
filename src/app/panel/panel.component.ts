import { Component, OnInit, OnDestroy } from '@angular/core';

import { AddingService, MushroomData } from '../shared/adding.service';
import { TriggerService } from '../header/trigger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  addedMushrooms: MushroomData[] = [];
  expaneded = false;
  private toggleSub: Subscription;

  constructor(private addingService: AddingService, private triggerService: TriggerService) { }

  ngOnInit() {
    this.addedMushrooms = this.addingService.getMushrooms();
    this.toggleSub = this.triggerService.toggleEmitter.subscribe(didExpand => {
      this.expaneded = didExpand;
      console.log(this.expaneded);
    });
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
  }
}
