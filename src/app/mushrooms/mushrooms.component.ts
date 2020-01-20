import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MushroomsService } from './mushrooms.service';
import { Mushroom } from './mushroom.model';
 
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

  constructor(private route: ActivatedRoute, private mushroomsService: MushroomsService, private http: HttpClient) { }

  ngOnInit() {
    this.isFetching = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.classification = params['classification'];
        this.mushroomsService.fetchMushrooms(this.classification).subscribe(mushrooms => {
          this.isFetching = false;
          this.loadedMushrooms = mushrooms;
        }, error => {
          this.error = error.message;
        });
      }
    );
  }
}
