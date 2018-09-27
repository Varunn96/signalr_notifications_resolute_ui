import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _hubConnection: HubConnection;
  private notificationList = new BehaviorSubject([]);

  constructor() { }

  startHubConnection() {
    this._hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/notification").build();
    this._hubConnection
      .start()
      .then(() => console.log("Connection Started"))
      .catch(err => console.log("Error establishing connection"));

      this._hubConnection.on("sendToAll", (type: string, payload: string) => {
        this.notificationList.next([{ severity: type, summary: payload}]);
      });
  }

  newNotification() {
    return this.notificationList.asObservable();
  }
}
