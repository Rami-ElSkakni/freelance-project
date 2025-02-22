import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService],
})
export class AdminComponent implements OnInit {
  products: any[] = [];  // This will hold the data to be displayed in the table
  applicantsData: any[] = [];
  loading = true;
  alumniLoading = false;
  alumniForm: FormGroup;
  imageFile: File | null = null;

  constructor(private http: HttpClient, private messageService: MessageService, private fb: FormBuilder) {
    this.alumniForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      image: [null, Validators.required],
      isEventPost: [false]
    });
  }

  ngOnInit() {
    this.getContactData();
    this.fetchApplicantsData();
  }

  getContactData() {
    this.http.get(`${BASE_URL}/api/contact`, { headers: { accept: 'text/plain' } }).subscribe(
      (response: any) => {
        this.products = response;  // Store the API response in the products array
        this.loading = false;  // Stop loading when data is fetched
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'API Error',
          detail: 'There was an issue fetching contact data.',
        });
      }
    );
  }

  fetchApplicantsData() {
    this.loading = true;
    this.http.get(`${BASE_URL}/api/applicants`).subscribe(
      (response: any) => {
        this.applicantsData = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Fetching Applicants Data',
          detail: 'There was an issue retrieving applicants data.'
        });
      }
    );
  }

  downloadFile(fileType: string, id: string) {
    // Construct the API URL to get the respective file
    const fileUrl = `${BASE_URL}/api/applicants/${id}/${fileType}`;

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a Blob URL and simulate a click to download the file
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileType}_${id}.pdf`; // Assuming both passportScan and cv are PDF files
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: `Error Downloading ${fileType}`,
          detail: 'There was an issue downloading the file.'
        });
      }
    );
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      this.alumniForm.get('image')?.setValue(this.imageFile);
    }
  }

  onSubmit() {
    if (this.alumniForm.invalid) {
      return;
    }

    const formData = new FormData();

    // Append the form values to FormData
    Object.keys(this.alumniForm.value).forEach((key) => {
      const value = this.alumniForm.value[key];
      if (value instanceof File) {
        formData.append(key, value, value.name); // Append the file
      }else if (key === 'date' && value instanceof Date) {
        // Convert the Date to the format 'YYYY-MM-DD'
        const formattedDate = value.toISOString().split('T')[0];  // Example: '2025-02-11'
        formData.append(key, formattedDate);
      } 
      
      else {
        formData.append(key, value);
      }
    });

    // Make the API POST request with FormData
    this.alumniLoading = true;
    this.http.post(`${BASE_URL}/api/alumni`, formData).subscribe(
      (response) => {
        this.alumniLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Alumni data submitted successfully!'
        });
        this.alumniForm.reset();
      },
      (error) => {
        this.alumniLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an issue submitting the alumni data.'
        });
      }
    );
  }
}
