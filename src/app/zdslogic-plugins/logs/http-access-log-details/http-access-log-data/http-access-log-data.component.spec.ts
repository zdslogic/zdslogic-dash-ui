import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpAccessLogDataComponent } from './http-access-log-data.component';

describe('HttpAccessLogDataComponent', () => {
  let component: HttpAccessLogDataComponent;
  let fixture: ComponentFixture<HttpAccessLogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpAccessLogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAccessLogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
