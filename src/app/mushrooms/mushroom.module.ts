import { NgModule } from '@angular/core';
import { MushroomsComponent } from './mushrooms.component';
import { AddMushroomComponent } from './add-mushroom/add-mushroom.component';
import { PlaceholderDirective } from './add-mushroom/placeholder.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './add-mushroom/can-deactivate-guard.service';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: 'mushrooms',
        component: MushroomsComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'add-mushroom',
        component: AddMushroomComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [AuthGuard]
      },
]

@NgModule({
    declarations: [
        MushroomsComponent,
        AddMushroomComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
})
export class MushroomsModule {}