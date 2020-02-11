import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: 'login', component: AuthComponent },
            { path: 'signup', component: AuthComponent }
        ])
    ]
})
export class AuthModule {}