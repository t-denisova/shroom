import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { TriggerService } from './trigger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpen = false
  private userSub: Subscription;

  constructor(private authService: AuthService, private triggerService: TriggerService) { }

  onLogout() {
    this.authService.logout();
  }

  onToggle() {
    this.isOpen = !this.isOpen;
    this.triggerService.toggleEmitter.next(this.isOpen);
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
