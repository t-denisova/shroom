import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Mushroom } from './mushroom.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class MushroomsService {
    error = new Subject<string>();

    constructor(private http: HttpClient, private authService: AuthService) {}

    private shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }

    createAndStoreMushroom(mushroomInfo: {classification: string, name: string, imagePath: string}) {
        const mushroomData: Mushroom = mushroomInfo;
        this.http
            .post<{ name: string }>(
                'https://shroom-265311.firebaseio.com/mushrooms.json',
                mushroomData
            ).subscribe(() => error => {
              this.error.next(error.message);
            });
    }

    fetchMushrooms() {
      return this.http
      .get<{ [key: string]: Mushroom }>(
        'https://shroom-265311.firebaseio.com/mushrooms.json'
      ).pipe(
        map(responseData => {
          const mushroomsArray: Mushroom[] = [];
          for (const key in responseData) {           
            if (responseData.hasOwnProperty(key)) {
              mushroomsArray.push({...responseData[key], id: key});
            }
          }
          return this.shuffle(mushroomsArray);
        })
      );
    }
}