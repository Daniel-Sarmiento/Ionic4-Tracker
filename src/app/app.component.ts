import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  config = {
    apiKey: "AIzaSyCvHFm8K8paDtNU7V7sU9K4S7FLNc5TegI",
    authDomain: "gps-maps-79e8b.firebaseapp.com",
    databaseURL: "https://gps-maps-79e8b.firebaseio.com",
    projectId: "gps-maps-79e8b",
    storageBucket: "gps-maps-79e8b.appspot.com",
    messagingSenderId: "439529501313"
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(this.config);
  }
}
