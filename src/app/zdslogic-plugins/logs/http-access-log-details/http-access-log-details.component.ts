import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AccessLog } from '..//core/models/accesslog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AccessLogsService } from '../core/services/accesslogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-http-access-log-details',
  templateUrl: './http-access-log-details.component.html',
  styleUrls: ['./http-access-log-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HttpAccessLogDetailsComponent implements OnInit {
  public log: AccessLog;

  constructor(private _angularLogService: AngularLogService,private _repository: AccessLogsService, private _router: Router,
    private _activeRoute: ActivatedRoute, 
    private _errorHandlerService: ErrorHandlerService)

{
}
    //private _dialog: MatDialog, 
    ///@Inject(MAT_DIALOG_DATA) data) 

    //private _dialogRef: MatDialogRef<LogDetailsComponent>,

  ngOnInit(): void  {
    this.getLogDetails();
  }

  private getLogDetails = () => {
    const id: string = this._activeRoute.snapshot.params['id'];
    const apiUrl = `log/${id}`;

    this._repository.getData(apiUrl)
      .subscribe((result) => {
        this.log = result as AccessLog;
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
