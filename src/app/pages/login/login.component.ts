import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Redirect already authenticated users
    if (this.authService.isLoggedIn) {
      this.redirectBasedOnRole();
    }
  }

  private validateLoginForm(): string | null {
    const email = this.email.trim();
    const password = this.password;

    if (!email && !password) {
      return 'Enter your email address and password to continue.';
    }

    if (!email) {
      return 'Enter your email address to continue.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Enter a valid email address, for example name@company.com.';
    }

    if (!password) {
      return 'Enter your password to continue.';
    }

    return null;
  }

  async onLogin() {
    const validationMessage = this.validateLoginForm();

    if (validationMessage) {
      this.errorMessage = validationMessage;
      this.cdr.detectChanges();
      return;
    }

    this.email = this.email.trim().toLowerCase();

    this.loading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      const result = await this.authService.login(
        this.email,
        this.password
      );

      if (result.success) {
        this.redirectBasedOnRole();
      } else {
        this.errorMessage =
          result.error ||
          'Login failed. Please check your credentials.';

        this.cdr.detectChanges();
      }
    } catch (error: any) {
      this.errorMessage =
        error.message ||
        'An unexpected error occurred. Please try again.';

      this.cdr.detectChanges();
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  private redirectBasedOnRole(): void {
    this.router.navigate(['/library-grid']);
  }
}