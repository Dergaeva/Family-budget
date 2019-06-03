import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';


const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: '', pathMatch: 'full', redirectTo: 'bill'},
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'planning', component: PlanningPageComponent, canActivate: [AuthGuard]},
      {path: 'records', component: RecordsPageComponent},
      {path: 'login', redirectTo: 'bill', pathMatch: 'prefix'},
      {path: 'history/:id', component: HistoryDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {
}
