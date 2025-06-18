import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrl: './user-update.component.css',
    standalone: false
})
export class UserUpdateComponent implements OnInit {
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
  id!: number;

  constructor(private fb: FormBuilder,private userService:UserService , private router:Router, private activeRouter:ActivatedRoute) {
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
    this.activeRouter.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
       await this.getUserById(this.id)

    });
  }
 getUserById(id:number){
  this.userService.getUserById(id).subscribe(user=>{
    console.log("user",user)

   this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            zipCode: user.zipCode,
            picture: user.picture,
            active: user.active
          });
  })
 
  
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
    let user:any
console.log('hello',this.userForm.value)
    
        const formValues = this.userForm.value;
    
        const personalInfo = formValues.personalInfo;
        const emailcontact = formValues.emailcontact;
        const address = formValues.address;
    
        console.log("Personal Info:", personalInfo);
        console.log("Email Contact:", emailcontact);
        console.log("Address Info:", address);
    
       
    
console.log("user",user)
    
    this.userService.updateUser(this.id,this.userForm.value).subscribe(data=>{
      console.log("data",data)
      this.router.navigate(["/user/list-user"])
      this.show=true
      this.msg="Utilisateur modifiée avec succès !"
     
  
      
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
  