import { Injectable } from '@angular/core';
import { SocketClientTwoService } from './socket-client-two.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketErrorLogsService {

  constructor(private _socketClient: SocketClientTwoService) {
  }

//  static getPostListing(post: any): any {
//    const postedAt = new Date(post['postedAt']);
//    return {...post, postedAt};
//  }

  save(post: any) {
    return this._socketClient.send('/topic/logs/create', post);
  }

  update(post: any) {
    return this._socketClient.send('/topic/logs/update', post);
  }

  delete(post: string) {
    return this._socketClient.send('/topic/logs/delete', post);
  }

  onSave(id: string): Observable<any> {
    return this._socketClient.subscribe('/topic/logs/created', id );
  }

  onUpdate(id: string): Observable<any> {
    return this._socketClient.subscribe('/topic/logs/error/updated', id );
  }

  onDelete(id: string): Observable<any> {
    return this._socketClient.subscribe('/topic/logs/deleted', id );
  }

}
