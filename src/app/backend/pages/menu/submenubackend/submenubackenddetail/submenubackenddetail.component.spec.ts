/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubMenuBackendDetailComponent } from './submenubackenddetail.component';

describe('SubMenuBackendDetailComponent', () => {
  let component: SubMenuBackendDetailComponent;
  let fixture: ComponentFixture<SubMenuBackendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuBackendDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuBackendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
