import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { PageView } from '../models/pageview';
import { PageViewsService } from './pageview.service';
import { PaginationPropertySort } from '../interfaces/pagination';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

export class PageViewsDataSource implements DataSource<PageView> {

    private logsSubject = new BehaviorSubject<PageView[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public total = 0;

    public filter: string;
    public sortProperty: string;
    public sortDirection: string;
    public pageIndex: number;
    public pageSize: number;

    constructor(private logsService: PageViewsService,
        private _errorHandlerService: ErrorHandlerService) {
    }

    refresh(data: PageView) {
        //this.logsSubject.dataChange.value.push(this.dataService.getDialogData());
        // var total = this.logsSubject.value.push(data);
        // this.addData(data);
        this.total = this.total + 1;

        this.loadLogs(
            //this.filter,
            this.sortProperty,
            this.sortDirection,
            this.pageIndex,
            this.pageSize,
        )

    }

    addData(dataObj) {
        const currentValue = this.logsSubject.value;
        const updatedValue = [...currentValue, dataObj];
        this.logsSubject.next(updatedValue);
    }

    loadLogs(
        //filter: string,
        sortProperty: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number): any {

        this.loadingSubject.next(true);
        /*
                if (this.filter !== filter &&
                    this.sortProperty !== sortProperty &&
                    this.sortDirection !== sortDirection &&
                    this.pageIndex !== pageIndex &&
                    this.pageSize !== pageSize) {
        */

        //this.filter = filter;
        this.sortProperty = sortProperty;
        this.sortDirection = sortDirection;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;

        const sort = new PaginationPropertySort();
        sort.property = sortProperty;
        sort.direction = sortDirection;

        this.logsService.findLogsWithSortAndFilter("", sort,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((response) => {
                ////console.log(response);
                this.logsSubject.next(response.content);
                this.total = response.totalElements;
            },
                (error) => {
                    this._errorHandlerService.handleError(error);
                }
            );

    }

    appendData(post: any) {

        const currentValue = this.logsSubject.value;
        const updatedValue = [...currentValue, post];
        this.logsSubject.next(updatedValue);

    }

    connect(collectionViewer: CollectionViewer): Observable<PageView[]> {
        ////console.log('Connecting data source');
        return this.logsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.logsSubject.complete();
        this.loadingSubject.complete();
    }

}

