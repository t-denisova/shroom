import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationComponent } from './notification/notification.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    declarations: [
        NotificationComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NotificationComponent,
        LoadingComponent
   ]
})
export class SharedModule {}