import { HttpClient } from '@angular/common/http';
import { Mushroom } from './mushroom.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MushroomsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStoreMushroom(mushroomInfo: {classification: string, name: string, imagePath: string}) {
        const mushroomData: Mushroom = mushroomInfo;
        this.http
            .post<{ name: string }>(
                'https://shroom-265311.firebaseio.com/mushrooms.json',
                mushroomData
            ).subscribe(responseData => {
                console.log(responseData);
            }, error => {
              this.error.next(error.message);
            });
    }

    fetchMushrooms(filter: string) {
       return this.http
        .get<{ [key: string]: Mushroom }>('https://shroom-265311.firebaseio.com/mushrooms.json')
        .pipe(
          map(responseData => {
            const mushroomsArray: Mushroom[] = [];
            for (const key in responseData) {           
              if (responseData.hasOwnProperty(key)) {
                mushroomsArray.push({...responseData[key], id: key});
              }
            }
            return mushroomsArray.filter(m => m.classification === filter);;
          })
        )
    }
}