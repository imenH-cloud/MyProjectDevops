import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-liste',
    standalone: false,

  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent {
 activities: any[] = [];
filteredActivities: any[] = [];
selectedActivities: number[] = [];
searchTerm = '';
gradeFilter = '';
specializationFilter = '';
yearFilter = '';
loading = false;

uniqueGrades: string[] = [];
uniqueSpecializations: string[] = [];
uniqueAcademicYears: string[] = [];

constructor(
  private activityService: ActivityService,
  private router: Router
) {}

ngOnInit(): void {
  this.loadActivities();
}

loadActivities(): void {
  this.loading = true;
  this.activityService.getAll().subscribe({
    next: (activities) => {
      this.activities = activities[0];
      this.filteredActivities = activities[0];
      this.extractUniqueValues();
      this.loading = false;
    },
    error: () => {
      console.error('Error loading activities:');
      this.loading = false;
    }
  });
}

extractUniqueValues(): void {
  this.uniqueGrades = [...new Set(this.activities
      .map(a => a.grade)
      .filter(grade => grade)) as unknown as string[]];

  this.uniqueSpecializations = [...new Set(this.activities
      .map(a => a.specialization)  // lowercase to match camelCase
      .filter(spec => spec)) as unknown as string[]];

  this.uniqueAcademicYears = [...new Set(this.activities
      .map(a => a.academicYear)
      .filter(year => year)) as unknown as string[]];
}

filterActivities(): void {
  this.filteredActivities = this.activities.filter(activity => {
    const matchesSearch = !this.searchTerm || 
      activity.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      activity.grade.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      activity.specialization.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

    const matchesGrade = !this.gradeFilter || activity.grade === this.gradeFilter;
    const matchesSpecialization = !this.specializationFilter || activity.specialization === this.specializationFilter;
    const matchesYear = !this.yearFilter || activity.academicYear === this.yearFilter;

    return matchesSearch && matchesGrade && matchesSpecialization && matchesYear;
  });
}

toggleSelectAll(event: any): void {
  if (event.target.checked) {
    this.selectedActivities = this.filteredActivities.map(activity => activity.id);
  } else {
    this.selectedActivities = [];
  }
}

toggleActivitySelection(activityId: number, event: any): void {
  if (event.target.checked) {
    this.selectedActivities.push(activityId);
  } else {
    this.selectedActivities = this.selectedActivities.filter(id => id !== activityId);
  }
}

navigateToAdd(): void {
  this.router.navigate(['/activity/add']);
}

navigateToEdit(id: number): void {
  this.router.navigate(['/activity/edit', id]);
}

viewActivity(id: number): void {
  this.router.navigate(['/activity/view', id]);
}

deleteActivity(id: number): void {
  if (confirm('Are you sure you want to delete this activity? This action cannot be undone.')) {
    this.activityService.delete(id).subscribe({
      next: () => {
        this.loadActivities();
      },
      error: () => {
        console.error('Error deleting activity:');
        alert('Error deleting activity. Please try again.');
      }
    });
  }
}

deleteSelected(): void {
  // Uncomment and implement when delete multiple activities API available
  // if (confirm(`Are you sure you want to delete ${this.selectedActivities.length} selected activities? This action cannot be undone.`)) {
  //   this.activityService.deleteMultipleActivities(this.selectedActivities).subscribe({
  //     next: () => {
  //       this.selectedActivities = [];
  //       this.loadActivities();
  //     },
  //     error: (error) => {
  //       console.error('Error deleting activities:', error);
  //       alert('Error deleting activities. Please try again.');
  //     }
  //   });
  // }
}

}
