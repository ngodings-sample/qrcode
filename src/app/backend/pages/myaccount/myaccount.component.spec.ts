/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyaccountComponent } from './myaccount.component';

describe('MyaccountComponent', () => {
  let component: MyaccountComponent;
  let fixture: ComponentFixture<MyaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyaccountComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
