import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { LibraryComponent } from './library/library.component';
import { EnginesComponent } from './engines/engines.component';
import { AggregatorsComponent } from './aggregators/aggregators.component';

const routes: Routes = [
  { path:'', component:OverviewComponent},
  { path:'library', component:LibraryComponent},
  { path:'engines', component:EnginesComponent},
  { path:'aggregators', component:AggregatorsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
