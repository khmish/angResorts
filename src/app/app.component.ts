import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angResorts';
  loading: boolean = false;
  constructor(
    private _loading: LoadingService
  ){ }

  ngOnInit() {
    localStorage.setItem('token','hassan ali');
    this.listenToLoading();
  }
  listenToLoading(): void {
    this._loading.loadingSub
      // .pipe() // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        setTimeout(() => {
          this.loading = loading;
        }, 0);
      });
  }
}
