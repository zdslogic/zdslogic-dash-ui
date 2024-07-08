import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpAccessAbuseDialogComponent } from './http-access-abuse-dialog.component';

describe('ContactEmailUpdateDialogComponent', () => {
  let component: HttpAccessAbuseDialogComponent;
  let fixture: ComponentFixture<HttpAccessAbuseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  	/**
	* Components / Directives/ Pipes
	*/
	declarations: [ HttpAccessAbuseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpAccessAbuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
