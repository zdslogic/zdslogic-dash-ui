import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';
import { AccessAbuse } from '../../core/models/accessAbuse.model';
//import { ProfileEntity } from '../../core/models/profile-entity.model';
import { AccessLogsService } from '../../core/services/accesslogs.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SuccessDialogComponent } from 'app/zdslogic-base/shared/dialogs/success-dialog/success-dialog.component';
import { SystemService } from 'app/zdslogic-base/core/services/system.service';

@Component({
	selector: 'app-http-access-abuse-dialog',
	templateUrl: './http-access-abuse-dialog.component.html',
	styleUrls: ['./http-access-abuse-dialog.component.scss']
})
export class HttpAccessAbuseDialogComponent implements OnInit {
	ipAddress: string;
	public accessAbuse: AccessAbuse;
	public accessAbuseForm: UntypedFormGroup = new UntypedFormGroup({
		dummy: new FormControl(''),
	});
	public editor = ClassicEditor;
	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	constructor(private _angularLogService: AngularLogService,
		private _location: Location,
		
		private systemService: SystemService,

		private _repository: AccessLogsService,

		private _activeRoute: ActivatedRoute,

		private _errorHandlerService: ErrorHandlerService,

		private _dialogRef: MatDialogRef<HttpAccessAbuseDialogComponent>,

		private _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) data) {

		this.ipAddress = data.ipAddress;
	}

	ngOnInit(): void  {

		this.accessAbuseForm = new UntypedFormGroup({
			ipAddress: new FormControl(''),
			isPublic: new FormControl(''),
			ipVersion: new FormControl(''),
			isWhitelisted: new FormControl(''),
			abuseConfidenceScore: new FormControl(''),
			countryCode: new FormControl(''),
			usageType: new FormControl(''),
			isp: new FormControl(''),
			domain: new FormControl(''),
			hostnames: new FormControl(''),
			totalReports: new FormControl(''),
			numDistinctUsers: new FormControl(''),
			lastReportedAt: new FormControl(''),
		});

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
		this.getAccessAbuseDetails();

	}
	private getAccessAbuseDetails = () => {

		const apiUrl = `log/abuse?ip=${this.ipAddress}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				this.accessAbuse = result as AccessAbuse;
				this.populateForm();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	private populateForm() {
		this.accessAbuseForm.controls['ipAddress'].setValue(this.accessAbuse.ipAddress);
		this.accessAbuseForm.controls['isPublic'].setValue(this.accessAbuse.isPublic);
		this.accessAbuseForm.controls['ipVersion'].setValue(this.accessAbuse.ipVersion);
		this.accessAbuseForm.controls['isWhitelisted'].setValue(this.accessAbuse.isWhitelisted);
		this.accessAbuseForm.controls['abuseConfidenceScore'].setValue(this.accessAbuse.abuseConfidenceScore);
		this.accessAbuseForm.controls['countryCode'].setValue(this.accessAbuse.countryCode);
		this.accessAbuseForm.controls['usageType'].setValue(this.accessAbuse.usageType);
		this.accessAbuseForm.controls['isp'].setValue(this.accessAbuse.isp);
		this.accessAbuseForm.controls['domain'].setValue(this.accessAbuse.domain);
		this.accessAbuseForm.controls['hostnames'].setValue(this.accessAbuse.hostnames);
		this.accessAbuseForm.controls['totalReports'].setValue(this.accessAbuse.totalReports);
		this.accessAbuseForm.controls['numDistinctUsers'].setValue(this.accessAbuse.numDistinctUsers);
		this.accessAbuseForm.controls['lastReportedAt'].setValue(this.accessAbuse.lastReportedAt);
	}

	public updateAccessAbuse = (profileAwardFormValue) => {
		const apiUrl = `log/abuse/block?ip=${this.ipAddress}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				//console.log(result);
				this._dialog.closeAll();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}

	public onBlock = () => {
		const apiUrl = `log/abuse/block?ip=${this.ipAddress}`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				//console.log(result);
				//this._dialog.closeAll();
				const dialogRef = this._dialog.open(SuccessDialogComponent, this.dialogConfig);

				// we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
				dialogRef.afterClosed()
					.subscribe((result) => {
						//this._location.back();
					});
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
/*
	public onRestart = () => {

		const apiUrl = `log/restart/nginx`;

		this.systemService.getData(apiUrl)
			.subscribe((result) => {
				//console.log(result);
				this._dialog.closeAll();
			},
				(error) => {
					this._errorHandlerService.handleError(error);
				});
	}
*/	
	public onRestart = () => {
		const apiUrl = `log/restart/nginx`;

		this._repository.getData(apiUrl)
			.subscribe((result) => {
				//console.log(result);
				this._dialog.closeAll();
			},
				(error) => {
					// Rehat closes the connection, so you will
					// get an ERR_CONNECTION_CLOSED, ignore it
					//this._errorHandlerService.handleError(error);
					this._dialog.closeAll();
				});
	}

	public hasError(controlName: string, errorName: string): any {
		return this.accessAbuseForm.controls[controlName].hasError(errorName);
	}

	public onCancel(): void {
		this._dialog.closeAll();
	}

	selected(event) {
		const target = event.source.selected._element.nativeElement;
		const selectedData = {
			value: event.value,
			text: target.innerText.trim()
		};
		//console.log(selectedData);
	}
}

