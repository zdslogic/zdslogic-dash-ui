import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorLogListComponent } from './http-error-log-list.component';

describe('HttpErrorLogListComponent', () => {
  let component: HttpErrorLogListComponent;
  let fixture: ComponentFixture<HttpErrorLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpErrorLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
