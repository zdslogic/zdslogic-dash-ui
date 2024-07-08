import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorLogDataComponent } from './http-error-log-data.component';

describe('HttpErrorLogDataComponent', () => {
  let component: HttpErrorLogDataComponent;
  let fixture: ComponentFixture<HttpErrorLogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpErrorLogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorLogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
