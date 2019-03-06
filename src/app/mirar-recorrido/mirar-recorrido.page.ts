import { Component, OnInit } from '@angular/core';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Marker,Environment} from '@ionic-native/google-maps';

@Component({
  selector: 'app-mirar-recorrido',
  templateUrl: './mirar-recorrido.page.html',
  styleUrls: ['./mirar-recorrido.page.scss'],
})
export class MirarRecorridoPage implements OnInit {
  map: GoogleMap;

  latitud:number = 16.6147523;
  longitud:number = -93.0888514;
  constructor(){
  }

  ngOnInit(){
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'https//www.google.com/maps/embeb/v1/MODE?key=AIzaSyDvnrn4179xHiXqCU_8c_ot4VeIJEcrNJ8&parameters',
      'API_KEY_FOR_BROWSER_DEBUG': 'https//www.google.com/maps/embeb/v1/MODE?key=AIzaSyDvnrn4179xHiXqCU_8c_ot4VeIJEcrNJ8&parameters'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.latitud,
           lng: this.longitud
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Mi posición',
      icon: 'green',
      animation: 'DROP',
      position: {
        lat: this.latitud,
        lng: this.longitud
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }


}
