import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { ErrorLog } from '../core/models/errorlog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ErrorLogsService } from '../core/services/errorlogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-http-error-log-details',
  templateUrl: './http-error-log-details.component.html',
  styleUrls: ['./http-error-log-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HttpErrorLogDetailsComponent implements OnInit {
  public log: ErrorLog;

  constructor(private _angularLogService: AngularLogService,private _repository: ErrorLogsService, private _router: Router,
    private _activeRoute: ActivatedRoute, 
    private _errorHandlerService: ErrorHandlerService)

{
}

  ngOnInit(): void  {
    this.getLogDetails();
  }

  private getLogDetails = () => {
    const id: string = this._activeRoute.snapshot.params['id'];
    const apiUrl = `errorlog/${id}`;

    this._repository.getData(apiUrl)
      .subscribe((result) => {
        this.log = result as ErrorLog;
      },
        (error) => {
          this._errorHandlerService.handleError(error);
        });
  }
  public onCancel(): void {
    //this._dialog.closeAll();
    //console.log("cancel");
  }
}
