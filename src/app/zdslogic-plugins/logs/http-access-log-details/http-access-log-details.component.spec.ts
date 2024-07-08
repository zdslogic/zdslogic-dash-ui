import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpAccessLogDetailsComponent } from './http-access-log-details.component';

describe('HttpAccessLogDetailsComponent', () => {
  let component: HttpAccessLogDetailsComponent;
  let fixture: ComponentFixture<HttpAccessLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpAccessLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAccessLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
