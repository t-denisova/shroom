import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddingService, MushroomData } from '../shared/adding.service';
import { TriggerService } from '../header/trigger.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  addedMushrooms: MushroomData[] = [];
  expanded = false;
  isAuthenticated = false;
  private toggleSub: Subscription;
  private userSub: Subscription;

  constructor(
    private addingService: AddingService,
    private triggerService: TriggerService,
    private authService: AuthService) { }

  ngOnInit() {
    this.addedMushrooms = this.addingService.getMushrooms();
    this.addingService.mushroomChanged
      .subscribe(
        (mushroom: MushroomData[]) => {
          this.addedMushrooms = mushroom;
        }
      );
    this.toggleSub = this.triggerService.togglePanelEmitter.subscribe(didExpand => {
      this.expanded = didExpand;
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onClear() {
    this.addingService.clearBasket();
    this.addedMushrooms = this.addingService.getMushrooms();
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
