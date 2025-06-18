import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';
import { ClassroomService } from '../../classroom/classroom.service';
import { ActivityType } from '../activity';

@Component({
  selector: 'app-add',
    standalone: false,

  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
    activityForm: FormGroup;
  submitted = false;
  classrooms: any[] = [];
  activityTypes = Object.values(ActivityType);

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private classroomService: ClassroomService,
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      type: [ActivityType.OTHER, Validators.required],
      description: ['', Validators.required],
      location: [''],
      date: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      isCompleted: [false],
      classroomId: ['', Validators.required],
      metadata: this.fb.group({
        resources: [''],
        attachments: [''],
        comments: ['']
      })
    });
  }

  ngOnInit(): void {
    this.classroomService.findAll().subscribe({
      next: (res: any) => (this.classrooms = res),
      error: (err) => console.error('Error loading classrooms:', err)
    });
  }

  get f() {
    return this.activityForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.activityForm.invalid) return;

    const formValue = this.activityForm.value;

    const activityPayload = {
      ...formValue,
      metadata: {
        resources: formValue.metadata.resources?.split(',') || [],
        attachments: formValue.metadata.attachments?.split(',') || [],
        comments: formValue.metadata.comments || ''
      },
      classroom: formValue.classroomId
    };

    this.activityService.create(activityPayload).subscribe({
      next: () => this.router.navigate(['/activity']),
      error: (err) => console.error('Error creating activity:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/activity']);
  }

}
