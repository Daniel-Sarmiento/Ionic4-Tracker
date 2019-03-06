import { Component } from '@angular/core';
import { Router } from '@angular/router';
//npm install @ionic-native/background-geolocation@5.0.0-beta.21
//npm uninstall @ionic-native/background-geolocation

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  locations: string[] = [];

  constructor(
    private router: Router
  ) {
  }

  hacerRecorrido(){
      this.router.navigateByUrl("/recorrido-mapa");
  }

  mirarRecorrido(){
    this.router.navigateByUrl("/mirar-recorrido");
  }
}
