import { Component, OnInit } from '@angular/core';

import { AddingService, MushroomData } from '../shared/adding.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  addedMushrooms: MushroomData[] = [];
  expaneded = false;

  constructor(private addingService: AddingService) { }

  ngOnInit() {
    this.addedMushrooms = this.addingService.getMushrooms();
  }
}
