import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpAccessLogListComponent } from '../http-access-log-list/http-access-log-list.component';
import { HttpAccessLogDetailsComponent } from '../http-access-log-details/http-access-log-details.component';
//import { HttpAccessLogChartComponent } from '../log-chart/log-chart.component';
import { HttpErrorLogListComponent } from '../http-error-log-list/http-error-log-list.component';
import { HttpAccessLogPageViewListComponent } from '../http-access-log-pageview-list/http-access-log-pageview-list.component';

import { HttpErrorLogDetailsComponent } from '../http-error-log-details/http-error-log-details.component';
import { HttpLogsContainerComponent } from '../http-logs-container/http-logs-container.component';
import { AppLogDetailsComponent } from '../app-log-details/app-log-details.component';

const routes: Routes = [
	{ path: '', component: HttpLogsContainerComponent },
	{ path: 'access', component: HttpAccessLogListComponent },
	{ path: 'errors', component: HttpErrorLogListComponent },
	{ path: 'pageviews', component: HttpAccessLogPageViewListComponent },
	{ path: 'access-details/:id', component: HttpAccessLogDetailsComponent },
	{ path: 'error-details/:id', component: HttpErrorLogDetailsComponent },
	{ path: 'app-details/:id', component: AppLogDetailsComponent },
]
	;

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	],
	/**
		* Components / Directives/ Pipes
		*/
	declarations: []
})
export class LogsRoutingModule { }
