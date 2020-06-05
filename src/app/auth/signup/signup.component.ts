import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  loaderSub: Subscription;
  maxDate: any;
  constructor(private authSerive: AuthService, private uiSerive: UIService) { }

  ngOnInit(): void {
    this.loaderSub = this.uiSerive.isLoaderChanged.subscribe(
      res => {
        this.isLoading = res;
      }
    );
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    this.authSerive.generateUser(f.value);
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }
}
