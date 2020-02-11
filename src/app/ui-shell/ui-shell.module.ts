import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PanelComponent } from './panel/panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SwitcherDirective } from './header/switcher.directive';


@NgModule({
    declarations: [
        HeaderComponent,
        PanelComponent,
        SideNavComponent,
        SwitcherDirective
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        PanelComponent,
        SideNavComponent
    ]
})
export class UIShellModule {}