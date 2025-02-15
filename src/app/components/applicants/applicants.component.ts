import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css'],
  providers: [MessageService],
})
export class ApplicantsComponent implements OnInit {
  applicantForm: FormGroup;
  loading = false;
  selectedFiles: { [key: string]: File } = {};


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.applicantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cityOfBirth: ['', Validators.required],
      countryOfBirth: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      whatsAppNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      germanKnowledge: ['', Validators.required],
      domain: ['', Validators.required],
      degreeType: ['', Validators.required],
      university: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      knowsPreviousAttendee: [false],
      passportScan: [null],
      cv: [null],
    });
  }

  ngOnInit() {
    
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log
      // Store the file separately (not directly in the form control)
      this.applicantForm.get('passportScan')?.patchValue(file); // Store file name or any metadata in form control
      //this.selectedFiles[controlName] = file; // Store the actual file in a separate object
    }
  }

  onFileChangeCv(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log
      // Store the file separately (not directly in the form control)
      this.applicantForm.get('cv')?.patchValue(file); // Store file name or any metadata in form control
      //this.selectedFiles[controlName] = file; // Store the actual file in a separate object
    }
  }

  submitForm() {
    console.log(this.applicantForm.value)
    if (this.applicantForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Error',
        detail: 'Please fill in all required fields.',
      });
      return;
    }

    this.loading = true;

    const formData = new FormData();

    // // Append all form fields to FormData
    Object.keys(this.applicantForm.value).forEach((key) => {
      const value = this.applicantForm.value[key];
      console.log(value)
      // Check if the value is a File (for file uploads)
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } 
      // Check if the value is a Date and format it correctly
      else if (key === 'dateOfBirth' && value instanceof Date) {
        // Convert the Date to the format 'YYYY-MM-DD'
        const formattedDate = value.toISOString().split('T')[0];  // Example: '2025-02-11'
        formData.append(key, formattedDate);
      } 
      // Otherwise, just append the value
      else {
        formData.append(key, value);
      }
    });

    // Object.keys(this.applicantForm.value).forEach((key) => {
    //   const value = this.applicantForm.value[key];
  
    //   // Check if there is a file associated with this field
    //   if (this.selectedFiles[key]) {
    //     formData.append(key, this.selectedFiles[key], this.selectedFiles[key].name);
    //   }
    //   else if (key === 'dateOfBirth' && value instanceof Date) {
    //     // Convert the Date to the format 'YYYY-MM-DD'
    //     const formattedDate = value.toISOString().split('T')[0];  // Example: '2025-02-11'
    //     formData.append(key, formattedDate);
    //   }  
    //   else {
    //     formData.append(key, value);
    //   }
    // });
    

    // Send form data via POST
    this.http.post(`${BASE_URL}/api/applicants`, formData).subscribe(
      (response) => {
        this.loading = false;
        this.applicantForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Submission Successful',
          detail: 'Your application has been submitted.',
        });
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Failed',
          detail: 'There was an error submitting your application. Please try again.',
        });
      }
    );
  }
}
function requiredFileType(arg0: string): any {
  throw new Error('Function not implemented.');
}

