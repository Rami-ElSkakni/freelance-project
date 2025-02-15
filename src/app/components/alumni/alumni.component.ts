import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  providers: [MessageService]
})
export class AlumniComponent implements OnInit {
  alumniData: any[] = []; // To store the alumni data
  loading: boolean = false; // For loading state
  downloadingImage = false;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchAlumniData();
  }

  // Fetch alumni data from the API
  fetchAlumniData() {
    this.loading = true;
    this.http.get(`${BASE_URL}/api/alumni`).subscribe(
      (response: any) => {
        this.alumniData = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Fetching Alumni Data',
          detail: 'There was an issue retrieving alumni data.'
        });
      }
    );
  }

  // Handle image download
  downloadImage(id: string) {
    this.downloadingImage = true;
    // You can add logic here to download the image from the server
    this.http.get(`${BASE_URL}/api/alumni/${id}/image`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        this.downloadingImage = false;
        // Create an anchor tag to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_image.jpg';  // You can customize the filename as needed
        a.click();  // Trigger the download
  
        // Revoke the object URL after the download starts to clean up
        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
          summary: 'Image Downloaded',
          detail: 'Image Downloaded successfully'
        });
      },
      (error) => {
        this.downloadingImage = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Downloading Image',
          detail: 'There was an issue downloading the image.'
        });
      }
    );
  }
}
