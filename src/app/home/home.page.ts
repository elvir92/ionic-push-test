import {Component, OnInit} from '@angular/core';

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
  token: any;

  constructor() {
  }

  ngOnInit() {
    console.log('Initializing HomePage');
    this.setupNotifications();
    this.getImei();
  }

  private setupNotifications() {
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
        console.log('SOME ERROR !');
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('Push registration success, token: ' + token.value);
        this.token = token.value;
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      },
    );

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
