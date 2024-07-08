import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../zdslogic-base/material/material.module';

import { SharedModule } from '../../zdslogic-base/shared/shared.module';
import { LogsRoutingModule } from './logs-routing/logs-routing.module';
import { AppLogListComponent } from './app-log-list/app-log-list.component';
import { AppLogDetailsComponent } from './app-log-details/app-log-details.component';
import { AppLogDataComponent } from './app-log-details/app-log-data/app-log-data.component';
import { HttpAccessLogListComponent } from './http-access-log-list/http-access-log-list.component';
import { HttpAccessLogDetailsComponent } from './http-access-log-details/http-access-log-details.component';
import { HttpAccessLogDataComponent } from './http-access-log-details/http-access-log-data/http-access-log-data.component';
import { HttpErrorLogListComponent } from './http-error-log-list/http-error-log-list.component';
import { HttpErrorLogDetailsComponent } from './http-error-log-details/http-error-log-details.component';
import { HttpErrorLogDataComponent } from './http-error-log-details/http-error-log-data/http-error-log-data.component';
import { HttpLogsContainerComponent } from './http-logs-container/http-logs-container.component';
import { HttpAccessLogPageViewListComponent } from './http-access-log-pageview-list/http-access-log-pageview-list.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HttpAccessAbuseDialogComponent } from './http-access-log-details/http-access-abuse-dialog/http-access-abuse-dialog.component';
import { SocketClientOneService } from './core/services/socket-client-one.service';
import { SocketClientTwoService } from './core/services/socket-client-two.service';
import { WebSocketAccessLogChartService } from './core/services/websocket-accesslogchart.service';
import { WebSocketAccessLogsService } from './core/services/websocket-accesslogs.service';
import { WebSocketErrorLogsService } from './core/services/websocket-errorlogs.service';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		LogsRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		FontAwesomeModule
	],
	// tslint:disable-next-line:max-line-length
	/**
		* Components / Directives/ Pipes
		*/
	declarations: [
		AppLogListComponent,
		AppLogDetailsComponent,
		AppLogDataComponent,
		HttpAccessLogPageViewListComponent,
		HttpAccessLogListComponent,
		HttpAccessLogDetailsComponent,
		HttpAccessLogDataComponent,
		HttpErrorLogListComponent,
		HttpErrorLogDetailsComponent,
		HttpErrorLogDataComponent,
		HttpLogsContainerComponent,
		HttpAccessAbuseDialogComponent
	],
	providers: [

		SocketClientOneService,
		SocketClientTwoService,
		WebSocketAccessLogChartService,
		WebSocketAccessLogsService,
		WebSocketErrorLogsService,
	]
})
export class LogsModule {

	constructor(private _library: FaIconLibrary) {

		this._library.addIcons(faSearch);

	}

}
