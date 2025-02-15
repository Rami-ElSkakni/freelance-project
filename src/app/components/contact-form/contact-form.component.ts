import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  formGroup!: FormGroup;
  loading = false

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log("Hello")
    if (this.formGroup.valid) {
      console.log('Form Submitted:', this.formGroup.value);
    } else {
      console.log('Form is invalid!');
    }
  }

  buttonSubmitHandler() {
    console.log("Here");
    if (this.formGroup.valid) {
      this.loading = true;
      console.log('Form Submitted:', this.formGroup.value);
      this.http.post(`${BASE_URL}/api/contact`, this.formGroup.value).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Form submitted successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Request Submitted',
            detail: 'Request Submitted successfully'
          });
          this.formGroup.reset(); // Reset form after submission
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          alert('An error occurred while sending the message.');
        }
      });
    } else {
      console.log('Form is invalid!');
    }
  }
}
