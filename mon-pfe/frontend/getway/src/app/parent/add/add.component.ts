import { Component } from '@angular/core';
import { CreateParentDto } from '../parent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from '../parent.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrl: './add.component.css',
    standalone: false
})
export class AddComponent {
  showError: boolean=false;
goBack() {
throw new Error('Method not implemented.');
}
    parentForm: FormGroup;
    submitted = false;
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private parentService: ParentService // Assuming you have a ParentService to handle API calls
    ) {
      this.parentForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        NCIN: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        address: ['', Validators.required],
        typeInsurance: ['', Validators.required],
        Numeroinsurance: ['', Validators.required],
        job: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {}
  
    onSubmit(): void {
      this.submitted = true;
      
        const parentData: CreateParentDto = this.parentForm.value;
        console.log('Parent data:!!!!!', parentData);
        this.router.navigate(['/parent']);
        this.parentService.createParent(parentData).subscribe({
          next: (response) => {
            console.log('Parent created successfully:', response);
            this.router.navigate(['/parent']);
          },
          error: (error) => {
            console.error('Error creating parent:', error);
            this.showError = true;  
          }
        });
    }
      
    
  
      
    
    onCancel(): void {
      this.router.navigate(['/parents']);
    }

}
