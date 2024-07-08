import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpAccessLogPageViewListComponent } from './http-access-log-pageview-list.component';

describe('HttpAccessLogPageViewListComponent', () => {
  let component: HttpAccessLogPageViewListComponent;
  let fixture: ComponentFixture<HttpAccessLogPageViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpAccessLogPageViewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAccessLogPageViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
