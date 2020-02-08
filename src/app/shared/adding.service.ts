import { Injectable, EventEmitter } from '@angular/core';
import { Mushroom } from '../mushrooms/mushroom.model';

export interface MushroomData {
    amount: number,
    mushroom: Mushroom;
}

@Injectable({providedIn: 'root'})
export class AddingService {
    mushroomChanged = new EventEmitter<MushroomData[]>();
    private addedMushrooms: MushroomData[] = [];
    resultIsReady = false;

    getMushrooms() {
        return this.addedMushrooms.slice();
    }

    addToBasket(newMushroom: Mushroom) {
        if (!this.resultIsReady) {
            let mushroom = this.addedMushrooms.find(
                m => m.mushroom === newMushroom
            );
            if (mushroom === undefined) {
                this.addedMushrooms.push({amount: 1, mushroom: newMushroom});
                this.mushroomChanged.emit(this.addedMushrooms.slice());
            } else {
                mushroom.amount++;
            }
        }
    }

    chechIsAllEdible() {
        this.resultIsReady = true;
        const inedible = this.addedMushrooms.find(o => o.mushroom.classification === 'inedible');
        if (inedible === undefined) {
            return true;
        }
        return false;
    }

    clearBasket() {
        this.addedMushrooms = [];
        this.mushroomChanged.emit(this.addedMushrooms.slice());
        this.resultIsReady = false;
    }
}