import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from '../../components/dashboard/preloader.component';
import { SidebarComponent } from '../../components/dashboard/sidebar.component';
import { OverlayComponent } from '../../components/dashboard/overlay.component';
import { HeaderComponent } from '../../components/dashboard/header.component';
import { MetricGroupOneComponent } from '../../components/dashboard/metric-group-one.component';
import { ChartOneComponent } from '../../components/dashboard/chart-one.component';
import { ChartTwoComponent } from '../../components/dashboard/chart-two.component';
import { ChartThreeComponent } from '../../components/dashboard/chart-three.component';
import { MapOneComponent } from '../../components/dashboard/map-one.component';
import { TableOneComponent } from '../../components/dashboard/table-one.component';

@Component({
  standalone: true,
  selector: 'storefront-dashboard',
  imports: [
    CommonModule,
    PreloaderComponent,
    SidebarComponent,
    OverlayComponent,
    HeaderComponent,
    MetricGroupOneComponent,
    ChartOneComponent,
    ChartTwoComponent,
    ChartThreeComponent,
    MapOneComponent,
    TableOneComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
