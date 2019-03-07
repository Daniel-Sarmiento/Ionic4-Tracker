import { Component, OnInit } from '@angular/core';
import { GoogleMaps,GoogleMap,GoogleMapsEvent,GoogleMapOptions,Marker,Environment, MarkerCluster} from '@ionic-native/google-maps';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mirar-recorrido',
  templateUrl: './mirar-recorrido.page.html',
  styleUrls: ['./mirar-recorrido.page.scss'],
})
export class MirarRecorridoPage implements OnInit {
  map: GoogleMap;
  ref = firebase.database().ref()

  latitud:number = 16.6147523;
  longitud:number = -93.0888514;

  constructor(public toastController: ToastController){
    
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
  }

  limpiarMapa(){
    this.map.clear();
    firebase.database().ref().remove();
    this.presentToast();
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
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se limpió el  mapa.',
      duration: 2000
    });
    toast.present();
  }
}