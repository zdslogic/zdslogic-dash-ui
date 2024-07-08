import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorLogDetailsComponent } from './../http-error-log-details.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { ErrorLog } from '../../core/models/errorlog';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-http-error-log-data',
  templateUrl: './http-error-log-data.component.html',
  styleUrls: ['./http-error-log-data.component.scss']
})
export class HttpErrorLogDataComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() public log: ErrorLog;
  public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
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

  ngAfterViewInit() {
    // show map
    //this.mapInitializer();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (typeof this.log === 'undefined') {
      //console.log(name + ' is undefined');
      return;
    }
/*
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
    if(this.log.protocol && this.log.host){
      link+=this.log.protocol+":";
      link+="//"+this.log.host;
      link+=str;
    }else{
      link="https://www.zdslogic.com" + str;
    }

    //this.firstLineLink = '<a class="externallink" target="_blank" rel="nofollow" href='+link+'</a>';

    this.firstLineLink = link;

    this.productLat = parseFloat(this.log.geoIP.latitude);
    this.productLong = parseFloat(this.log.geoIP.longitude);
    this.mapInitializer();
*/
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

    })

  }

  getProductAddressMap() {
    var addressName = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.productLat},${this.productLong}&key=AIzaSyALXLKEuaAGxkM56kgDcREpyg6EsdN6owo`;
    return this._http.get(addressName);
  }
}
