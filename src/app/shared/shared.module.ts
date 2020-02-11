import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationComponent } from './notification/notification.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
    declarations: [
        NotificationComponent,
        LoadingComponent,
        ModalComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NotificationComponent,
        LoadingComponent,
        ModalComponent
    ],
    entryComponents: [
        ModalComponent
    ]
})
export class SharedModule {}