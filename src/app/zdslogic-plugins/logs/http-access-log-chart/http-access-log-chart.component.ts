import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild, ChangeDetectorRef, AfterContentInit, OnDestroy } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { Subject, Observable, Subscriber } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filter, first, switchMap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SocketClientOneService } from '../core/services/socket-client-one.service';
import { WebSocketAccessLogChartService } from '../core/services/websocket-accesslogchart.service';
import { Point } from '..//core/models/point';
import { ChartControlsService } from '../core/services/chart-controls.service';
import { BaseChartComponent } from './../../visualizations/base-chart/base-chart.component';
import { AccessLogsService } from '../core/services/accesslogs.service';
import { ErrorHandlerService } from 'app/zdslogic-base/core/services/error-handler.service';
import { AngularLogService } from 'app/zdslogic-base/core/services/angular-log.service';

@Component({
  selector: 'app-http-access-log-chart',
  templateUrl: './http-access-log-chart.component.html',
  styleUrls: ['./http-access-log-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HttpAccessLogChartComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild(BaseChartComponent)
  chart: BaseChartComponent;

  //@Input()
  //@Input() cdMsg : string;
  points: Point[] = [];

  public chartProps: any;

  startDate: any;
  startDateString: string;
  observableTime: Observable<string>;

  startDateSubject = new Subject();
  endDateSubject = new Subject();

  msg = 'Hello World';

  messages6: any;
  mysubid6 = 'my-subscription-id-006';

  keepDrawing = true;

  firstTime = true;

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private _angularLogService: AngularLogService,private _router: Router,
    private wsSocketDataService: SocketClientOneService,
    private _repository: AccessLogsService,
    public chartControlsService: ChartControlsService,
    private accessLogsService: WebSocketAccessLogChartService,
    private changeDetectorRefs: ChangeDetectorRef,
    private elRef: ElementRef,
    private _errorHandlerService: ErrorHandlerService
  ) {

    this.chartControlsService.fullScreen = false;

  }


  ngOnInit(): void {
    this.chartProps = {};
  }

  ngAfterViewInit(): void {

    // Subscribe in Component
    this.startDateSubject.subscribe(next => {
      //console.log(next);
    });

    this.endDateSubject.subscribe(next => {
      //console.log(next);
    });

    this.getLogPoints();

    this.wsSocketDataService.connect().subscribe((result) => {

      //console.log(result);

      this.messages6 = this.accessLogsService
        .onUpdate(this.mysubid6)
        .pipe(takeUntil(this.unsubscribeSubject))
        .subscribe((message) => {

          // //console.log(message);

          var result = message;

          var point = result.point;

          // trade.date = trade.date * 1000;

          //this.points.push(point);

          // this.buildChart();

          //this.initialize();
          //this.buildChart();
          //this.updateChart();

          this.getLogPoints();

        });
    });
  }

  ngOnChanges() {
		/*
		if (this.points && this.chartProps) {
			this.updateChart();
		} else if (this.points) {
			this.buildChart();
		}
		*/
  }

  ngAfterContentInit() {
    // this.initialize();
  }

  ngOnDestroy(): void {
    //console.log("HttpAccessLogChartComponent:ngOnDestroy");

    this.wsSocketDataService.connect().pipe(first()).subscribe(inst => inst.disconnect(null));

    this.initialize();
  }

  private getLogPoints = () => {

    const apiUrl = `log/allpoints`;

    this._repository.getData(apiUrl)
      .subscribe((result) => {
        this.points = result as Point[];
        this.initialize();
        this.buildChart();
        this.updateChart();
      },
        (error) => {
          this._errorHandlerService.handleError(error);
        });
  }

  initialize() {
    this.removeExistingChartFromParent();
    //d3.select("svg").remove();
  }

  //Returns Observable<string>
  getCurrentTime(): Observable<string> {
    return new Observable<string>((observer: Subscriber<string>) => {
      //1 second interval
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
  }

  buildChart() {

    var svg;
    var timeScale;
    var timeAxis;
    var timeline;
    var amountScale;
    var keepDrawing = true;

    var margin = { top: 0, right: 0, bottom: 0, left: 40 };
    //var width = 960 - margin.right;
    var width = 820 - margin.right;
    //var height = 200 - margin.top - margin.bottom;
    var height = 280 - margin.top - margin.bottom;

    var startPoint = this.points[0];
    var endPoint = this.points[this.points.length - 1];

    var startDate = new Date(startPoint.date);
    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setMinutes(newDate.getMinutes() + 30);
    var endDate = new Date(newDate);

    this.chartProps.startDate = startDate;
    this.startDate = startDate;
    this.startDateString = this.startDate.toDateString();
    this.observableTime = this.getCurrentTime();
    this.startDateSubject.next(startDate);
    this.endDateSubject.next(endDate);

    timeScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, width])
      .nice();

    timeAxis = d3.axisBottom(timeScale);

    amountScale = d3.scaleLinear()
      .domain([0, 25])
      .range([height, -1]);

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    svg = d3.select(this.chart.hostElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the X Axis
    timeline = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(timeAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")

      .call(d3.axisLeft(amountScale)); // Create an axis component with d3.axisLeft

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.xAxis = timeAxis;
    this.chartProps.yAxis = amountScale;
    this.chartProps.timeScale = timeScale;
    this.chartProps.timeline = timeline;
    this.chartProps.startDate = startDate;
    this.chartProps.endDate = endDate;
    this.chartProps.width = width;
    this.chartProps.height = height;

  }

  updateChart() {

    var timeScale = this.chartProps.timeScale;
    var timeAxis = this.chartProps.xAxis;
    var timeline = this.chartProps.timeline
    var amountScale = this.chartProps.yAxis;

    // update the timeline range
    var startPoint = this.points[0];
    var endPoint = this.points[this.points.length - 1];
    var startDate = new Date(startPoint.date);

    const myDate = new Date();
    const newDate = new Date(myDate);
    newDate.setMinutes(newDate.getMinutes() + 30);
    var endDate = new Date(newDate);

    this.startDateSubject.next(startDate);
    this.endDateSubject.next(endDate);

    timeScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, this.chartProps.width])
      .nice();

    timeAxis = d3.axisBottom(timeScale);

    // Reset the X Axis
    this.chartProps.svg.selectAll("g.x.axis")
      .call(timeAxis);

    this.chartProps.timeScale = timeScale;
    this.chartProps.startDate = startDate;
    this.chartProps.endDate = endDate;

    if (!this.chartControlsService.keepDrawing) {
      return;
    }

    // join point data to points on the graph
    // see http://bost.ocks.org/mike/join
    var circle = this.chartProps.svg.selectAll("circle")
      .data(this.points, function (d, i) { return d._id });

    circle.enter().append("circle")
      .style("stroke", "gray")
      .style("fill", "red")
      .attr("cx", function (d, i) { return timeScale(d.date) })
      .attr("cy", function (d, i) { return amountScale(d.y) })
      .attr("r", 0)
      .attr("r", 5)
      .append("svg:title") // TITLE APPENDED HERE
      .text(function (d) {
        var pointDate = new Date(d.date).toLocaleString();
        var hover = "Date/Time: " + pointDate + " Hits: " + d.y;
        return hover;
      });

    this.firstTime = false;

  }

  refresh() {

  }

  navigateLeft() {
    this._router.navigate(['/timeseries']);
  }

  navigateRight() {
    this._router.navigate(['/disk']);
  }

  start() {
    this.keepDrawing = true;
  }

  stop() {
    this.keepDrawing = false;
  }


  toggleData(event: MatSlideToggleChange) {
    this.chartControlsService.keepDrawing = event.checked;
  }

  private removeExistingChartFromParent() {
    // !!!!Caution!!!
    // Make sure not to do;
    //     d3.select('svg').remove();
    // That will clear all other SVG elements in the DOM
    d3.select(this.chart.hostElement).select('svg').remove();
  }

}
//export function timeFormat(specifier: string): (date: Date) => string;

