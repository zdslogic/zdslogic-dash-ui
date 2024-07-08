import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpAccessLogListComponent } from './http-access-log-list.component';

describe('HttpAccessLogListComponent', () => {
  let component: HttpAccessLogListComponent;
  let fixture: ComponentFixture<HttpAccessLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpAccessLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAccessLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
