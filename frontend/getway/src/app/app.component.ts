import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'front';
  showMenu: boolean=false;
constructor(private router:Router,
      @Inject(PLATFORM_ID) private platformId: object
)
{}
  ngOnInit() {
    if (typeof window !== 'undefined') {
          initFlowbite();
      }
      if (isPlatformBrowser(this.platformId)) {
        document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        localStorage.removeItem('csrftoken');
      }
      // console.log("tokennnn", tokenGetter(this.platformId));  // Log the token with platformId passed
    //   if (tokenGetter(this.platformId).length == 0) {  // Check the token length using platformId
    //     this.router.navigate(['/auth/login']);
    //   }
      
    // this.router.events.subscribe((event: any) => {
    //   if (event.url) {
    //     if (event.url === '/auth/login')
    // {
    //       this.showMenu = false;
    //     } else {
    //       this.showMenu = true;
    //     }
    //   }
    // });
  }
}
