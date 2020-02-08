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
  gameText = 'Я думаю, что собрал правильные грибы';
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

  onCheck() {
    const result = this.addingService.chechIsAllEdible();
    console.log(result);
    if (!result) {
      this.gameText = 'О нет! Вы отравились'
    } else {
      this.gameText = 'Ура! Все грибы съедобные'
    }
  }

  onRestart() {
    this.addingService.clearBasket();
    this.gameText = 'Я думаю, что собрал правильные грибы';
  }

  ngOnDestroy(): void {
    this.toggleSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
