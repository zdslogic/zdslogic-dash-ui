import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpLogsContainerComponent } from './http-logs-container.component';

describe('HttpLogsContainerComponent', () => {
  let component: HttpLogsContainerComponent;
  let fixture: ComponentFixture<HttpLogsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpLogsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpLogsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
