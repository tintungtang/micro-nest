import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'storefront-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  openDropDown1 = false;
  openDropDown2 = false;
  openDropDown3 = false;
  selected = 'overview';

  toggleDropDown(index: number, event: Event): void {
    event.stopPropagation();
    if (index === 1) {
      this.openDropDown1 = !this.openDropDown1;
    } else if (index === 2) {
      this.openDropDown2 = !this.openDropDown2;
    } else if (index === 3) {
      this.openDropDown3 = !this.openDropDown3;
    }
  }

  select(tab: string): void {
    this.selected = tab;
  }

  @HostListener('document:click')
  closeAll(): void {
    this.openDropDown1 = false;
    this.openDropDown2 = false;
    this.openDropDown3 = false;
  }
}
