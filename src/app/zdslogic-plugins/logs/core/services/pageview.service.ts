import { Injectable } from '@angular/core';
//import { AppService } from './app.service';
//import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { PaginationPage, PaginationPropertySort } from '../interfaces/pagination';
import { map, catchError } from 'rxjs/operators';
import { PageView } from '../models/pageview';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

import { application } from '../../../../../../application';

@Injectable({
	providedIn: 'root'
})
export class PageViewsService {
	constructor(private _http: HttpClient,
		private _errorHandlerService: ErrorHandlerService) { }

	public getData(route: string): any {
		return this._http.get(this.createCompleteRoute(route, environment.apiUrl), this.generateHeadersNoToken());
	}

	findLogs(

		filter = '', sortOrder = 'asc',
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('log/pageviews', environment.apiUrl);

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					//                    'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),

			params: new HttpParams()
				.set('filter', filter)
				.set('sort', sortOrder)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())
		}).pipe(
			// map(result => result['content']
			map(result => result
			)
		);
	}

	findLogsWithSort(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		const apiUrl = this.createCompleteRoute('log/pageviews', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Access-Control-Allow-Origin': environment.originHeader,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					//                   'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),
			params: new HttpParams()

				.set('search', filter)

				.set('sort', sortTest)

				.set('page', pageNumber.toString())

				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result
			)
		);
	}

	findLogsWithSortAndFilter(

		filter = '', sort: PaginationPropertySort,
		pageNumber = 0, pageSize = 3): Observable<any> {
		let apiUrl = this.createCompleteRoute('log/pageviews', environment.apiUrl);
		const paramsx: any = { page: pageNumber, size: pageSize };
		if (sort != null) {
			paramsx.sort = sort.property + ',' + sort.direction;
		}

		let sortTest = sort.direction;
		if (sort.property !== '') {
			sortTest = sort.property + ',' + sort.direction;
		}
		let search: string;
		if (filter !== '') {
			apiUrl = this.createCompleteRoute('pageviews/search', environment.apiUrl);

			search = 'status==' + '\'*' + filter + '*\''
				+ ' or ' + 'firstLine==' + '\'*' + filter + '*\''
				+ ' or ' + 'ip==' + '\'*' + filter + '*\''
				+ ' or ' + 'recieveTime==' + '\'*' + filter + '*\''
				+ ' or ' + 'path==' + '\'*' + filter + '*\'';

		}

		return this._http.get(apiUrl, {
			headers: new HttpHeaders(
				{
					'apikey': application.apiKey,
					'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
					'Access-Control-Allow-Origin': environment.originHeader,
					//                   'Authorization': 'Bearer ' + Cookie.get('access_token')
				}),

			params: new HttpParams()
				.set('search', search)
				.set('sort', sortTest)
				.set('page', pageNumber.toString())
				.set('size', pageSize.toString())

		}).pipe(
			// map(result => result['content']
			map(result => result),
			catchError((error) => { this._errorHandlerService.handleError(error); return throwError(error.statusText); })
		);
	}

	private createCompleteRoute(route: string, envAddress: string): any {
		return `${envAddress}/${route}`;
	}

	private generateHeadersNoToken() {

		const headers = new HttpHeaders(
			{
				'apikey': application.apiKey,
				'Access-Control-Allow-Origin': environment.originHeader,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				//'Authorization': 'Bearer ' + Cookie.get('access_token')

			}
		);

		return {

			headers: headers

		};
	}
}

