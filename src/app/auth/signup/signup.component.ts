import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  isLoading$: Observable<boolean>;
  // loaderSub: Subscription;
  maxDate: any;
  constructor(
    private authSerive: AuthService,
    private uiSerive: UIService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loaderSub = this.uiSerive.isLoaderChanged.subscribe(
    //   res => {
    //     this.isLoading = res;
    //   }
    // );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    this.authSerive.generateUser(f.value);
  }

  // ngOnDestroy() {
  //   if (this.loaderSub) {
  //     this.loaderSub.unsubscribe();
  //   }
  // }
}
