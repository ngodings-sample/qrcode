/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuBackendDetailComponent } from './menubackenddetail.component';

describe('MenuBackendDetailComponent', () => {
  let component: MenuBackendDetailComponent;
  let fixture: ComponentFixture<MenuBackendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBackendDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBackendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
