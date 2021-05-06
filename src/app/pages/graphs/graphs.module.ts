import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AudienceOverviewWidgetModule } from './widgets/audience-overview-widget/audience-overview-widget.module';
import { GraphsRoutingModule } from './graphs-routing.module';
import { GraphsComponent } from './graphs.component';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { DashboardService } from '../dashboard/dashboard.service';
import { QuickInfoWidgetModule } from '../dashboard/widgets/quick-info-widget/quick-info-widget.module';
import { AllInOneTableModule } from '../tables/all-in-one-table/all-in-one-table.module';
import { LineChartWidgetModule } from '../dashboard/widgets/line-chart-widget/line-chart-widget.module';
// import { BlankModule } from '../blank/blank.module';
// import { BlankComponent } from '../blank/blank.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
// import { ColorPickerModule } from 'ngx-color-picker';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudienceOverviewWidgetModule } from '../dashboard/widgets/audience-overview-widget/audience-overview-widget.module';

@NgModule({
  declarations: [GraphsComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule,
    FurySharedModule,
    CommonModule,
    MaterialModule,
    FurySharedModule,
    QuickInfoWidgetModule,
    AllInOneTableModule,
    LineChartWidgetModule,
    AudienceOverviewWidgetModule,
    NgxMatColorPickerModule,
    FormsModule,
    ReactiveFormsModule,


    // ColorPickerModule,
    // BlankModule,
    // BlankComponent,
    // ,
    MatExpansionModule,
    MatTabsModule
  ],
  providers:[DashboardService,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class GraphsModule { }
