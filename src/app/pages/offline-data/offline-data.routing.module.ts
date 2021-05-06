import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineDataComponent } from './offline-data.component';

const routes: Routes = [
  {
    path: '',
    component: OfflineDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class offlineDataRoutingModule {
}
