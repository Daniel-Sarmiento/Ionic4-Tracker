import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Marker,Environment} from '@ionic-native/google-maps';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-recorrido-mapa',
  templateUrl: './recorrido-mapa.page.html',
  styleUrls: ['./recorrido-mapa.page.scss'],
})
export class RecorridoMapaPage implements OnInit {
  map: GoogleMap;

  latitud:number = 16.6147523;
  longitud:number = -93.0888514;

 //Base de datos
  ref = firebase.database().ref()

  locations: string[] = [];
  constructor(
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation
  ) {
  }

  ngOnInit(){
    this.loadMap();

  }

  iniciarBackGround(){
    this.backgroundGeolocation.isLocationEnabled()
    .then((rta) =>{
      if(rta){
        this.iniciar();
      }else {
        this.backgroundGeolocation.showLocationSettings();
      }
    })
  }

  iniciar(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      let insert = this.ref.push();
      insert.set({
        latitude: this.latitud,
        longitude: this.longitud
      })
     }).catch((error) => {
       console.log('Error getting location', error);
     });

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

    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
        this.locations.push(`${location.latitude},${location.longitude}`);
        console.log(location);
        let insert = this.ref.push();
        insert.set(location)

        this.map.addMarker({
          title: 'Mi posición',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: location.latitude,
            lng: location.longitude
          }});
        
      });

    this.backgroundGeolocation.start();
  }

  stopBackgroundGeolocation(){
    this.backgroundGeolocation.stop();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
    // This code is necessary for browser
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'https//www.google.com/maps/embeb/v1/MODE?key=AIzaSyDvnrn4179xHiXqCU_8c_ot4VeIJEcrNJ8&parameters',
        'API_KEY_FOR_BROWSER_DEBUG': 'https//www.google.com/maps/embeb/v1/MODE?key=AIzaSyDvnrn4179xHiXqCU_8c_ot4VeIJEcrNJ8&parameters'
      });

      let mapOptions: GoogleMapOptions = {
        camera: {
            target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 15,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: 'Mi posición',
        icon: 'green',
        animation: 'DROP',
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      });

/*    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });*/
  }, error =>{
    console.log("Hay un error: " + error);
  });
}

}
