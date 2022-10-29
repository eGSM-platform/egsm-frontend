import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  isProgress = false;
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.getLoadningState().subscribe(
      state => {
        console.log("New loading state detected:" + state);
        this.isProgress = state;
      }
    )
  }

}
