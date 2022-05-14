import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/shared/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  reset: boolean = false;
  hide: boolean = true;

  username: string = '';
  password: string = '';
  email: string = '';

  errorMessage: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  toogleblock() {
    this.reset = !this.reset;
  }

  forgetPassword() {}
  login(): void {
    this.loading = true;
    this._authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.loading = false;
        localStorage.setItem('user', JSON.stringify(data.data));
        this._snackBar.open('Login Successfull!', '', {
          duration: 3000,
        });
        if (data.data?.type === UserType.ADMIN) {
          this._router.navigate(['/admin-dashboard']);
        }
        if (data.data?.type === UserType.NON_ADMIN) {
          this._router.navigate(['/non-admin-dashboard']);
        }
      },
      error: (error: Error) => {
        this._snackBar.open(JSON.stringify(error), '', {
          duration: 3000,
        });

        this.loading = false;
      },
    });
  }
}
