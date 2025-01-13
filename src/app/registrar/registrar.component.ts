import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private msalService: MsalService) {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validación personalizada para verificar que las contraseñas coincidan
  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }
    return password !== confirmPassword ? { mismatch: true } : null;
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.valid) {
      const signUpUrl = `https://${environment.tenantName}.b2clogin.com/${environment.tenantName}.onmicrosoft.com/${environment.signInPolicy}`;
      console.log('Redirigiendo al flujo de registro:', signUpUrl);
      window.location.href = signUpUrl;
    } else {
      this.markAllAsTouched();
      console.error('Formulario inválido:', this.registerForm.errors);
      console.log('Errores individuales:', this.getControlErrors());
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markAllAsTouched();
      } else {
        control.markAsTouched();
      }
    });
  }

  private getControlErrors(): any {
    const errors: { [key: string]: any } = {};
    Object.keys(this.registerForm.controls).forEach((key) => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }
}
