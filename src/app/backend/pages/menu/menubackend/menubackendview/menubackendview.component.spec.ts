/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuBackendViewComponent } from './menubackendview.component';

describe('MenuBackendViewComponent', () => {
  let component: MenuBackendViewComponent;
  let fixture: ComponentFixture<MenuBackendViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBackendViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBackendViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
