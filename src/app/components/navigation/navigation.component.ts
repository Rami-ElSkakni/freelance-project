import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements AfterViewInit {
  @ViewChild('csNavigation') csNavigation!: ElementRef;
  @ViewChild('csToggle') csToggle!: ElementRef;
  @ViewChild('csExpanded') csExpanded!: ElementRef;

  isLoggedIn = false;
  activeTab = 'home';

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    const CSbody = document.body;
    const CSnavbarMenu = this.csNavigation.nativeElement;
    const CShamburgerMenu = this.csToggle.nativeElement;
    const csUL = this.csExpanded.nativeElement;

    this.isLoggedIn = this.authService.isLoggedIn();

    // Event listener for hamburger menu
    CShamburgerMenu.addEventListener('click', () => {
      CShamburgerMenu.classList.toggle('cs-active');
      CSnavbarMenu.classList.toggle('cs-active');
      CSbody.classList.toggle('cs-open');
      this.ariaExpanded(csUL);
    });

    // Mobile nav toggle
    const dropDowns: NodeListOf<HTMLElement> =
      CSnavbarMenu.querySelectorAll('.cs-dropdown');
    dropDowns.forEach((item) => {
      item.addEventListener('click', () => item.classList.toggle('cs-active'));
    });
  }

  ariaExpanded(csUL: HTMLElement): void {
    const csExpanded = csUL.getAttribute('aria-expanded');
    csUL.setAttribute(
      'aria-expanded',
      csExpanded === 'false' ? 'true' : 'false'
    );
  }

  navigateToContactUs($event: MouseEvent) {
    // contact-569
    this.router.navigate(['/']);
    this.activeTab = 'contact';
    const element = document.getElementById('contact-569') as HTMLElement;
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    $event.preventDefault();
  }
  navigateToTeam($event: MouseEvent) {
    // meet-us-1020
    this.router.navigate(['/']);
    this.activeTab = 'team';
    const element = document.getElementById('meet-us-1020') as HTMLElement;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    $event.preventDefault();
  }
  navigateToAlumni($event: MouseEvent) {
    // meet-us-1020
    this.router.navigate(['/alumni']);
    this.activeTab = 'alumni';
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    $event.preventDefault();
  }

  navigateToLogin($event: MouseEvent) {
    this.router.navigate(['/login']);
    this.activeTab = 'login';
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    $event.preventDefault();
  }
  navigateToRequirements($event: MouseEvent) {
    // content-1637
    this.router.navigate(['/']);
    this.activeTab = 'requirements';
    const element = document.getElementById('content-1637') as HTMLElement;
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    $event.preventDefault();
  }
  navigateToAbout($event: MouseEvent) {
    // content-1450
    this.router.navigate(['/']);
    this.activeTab = 'about';
    const element = document.getElementById('content-1450') as HTMLElement;
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    $event.preventDefault();
  }
  navigateToHome($event: MouseEvent) {
    this.activeTab = 'home';
    this.router.navigate(['/']);
    this.csToggle.nativeElement.classList.toggle('cs-active');
    this.csNavigation.nativeElement.classList.toggle('cs-active');
    document.body.classList.toggle('cs-open');
    this.ariaExpanded(this.csExpanded.nativeElement);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $event.preventDefault();
  }
}
