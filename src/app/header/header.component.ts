import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { TriggerService } from './trigger.service';
import { AddingService, MushroomData } from '../shared/adding.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpenPanel = false;
  isOpenMenu = false;
  private userSub: Subscription;
  addedMushrooms: MushroomData[] = [];

  constructor(
    private authService: AuthService,
    private triggerService: TriggerService,
    private addingService: AddingService) { }

  onLogout() {
    this.authService.logout();
    this.addingService.clearBasket();
  }

  onTogglePanel() {
    this.isOpenPanel = !this.isOpenPanel;
    this.triggerService.togglePanelEmitter.next(this.isOpenPanel);
  }

  onToggleMenu() {
    this.isOpenMenu = !this.isOpenMenu;
    this.triggerService.toggleMenuEmitter.next(this.isOpenMenu);
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    this.addedMushrooms = this.addingService.getMushrooms();
    this.addingService.mushroomChanged
      .subscribe(
        (mushroom: MushroomData[]) => {
          this.addedMushrooms = mushroom;
        }
      );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
