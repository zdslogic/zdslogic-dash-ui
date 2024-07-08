import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild, AfterViewInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpAccessLogDetailsComponent } from './../http-access-log-details.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { AccessLog } from '../../core/models/accesslog.model';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';
import { HttpAccessAbuseDialogComponent } from '../http-access-abuse-dialog/http-access-abuse-dialog.component';
import { User } from 'app/zdslogic-base/core/models/user.model';
import { UsersService } from 'app/zdslogic-base/core/services/users.service';
import { DataSharingService } from 'app/zdslogic-base/core/services/datasharing.service';

@Component({
	selector: 'app-http-access-log-data',
	templateUrl: './http-access-log-data.component.html',
	styleUrls: ['./http-access-log-data.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HttpAccessLogDataComponent implements OnInit, AfterViewInit, OnChanges {

	@Input() public log: AccessLog;
	public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
	@Output() selectEmitt = new EventEmitter();
	@ViewChild('mapContainer', { static: false }) gmap: ElementRef;

	currentUser: User = new User();
	isUser: boolean;
	isUserAuthorized: boolean = false;

	firstLineLink;
	productLat = 40.785091;
	productLong = 73.968285;
	userLat;
	userLong;
	map: google.maps.Map;
	listingPlace;
	distanceProductToUser;
	marker: google.maps.Marker;

	zoom = 12;
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		zoomControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		mapTypeId: 'hybrid',
		maxZoom: 15,
		minZoom: 8,
	};
	markers = [];
	infoContent = '';

	constructor(private _angularLogService: AngularLogService,
		private _usersService: UsersService,
		private _dataSharingService: DataSharingService,
		private _location: Location,
		private _http: HttpClient,
		private _dialog: MatDialog,
	) {
		this._dataSharingService.isUserAuthorized.subscribe(value => {
			this.isUserAuthorized = value;
		});
	}

	private dialogConfig = {
			height: '200px',
			width: '400px',
			disableClose: true,
			data: {}
		};

	ngOnInit(): void  {
		//console.log(this.log);
/*
		this.currentUser = this._usersService.getCurrentUser();

		if (this.currentUser) {
			if (this._usersService.isUserAuthorized(['ROLE_ADMIN'])) {
				this.isUser = true;
			}
		}
*/
		this.dialogConfig = {
			height: '500px',
			width: '500px',
			disableClose: true,
			data: {}
		};
	}

	ngAfterViewInit() {
		// show map
		this.mapInitializer();
	}

	ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
		if (typeof this.log === 'undefined') {
			//console.log(name + ' is undefined');
			return;
		}

		let str = this.log.firstLine;
		if (str.indexOf('GET ') > -1) {
			str = str.split("GET ").pop();
		}
		if (str.indexOf('POST ') > -1) {
			str = str.split("POST ").pop();
		}
		if (str.indexOf('HEAD ') > -1) {
			str = str.split("HEAD ").pop();
		}
		if (str.indexOf('OPTIONS ') > -1) {
			str = str.split("OPTIONS ").pop();
		}
		if (str.indexOf('HTTP/1.1') > -1) {
			const temp = 'HTTP/1\.1';
			let strArray = str.split('HTTP/1\.1');
			str = strArray[0];
		}
		if (str.indexOf('HTTP/1.0') > -1) {
			const temp = 'HTTP/1\.0';
			let strArray = str.split('HTTP/1\.0');
			str = strArray[0];
		}

		let link = "";
		if (this.log.protocol && this.log.host) {
			link += this.log.protocol + ":";
			link += "//" + this.log.host;
			link += str;
		} else {
			link = "https://www.zdslogic.com" + str;
		}

		//this.firstLineLink = '<a class="externallink" target="_blank" rel="nofollow" href='+link+'</a>';

		this.firstLineLink = link;

		this.productLat = parseFloat(this.log.geoIP.latitude);
		this.productLong = parseFloat(this.log.geoIP.longitude);
		this.mapInitializer();
	}

	public onChange = (event) => {
		this.selectEmitt.emit(event.value);
	}

	public onCancel(): void {
		this._location.back();
	}

	mapInitializer() {
		const coordinates = new google.maps.LatLng(this.productLat, this.productLong);
		this.marker = new google.maps.Marker({ position: coordinates, map: this.map })
		const mapOptions: google.maps.MapOptions = {
			center: coordinates,
			zoom: 16,
			fullscreenControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: 'hybrid',
		};
		const options: google.maps.MapOptions = {
			center: coordinates,
			zoomControl: false,
			scrollwheel: false,
			disableDoubleClickZoom: true,
			mapTypeId: 'hybrid',
			maxZoom: 15,
			minZoom: 8,
		}

		this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

		this.marker.setMap(this.map);
		this.getProductAddressMap().subscribe((data: any) => {
			this.listingPlace =
				//        data.results[1].address_components[0].short_name;
				data.results[0].formatted_address;

		});

	}

	getProductAddressMap() {
		var addressName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.productLat},${this.productLong}&key=AIzaSyALXLKEuaAGxkM56kgDcREpyg6EsdN6owo`;
		return this._http.get(addressName);
	}

	public redirectToAccessAbuse = () => {
		const ipAddress = this.log.ip;

		this.dialogConfig.data = {
			ipAddress
		};
		const dialogRef = this._dialog.open(HttpAccessAbuseDialogComponent, this.dialogConfig)
			.afterClosed().subscribe((result) => {
				//this.profileEntity = result;
				//this.getProfileDetails();
			});
	}
}
