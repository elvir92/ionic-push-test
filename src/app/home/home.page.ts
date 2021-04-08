import {Component, OnInit} from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import {FCM} from '@capacitor-community/fcm';

const {PushNotifications, Device, Modals} = Plugins;
const fcm = new FCM();

const {FCMPlugin} = Plugins;

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
    // this.setupNotifications();
    this.registerPush()
    this.getImei();
  }

  private registerPush() {

    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        alert('No permission for push granted');
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        alert('APN token: ' + JSON.stringify(token));
        fcm.getToken().then((r) => {
          alert(`FCM Token: ${r.token}`); //---- showing null.
        }).catch((err) => {
          alert(`FCM Token ERROR: ${JSON.stringify(err)}`);
        });

      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Registration Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        Modals.alert({
          title: notification.title,
          message: notification.body
        });
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        alert('Action performed: ' + JSON.stringify(notification.notification));
      }
    );
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
