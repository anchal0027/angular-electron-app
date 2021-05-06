import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfflineDataComponent } from './offline-data.component';
import { offlineDataRoutingModule } from './offline-data.routing.module';
import { AllInOneTableModule } from '../tables/all-in-one-table/all-in-one-table.module';
import { DashboardService } from '../dashboard/dashboard.service';



@NgModule({
  declarations: [OfflineDataComponent],
  imports: [
    CommonModule,
    offlineDataRoutingModule,
    AllInOneTableModule
  ],
  providers: [DashboardService],
})
export class OfflineDataModule { }
