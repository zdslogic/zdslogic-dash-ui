import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLogDataComponent } from './app-log-log-data.component';

describe('AppLogDataComponent', () => {
  let component: AppLogDataComponent;
  let fixture: ComponentFixture<AppLogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ AppLogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
