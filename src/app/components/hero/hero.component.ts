import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  constructor(private router: Router){}

applyNowHandler($event: any) {
  $event.preventDefault();
  this.router.navigate(['/applicant'])

}

}
