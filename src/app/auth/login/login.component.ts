import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  loaderSub: Subscription;
  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
  });
  constructor(private authService: AuthService, private uiSerive: UIService) { }

  ngOnInit(): void {
    this.loaderSub = this.uiSerive.isLoaderChanged.subscribe(
      res => {
        this.isLoading = res;
      }
    );
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }

  ngOnDestroy() {
    this.loaderSub.unsubscribe();
  }
}
