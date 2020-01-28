import { Injectable } from '@angular/core';

import { Mushroom } from '../mushrooms/mushroom.model';

export interface MushroomData {
    amount: number,
    mushroom: Mushroom;
}

@Injectable({providedIn: 'root'})
export class AddingService {
    private addedMushrooms: MushroomData[] = [];

    getMushrooms() {
        return this.addedMushrooms;
    }

    addToBasket(newMushroom: Mushroom) {
        let mushroom = this.addedMushrooms.find(
            m => m.mushroom === newMushroom
        );
        if (mushroom === undefined) {
            this.addedMushrooms.push({amount: 1, mushroom: newMushroom});
        } else {
            mushroom.amount++;
        }
    }
}