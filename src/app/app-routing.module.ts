import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { LibraryComponent } from './library/library.component';
import { EnginesComponent } from './engines/engines.component';
import { AggregatorsComponent } from './aggregators/aggregators.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { StakeholdersComponent } from './stakeholders/stakeholders.component';

const routes: Routes = [
  { path:'overview', component:OverviewComponent},
  { path:'library', component:LibraryComponent},
  { path:'engines', component:EnginesComponent},
  { path:'aggregators', component:AggregatorsComponent},
  { path:'artifacts', component:ArtifactsComponent},
  { path:'stakeholders', component:StakeholdersComponent},
  { path:'', component:OverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
