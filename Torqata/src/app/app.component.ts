import { Component, HostBinding } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'Angular Frontend Showcase';
  loading = false;
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig, private router: Router, firestore: AngularFirestore) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Assignment',
        routerLink: 'assignment',
        routerLinkActiveOptions: 'router-link-active'
      },
      {
        label: 'Dashboard',
        routerLink: 'dashboard',
        routerLinkActiveOptions: 'router-link-active'
      },
      {
        label: 'Firestore',
        routerLink: 'firestore',
        routerLinkActiveOptions: 'router-link-active'
      },
    ]

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }

}
