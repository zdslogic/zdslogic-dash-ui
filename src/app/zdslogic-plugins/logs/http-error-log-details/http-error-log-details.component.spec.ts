import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorLogDetailsComponent } from './http-error-log-details.component';

describe('HttpErrorLogDetailsComponent', () => {
  let component: HttpErrorLogDetailsComponent;
  let fixture: ComponentFixture<HttpErrorLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpErrorLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
