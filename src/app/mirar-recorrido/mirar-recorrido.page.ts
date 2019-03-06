import { Component, OnInit } from '@angular/core';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Marker,Environment, MarkerCluster} from '@ionic-native/google-maps';
import * as firebase from 'firebase';

@Component({
  selector: 'app-mirar-recorrido',
  templateUrl: './mirar-recorrido.page.html',
  styleUrls: ['./mirar-recorrido.page.scss'],
})
export class MirarRecorridoPage implements OnInit {
  map: GoogleMap;
  ref = firebase.database().ref()
  markers:any[]
  latitud:number = 16.6147523;
  longitud:number = -93.0888514;
  constructor(){
    //listar datos
    this.ref.on('value', response => {
      let datos = snapshotToArray(response);
      this.markers = datos;
      console.log(response);
      console.log(datos);
    });
  }


  ngOnInit(){
    this.loadMap();
    firebase.database().ref().on("child_added", (snapshot) => {
      let nuevoRegistroFirebase = snapshot.val();
      console.log("nuevoRegistroFirebase.latitude" + nuevoRegistroFirebase.latitude);
      console.log("nuevoRegistroFirebase.longitude" + nuevoRegistroFirebase.longitude);

      this.map.addMarker({
        title: 'Mi posición',
        icon: 'green',
        animation: 'DROP',
        position: {
          lat: nuevoRegistroFirebase.latitude,
          lng: nuevoRegistroFirebase.longitude
        }
      });
    })
    this.markers.forEach((value, index)=>{
      console.log("Posicion: " + value.latitude)
    })
  }

  limpiarMapa(){
    this.map.clear();

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
        lat: this.latitud,
        lng: this.longitud
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });

    
  }


}

export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}

export const snapshotToArray = sanpshot => {
  let returnArr = [];

  sanpshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
}