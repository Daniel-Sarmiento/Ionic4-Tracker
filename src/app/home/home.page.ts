import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
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
    private backgroundGeolocation: BackgroundGeolocation
  ) {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 6000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
    };

    console.log("start");
    this.backgroundGeolocation.configure(config).then((response) => {
      console.log(response);
    });

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.locations.push(`${location.latitude},${location.longitude}`);
        console.log(location);
      });
    // start recording location
    this.backgroundGeolocation.start();
  }

}
