import {Component, OnInit} from '@angular/core';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const {PushNotifications, Device} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  deviceInfo: any;
  deviceInfo2: any;

  constructor(private uniqueDeviceID: UniqueDeviceID) {
  }

  ngOnInit() {
    console.log('Initializing HomePage');

    this.uniqueDeviceID.get()
      .then((uuid: any) => this.deviceInfo2 = uuid)
      .catch((error: any) => console.log(error));

    // // Request permission to use push notifications
    // // iOS will prompt user and return if they granted permission or not
    // // Android will just grant without prompting
    // PushNotifications.requestPermission().then(result => {
    //   if (result.granted) {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });
    //
    // PushNotifications.addListener(
    //   'registration',
    //   (token: PushNotificationToken) => {
    //     alert('Push registration success, token: ' + token.value);
    //   },
    // );
    //
    // PushNotifications.addListener('registrationError', (error: any) => {
    //   alert('Error on registration: ' + JSON.stringify(error));
    // });
    //
    // PushNotifications.addListener(
    //   'pushNotificationReceived',
    //   (notification: PushNotification) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //   },
    // );
    //
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   (notification: PushNotificationActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //   },
    // );

    this.getImei();
  }

  private getImei() {
    Device.getInfo()
      .then((info) => {
        console.log('=====================DEVICE.GetInfo()=============');
        console.log(info);
        this.deviceInfo = info;
      })
      .catch((err) =>
        console.log(
          '++++++++++++++++++++ DEVICE.GetInfo() catch error : ',
          err
        )
      );
  }

}
