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
import { PageView } from '..//core/models/pageview';
import { PageViewsDataSource } from '../core/services/pageview.datasource';
import { PageViewsService } from '../core/services/pageview.service';
import { SocketClientOneService } from '../core/services/socket-client-one.service';
//import { WebSocketAccessLogsService } from './../../core/services/websocket-accesslogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
    selector: 'app-http-access-log-pageview-list',
    templateUrl: './http-access-log-pageview-list.component.html',
    styleUrls: ['./http-access-log-pageview-list.component.scss']
})
export class HttpAccessLogPageViewListComponent implements OnInit, AfterViewInit, OnDestroy {

    public displayedColumns = ['method', 'page', 'count', 'status'];

    dataSource: PageViewsDataSource;

    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    //@ViewChild('input', { static: false }) input: ElementRef;

    isShown: boolean = false; // hidden by default

    currentLog: PageView;

    logs: PageView[];

    logsLength = 0;

    sortProperty = '';

    //sortDirection: SortDirection;

    private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

    pageNumber: number;

    private unsubscribeSubject: Subject<void> = new Subject<void>();

    // tslint:disable-next-line:max-line-length
    constructor(private _angularLogService: AngularLogService,private _router: Router,
        private _repository: PageViewsService,
        private _errorHandlerService: ErrorHandlerService,
        private _dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) { }

    ngOnInit(): void  {

        this.dataSource = new PageViewsDataSource(this._repository, this._errorHandlerService);
        //this.sortProperty = 'recieveTime';
        //this.sort.direction = 'desc';
        //this.dataSource.loadLogs('', 'recieveTime', 'desc', 0, 6);

        // this.sortProperty = 'recieveTime';
        // this.sortDirection = 'desc';
        // this.sort.direction = 'desc';

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

    refresh() {
        this.dataSource.loadLogs('count', 'desc', 0, 6);
    }

    ngAfterViewInit() {

        this.sortProperty = 'count';
        this.sort.direction = 'desc';
        //this.dataSource.loadLogs('', 'count', 'desc', 0, 6);
        this.dataSource.loadLogs('count', 'desc', 0, 6);
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

    }

    public redirectToDetails = (id: string) => {
        const url = `/log/access-details/${id}`;
        this._router.navigate([url]);
    }

    loadLogsPage() {
        // this.sort.direction = this.sortDirection;
        this.dataSource.loadLogs(

            // this.input.nativeElement.value,
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
