import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { AllInOneTableRoutingModule } from './all-in-one-table-routing.module';
import { AllInOneTableComponent } from './all-in-one-table.component';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { DataTypeFormatPipe } from 'src/@fury/pipes/formatbasedondatatype.pipe';

@NgModule({
  imports: [
    CommonModule,
    AllInOneTableRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    // Core
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule
  ],
  declarations: [AllInOneTableComponent,DataTypeFormatPipe],
  exports: [AllInOneTableComponent],
  providers:[DatePipe,CurrencyPipe]
})
export class AllInOneTableModule {
}
