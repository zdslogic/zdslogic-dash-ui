import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-http-logs-container',
  templateUrl: './http-logs-container.component.html',
  styleUrls: ['./http-logs-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HttpLogsContainerComponent implements OnInit {

  constructor(private _angularLogService: AngularLogService,) { }

  ngOnInit(): void {
  }

}
