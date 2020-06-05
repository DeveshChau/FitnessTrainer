import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { from, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggelSidenav = new EventEmitter<void>();
  private onDestroy$: Subject<boolean> = new Subject<boolean>();
  public isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.pipe(takeUntil(this.onDestroy$))
      .subscribe(authStatus => {
        this.isAuth = authStatus;
      });
  }

  onClick() {
    this.toggelSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.onDestroy$) {
      this.onDestroy$.next(true);
      this.onDestroy$.unsubscribe();
    }
  }

}
