import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AccessLog } from '../core/models/accesslog.model';
import { AccessLogsDataSource } from '../core/services/accesslogs.datasource';
import { AccessLogsService } from '../core/services/accesslogs.service';
import { SocketClientOneService } from '../core/services/socket-client-one.service';
import { WebSocketAccessLogsService } from '../core/services/websocket-accesslogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
	selector: 'app-http-access-log-list',
	templateUrl: './http-access-log-list.component.html',
	styleUrls: ['./http-access-log-list.component.scss']
})
export class HttpAccessLogListComponent implements OnInit, AfterViewInit, OnDestroy {

	public displayedColumns = ['recieveTimeStamp', 'ip', 'firstLine', 'status', 'details'];

	dataSource: AccessLogsDataSource;

	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	//@ViewChild('input', { static: false }) input: ElementRef;

	currentLog: AccessLog;

	logs: AccessLog[];

	logsLength = 0;

	public searchString: string = '';

	sortProperty = '';

	//sortDirection: SortDirection;

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	pageNumber: number;

	messages7: any;
	mysubid7 = 'my-subscription-id-007';

	private unsubscribeSubject: Subject<void> = new Subject<void>();

	// tslint:disable-next-line:max-line-length
	constructor(private _angularLogService: AngularLogService,
		private _router: Router,
		private _wsDataService: SocketClientOneService,
		private accessLogsService: WebSocketAccessLogsService,
		private _repository: AccessLogsService,
		private _errorHandlerService: ErrorHandlerService,
		private _dialog: MatDialog,
		private changeDetectorRefs: ChangeDetectorRef) { }

	ngOnInit(): void  {

		this.dataSource = new AccessLogsDataSource(this._repository, this._errorHandlerService);

		this.dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};
	}

	ngOnDestroy(): void {
		this.unsubscribeSubject.next();
		this.unsubscribeSubject.complete();
	}

	ngAfterViewInit() {

		this.sortProperty = 'recieveTime';
		this.sort.direction = 'desc';
		this.dataSource.loadLogs('', 'recieveTimeStamp', 'desc', 0, 6);

		this.sort.sortChange.subscribe((event) => {
			this.paginator.pageIndex = 0;
			this.sortProperty = event.active;
		});
		/*
				fromEvent(this.input.nativeElement, 'keyup')
					.pipe(
						debounceTime(150),
						distinctUntilChanged(),
						tap(() => {
							this.paginator.pageIndex = 0;
		
							this.loadLogsPage();
						})
					)
					.subscribe();
		*/

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => this.loadLogsPage())
			)
			.subscribe(

				data => {
					//console.log(data);
				}

			);

		this._wsDataService.connect().subscribe((result) => {
			//console.log(result);

			this.messages7 = this.accessLogsService
				.onUpdate(this.mysubid7)
				.pipe(takeUntil(this.unsubscribeSubject))
				.subscribe(post => {

					// this.dataSource.loadLogs('', '', 'asc', 0, 6);

					this.dataSource.refresh(post);

				});

		});
	}

	searchValueChanged() {

		this.paginator.pageIndex = 0;

		this.loadLogsPage();

	}

	searchFormSubmitted(type: string = 'All') {

		this.paginator.pageIndex = 0;

		this.loadLogsPage();

	}

	public redirectToDetails = (id: string) => {
		const url = `/logs/access-details/${id}`;
		this._router.navigate([url]);
	}

	loadLogsPage() {
		// this.sort.direction = this.sortDirection;
		// this.input.nativeElement.value,
		this.dataSource.loadLogs(
			this.searchString,
			this.sortProperty,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);

	}

	navigateLeft() {
		this._router.navigate(['/timeseries']);
	}

	navigateRight() {
		this._router.navigate(['/timeseries']);
	}


}
