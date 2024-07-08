import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CompatClient, Message, Stomp, StompSubscription } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';
import SockJS from 'sockjs-client';
import { environment } from '../../../../../environments/environment';
import { filter, first, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SocketClientState } from './socket-client-state';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Injectable({
  providedIn: 'root'
})
export class SocketClientTwoService implements OnDestroy {
  private _client: CompatClient;
  private state: BehaviorSubject<SocketClientState>;

  static jsonHandler(message: Message): any {
////console.log(message.body)
    return JSON.parse(message.body);
  }

  static textHandler(message: Message): string {
    return message.body;
  }

  constructor() {
 //   this.connect();
  }

  connect(): Observable<CompatClient> {

    this._client = Stomp.over(function() {
      return new SockJS(environment.wsUrl);
    });

    // Add the following if you need automatic reconnect (delay is in milli seconds)
    this._client.reconnect_delay = 5000;

    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);

    this._client.connect({}, () => {
      this.state.next(SocketClientState.CONNECTED);
    });

    this.asyncWait();

    return new Observable<CompatClient>((observer) => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this._client);
      });
    });
  }

  async asyncWait() {
    const value = await this.waitForOneSecond();
    ////console.log(value);
  }

  waitForOneSecond(): any {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('I promise to return after one second!');
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
  }

  subscribe(destination: string, id: string ): Observable<any> {
    var client = this._client;
    return new Observable<any>((observer) => {
      const subscription: StompSubscription = client.subscribe(destination, (message) => {
          observer.next(SocketClientTwoService.jsonHandler(message));}, {id});
    });
  }

  onMessage(id: string, topic: string, handler = SocketClientTwoService.jsonHandler): Observable<any> {
    return this.connect().pipe(first(), switchMap((inst) => {
      return new Observable<any>((observer) => {
        const subscription: StompSubscription = inst.subscribe(topic, (message) => {
          observer.next(handler(message));
        }, { id });
        return () => inst.unsubscribe(subscription.id);
      });
    }));
  }

  onPlainMessage(id: string, topic: string): Observable<string> {
    return this.onMessage(id, topic, SocketClientTwoService.textHandler);
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe(first())
      .subscribe(inst => inst.send(topic, {}, JSON.stringify(payload)));
  }


}
