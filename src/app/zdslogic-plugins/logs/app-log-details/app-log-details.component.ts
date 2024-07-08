import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AppLog } from 'app/zdslogic-base/core/models/applog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { AppLogsService } from 'app/zdslogic-base/core/services/applogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';

import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-app-log-details',
  templateUrl: './app-log-details.component.html',
  styleUrls: ['./app-log-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppLogDetailsComponent implements OnInit {
  public log: AppLog;

  constructor(private _angularLogService: AngularLogService,private _repository: AppLogsService, private _router: Router,
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
        this.log = result as AppLog;
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
