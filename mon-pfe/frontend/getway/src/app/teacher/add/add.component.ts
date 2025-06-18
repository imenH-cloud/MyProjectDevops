import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
 teacherForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      indexNumber: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}\d{4}$/)
      ]],
      cin: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
      ]],
      surname: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
      ]],
      gender: ['', Validators.required],
      address: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
      telephone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[0-9\s\-()]{8,15}$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      facebook: [''],
      instagram: [''],
      linkedin: [''],
      specialization: ['', Validators.required],
      profileImage: [''],
      dateOfMandate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.teacherForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.teacherForm.invalid) {
      return;
    }

    const teacherData = this.teacherForm.value;

    this.teacherService.create(teacherData).subscribe({
      next: (res:any) => {
        console.log('Teacher created:', res);
        this.router.navigate(['/teacher']);
      },
      error: (err:any) => {
        console.error('Error creating teacher:', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/teacher']);
  }
}
