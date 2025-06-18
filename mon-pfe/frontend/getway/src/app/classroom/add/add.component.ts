import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassroomService } from '../classroom.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrl: './add.component.css',
    standalone: false
})
export class AddComponent {
 classroomForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private classroomService: ClassroomService,
    private router: Router
  ) {
    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      grade: ['', Validators.required],
      academicYear: ['', Validators.required],
      description: [''],
      isActive: [true],
      location: ['', Validators.required],
      Specialization: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.classroomForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    

    console.log('Submitting Classroom:', this.classroomForm.value);

    this.classroomService.create(this.classroomForm.value).subscribe({
      next: (response:any) => {
        console.log('Classroom created:', response);
        this.router.navigate(['/classroom']);
      },
      error: (error:any) => {
        console.error('Error creating classroom:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/classroom']);
  }
}
