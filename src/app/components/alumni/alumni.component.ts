import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BASE_URL } from 'src/app/Constants/BaseUrl';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css'],
  providers: [MessageService],
})
export class AlumniComponent implements OnInit {
  alumniData: any[] = []; // To store the alumni data
  eventsData: any[] = []; // To store the events data
  loading: boolean = false; // For loading state
  downloadingImage = false;
  loadingEvents: boolean = false; // For loading events specifically

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchAlumniData();
    this.fetchEventsData();
  }

  // Fetch alumni data
  fetchAlumniData() {
    this.loading = true;
    this.http.get(`${BASE_URL}/api/alumni/posts`).subscribe(
      (response: any) => {
        this.alumniData = response;
        this.loading = false;

        // After fetching alumni data, fetch images for each alumnus
        this.alumniData.forEach((alumnus) => {
          this.fetchAlumniImage(alumnus);
        });
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Fetching Alumni Data',
          detail: 'There was an issue retrieving alumni data.',
        });
      }
    );
  }

  // Fetch event data
  fetchEventsData() {

    this.loadingEvents = true;
    this.http.get(`${BASE_URL}/api/alumni/events`).subscribe(
      (response: any) => {
        this.eventsData = response;
        this.loadingEvents = false;

        // After fetching event data, trigger image fetch for each event
        this.eventsData.forEach((event) => {
          this.fetchEventImage(event);
        });
      },
      (error) => {
        this.loadingEvents = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Fetching Event Data',
          detail: 'There was an issue retrieving event data.',
        });
      }
    );
  }

  // Fetch image for the alumnus and assign it
  fetchAlumniImage(alumnus: any) {
    this.http
      .get(`${BASE_URL}/api/alumni/${alumnus.id}/image`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          alumnus.imageUrl = url; // Assign the image URL to the alumnus object
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Fetching Alumni Image',
            detail: 'There was an issue retrieving the alumni image.',
          });
        }
      );
  }

  // Fetch image for the event and assign it
  fetchEventImage(event: any) {
    this.http
      .get(`${BASE_URL}/api/alumni/${event.id}/image`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          event.imageUrl = url; // Assign the image URL to the event object
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Fetching Event Image',
            detail: 'There was an issue retrieving the event image.',
          });
        }
      );
  }

  // Handle image download for alumni
  downloadImage(id: string) {
    this.downloadingImage = true;
    this.http
      .get(`${BASE_URL}/api/alumni/${id}/image`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          this.downloadingImage = false;
          const a = document.createElement('a');
          a.href = url;
          a.download = 'downloaded_image.jpg';
          a.click();
          window.URL.revokeObjectURL(url);
          this.messageService.add({
            severity: 'success',
            summary: 'Image Downloaded',
            detail: 'Image downloaded successfully',
          });
        },
        (error) => {
          this.downloadingImage = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error Downloading Image',
            detail: 'There was an issue downloading the image.',
          });
        }
      );
  }

  // Handle image download for events
  downloadEventImage(id: string) {
    this.downloadingImage = true;
    this.http
      .get(`${BASE_URL}/api/alumni/${id}/image`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          this.downloadingImage = false;
          const a = document.createElement('a');
          a.href = url;
          a.download = 'event_image.jpg';
          a.click();
          window.URL.revokeObjectURL(url);
          this.messageService.add({
            severity: 'success',
            summary: 'Image Downloaded',
            detail: 'Event image downloaded successfully',
          });
        },
        (error) => {
          this.downloadingImage = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error Downloading Event Image',
            detail: 'There was an issue downloading the event image.',
          });
        }
      );
  }
}
