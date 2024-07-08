import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';
@Injectable({
  providedIn: 'root'
})
export class ChartControlsService {

  showData = true;
  keepDrawing = true;
  fullScreen = false;
  constructor() { }
}
