import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { MushroomsService } from '../mushrooms/mushrooms.service';
import { NgForm } from '@angular/forms';
import { Mushroom } from '../mushrooms/mushroom.model';

@Component({
  selector: 'app-create-mushroom',
  templateUrl: './create-mushroom.component.html',
  styleUrls: ['./create-mushroom.component.scss']
})
export class CreateMushroomComponent implements OnInit, CanDeactivateGuard, OnDestroy {
  @ViewChild('f', {static: false}) createMushroomForm: NgForm;
  mushroom: Mushroom = {
    classification: '',
    name: '',
    imagePath: ''
  }
  changesSaved = false;
  error = null;
  private errorSub: Subscription;

  constructor(private mushroomsService: MushroomsService) { }

  ngOnInit() {
    this.errorSub = this.mushroomsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  onSaveMushroom(form: NgForm) {
    this.changesSaved = true;
    this.mushroom.name = this.createMushroomForm.form.value.name;
    this.mushroom.imagePath = this.createMushroomForm.form.value.imagePath;
    this.mushroom.classification = this.createMushroomForm.form.value.classification;
    this.mushroomsService.createAndStoreMushroom(this.mushroom);
    this.createMushroomForm.reset();
  }

  onMakeMushroom() {
    this.changesSaved = false;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) {
      return confirm('Вы хотите уйти без сохранения гриба?');
    } else {
      return true;
    }
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}