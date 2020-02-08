import { Component, OnInit, ViewChild, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { MushroomsService } from '../mushrooms/mushrooms.service';
import { NgForm } from '@angular/forms';
import { Mushroom } from '../mushrooms/mushroom.model';
import { ModalComponent } from '../modal/modal.component';
import { PlaceholderDirective } from './placeholder.directive';

@Component({
  selector: 'app-create-mushroom',
  templateUrl: './create-mushroom.component.html',
  styleUrls: ['./create-mushroom.component.scss']
})
export class CreateMushroomComponent implements OnInit, CanDeactivateGuard, OnDestroy {
  @ViewChild('f', {static: false}) createMushroomForm: NgForm;
  @ViewChild(PlaceholderDirective, {static:false}) modalHost: PlaceholderDirective;

  private closeSub: Subscription;

  mushroom: Mushroom = {
    classification: '',
    name: '',
    imagePath: ''
  }
  changesSaved = false;
  error = null;
  private errorSub: Subscription;

  constructor(
    private mushroomsService: MushroomsService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

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

  private showModal() {
    const modalCompFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.modalHost.viewContainerRef;
    hostViewContainerRef.clear();
    const modalRef = hostViewContainerRef.createComponent(modalCompFactory);
    return new Promise(resolve => {
      this.closeSub = modalRef.instance.close.subscribe(data => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
        resolve(data);
      });
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) { 
      return this.showModal().then((data: boolean) => {
        return data ? true : false; 
      });
    } else {
      return true;
    }
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}