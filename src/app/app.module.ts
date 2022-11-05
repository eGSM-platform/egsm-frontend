import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { ServerStatusComponent } from './server-status/server-status.component';
import { OverviewComponent } from './overview/overview.component';
import { LibraryComponent } from './library/library.component';
import { EnginesComponent } from './engines/engines.component';
import { AggregatorsComponent } from './aggregators/aggregators.component';
import { SystemInformationComponent } from './system-information/system-information.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { WorkerDetailsDialogComponent } from './overview/worker-details-dialog/worker-details-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EngineDetailDialogComponent } from './engine-detail-dialog/engine-detail-dialog.component';
import {GojsAngularModule} from 'gojs-angular';
import { EngineListComponent } from './engine-list/engine-list.component';
import { NewProcessInstanceDialogComponent } from './library/new-process-instance-dialog/new-process-instance-dialog.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    ServerStatusComponent,
    OverviewComponent,
    LibraryComponent,
    EnginesComponent,
    AggregatorsComponent,
    SystemInformationComponent,
    LoadingBarComponent,
    WorkerDetailsDialogComponent,
    EngineDetailDialogComponent,
    EngineListComponent,
    NewProcessInstanceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatMenuModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    GojsAngularModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
