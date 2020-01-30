import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { TriggerService } from './trigger.service';
import { AddingService } from '../shared/adding.service';

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

  constructor(
    private authService: AuthService,
    private triggerService: TriggerService,
    private addingServise: AddingService) { }

  onLogout() {
    this.authService.logout();
    this.onTogglePanel();
    this.addingServise.clearBasket();
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
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
