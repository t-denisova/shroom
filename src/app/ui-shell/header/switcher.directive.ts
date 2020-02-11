import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appSwitcher]'
})
export class SwitcherDirective {
    @HostBinding('class.app--header__action--active') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}