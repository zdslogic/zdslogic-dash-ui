import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, Inject, ElementRef, OnChanges, ViewEncapsulation, SimpleChanges } from '@angular/core';

import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AppLogDetailsComponent } from './../app-log-details.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { AppLog } from 'app/zdslogic-base/core/models/applog.model';

import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-log-data',
  templateUrl: './app-log-data.component.html',
  styleUrls: ['./app-log-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppLogDataComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() public log: AppLog;
  public selectOptions = [{ name: 'Show', value: 'show' }, { name: 'Do not Show', value: '' }];
  @Output() selectEmitt = new EventEmitter();
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

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

  constructor(private _angularLogService: AngularLogService,private _location: Location,
              private _http: HttpClient,
  ) { }

  ngOnInit(): void  {
    //console.log(this.log);
  }

  ngAfterViewInit(): void {
    // show map
    this.mapInitializer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof this.log === 'undefined') {
      //console.log(name + ' is undefined');
      return;
    }
  }

  public onChange(event): void {
    this.selectEmitt.emit(event.value);
  }

  public onCancel(): void{
    this._location.back();
  }

  mapInitializer(): void {
    const coordinates = new google.maps.LatLng(this.productLat, this.productLong);
    this.marker = new google.maps.Marker({ position: coordinates, map: this.map });

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
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.marker.setMap(this.map);
    this.getProductAddressMap().subscribe((data: any) => {
      this.listingPlace =
        //        data.results[1].address_components[0].short_name;
        data.results[0].formatted_address;

    });

  }

  getProductAddressMap(): any {
    const addressName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.productLat},${this.productLong}&key=AIzaSyALXLKEuaAGxkM56kgDcREpyg6EsdN6owo`;
    return this._http.get(addressName);
  }
}
