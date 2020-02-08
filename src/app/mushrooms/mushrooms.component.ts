import { Component, OnInit } from '@angular/core';

import { MushroomsService } from './mushrooms.service';
import { Mushroom } from './mushroom.model';
import { AddingService } from '../shared/adding.service';
 
@Component({
  selector: 'app-mushrooms',
  templateUrl: './mushrooms.component.html',
  styleUrls: ['./mushrooms.component.scss']
})
export class MushroomsComponent implements OnInit {
  classification: string;
  loadedMushrooms: Mushroom[] = [];
  isFetching = false;
  error = null;

  constructor(
    private mushroomsService: MushroomsService,
    private addingSerice: AddingService) { }

  ngOnInit() {
    this.isFetching = true;
    this.mushroomsService.fetchMushrooms().subscribe(mushrooms => {
      this.isFetching = false;
      this.loadedMushrooms = mushrooms;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onAddMushroom(mushroom: Mushroom) {
    this.addingSerice.addToBasket(mushroom);
  }

  onHandleError() {
    this.error = null;
  }
}
