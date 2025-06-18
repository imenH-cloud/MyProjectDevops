import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../auth.service';
import { Login } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
   loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  error = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    // if (this.loginForm.invalid) {
    //   this.markFormGroupTouched();
    //   return;
    // }
    console.log("user",this.loginForm.value)

    this.error = '';
    this.isLoading = true;

    try {
      const credentials: any = this.loginForm.value;
      console.log("credentials",credentials)
      
      // await this.simulateAuthentication(credentials);
      this.AuthService.loginUser(credentials as Login).subscribe({
        next: (response) => { 
          console.log('Connexion réussie', response);
          document.cookie = `token=${response.access_token}; path=/; max-age=3600`; 
          
           document.cookie = `id=${response.idUser}; path=/; max-age=3600`; 
          // Stockage du token dans un cookie
          // Vous pouvez stocker le token ou les informations de l'utilisateur ici
        }
      });
      
      window.location.href='http://localhost:57813/user'
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Erreur de connexion';
    } finally {
      this.isLoading = false;
    }
  }

  private async simulateAuthentication(credentials: any): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'admin@school.edu' && credentials.password === 'password123') {
          resolve();
        } else {
          reject(new Error('Identifiants incorrects'));
        }
      }, 1500);
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters pour faciliter l'accès aux contrôles du formulaire
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  get rememberMe() { return this.loginForm.get('rememberMe'); }

  // Méthodes utilitaires pour la validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['email']) return 'Format email invalide';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}