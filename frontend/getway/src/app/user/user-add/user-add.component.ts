import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrl: './user-add.component.css',
    standalone: false
})
export class UserADDComponent implements OnInit {
onImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  currentStep: number = 1;
  maxSteps: number = 3;
  isFinalStep: boolean = false;

  userForm: FormGroup;
  msg: string=""
  show: boolean=false;
  showError: boolean=false;

  constructor(private fb: FormBuilder,private userService:UserService , private router:Router) {
    this.userForm = this.fb.group({
       firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      zipCode: [''],
      picture: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      active: [true]
   
    });
    
    
  }
 

  ngOnInit(): void {
    // Initialization logic if necessary
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToNextStep(): void {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
    }
  }
  Onsubmit() {
    let user :any
console.log('hello',this.userForm.value)
    
        const formValues = this.userForm.value;
    
       
console.log("user",user)
    
    this.userService.createUser(this.userForm.value).subscribe(data=>{
      console.log("data",data)
      this.show=true
      this.msg="Utilisateur ajouté avec succès !"
      this.router.navigate(["/user/list-user"])
     
  
      
    },error=>{
      this.showError=true
      this.msg="Veuillez remplir tous les champs correctement"

    }
  )
  
}
back(){
  this.router.navigate(["/user"])
}

  finishStepper(): void {
    this.isFinalStep = true;
  }

  isStepSuccess(step: number): boolean {
    // Add your logic to determine if a step is successful
    return false;
  }

  isStepCompleted(step: number): boolean {
    // Add your logic to determine if a step is completed
    return false;
  }





}