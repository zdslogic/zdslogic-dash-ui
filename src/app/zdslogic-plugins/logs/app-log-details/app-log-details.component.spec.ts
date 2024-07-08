import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLogDetailsComponent } from './app-log-details.component';

describe('AppLogDetailsComponent', () => {
  let component: AppLogDetailsComponent;
  let fixture: ComponentFixture<AppLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ AppLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
