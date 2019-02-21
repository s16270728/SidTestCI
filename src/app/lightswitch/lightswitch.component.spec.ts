import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightswitchComponent } from './lightswitch.component';
import { ValueService } from '../serviceTestDemo/value.service';

describe('LightswitchComponent', () => {
  let component: LightswitchComponent;
  let fixture: ComponentFixture<LightswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightswitchComponent],
      providers: [
        LightswitchComponent,
        { provide: ValueService, useClass: MockValueService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#clicked() should toggle #isOn', () => {
    expect(component.isOn).toBe(false, 'off at first');
    component.clicked();
    expect(component.isOn).toBe(true, 'on after click');
    component.clicked();
    expect(component.isOn).toBe(false, 'off after second click');
  });

  it('#clicked() should set #message to "is on"', () => {
    expect(component.message).toMatch(/is off/i, 'off at first');
    component.clicked();
    expect(component.message).toMatch(/is on/i, 'on after clicked');
  });

  it('raises the selected event when clicked', () => {
    const selectedMessage: string = "selectedMessage emit";
    component.selectedMessage = selectedMessage;

    component.selected.subscribe(value => expect(value).toBe(selectedMessage));
    component.clickeSelected();
  });


  it('should not have serviceValue message after construction', () => {
    let comp = TestBed.get(LightswitchComponent);
    expect(comp.serviceValue).toBeUndefined();

    comp.ngOnInit();
    expect(comp.serviceValue).toContain('Mock Value');
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.serviceValue).toContain('Mock Value');
  });

  // it('should ask user to log in if not logged in after ngOnInit', () => {
  //   userService.isLoggedIn = false;
  //   comp.ngOnInit();
  //   expect(comp.welcome).not.toContain(userService.user.name);
  //   expect(comp.welcome).toContain('log in');
  // });
  it('should have <p> with "banner works!"', () => {
    const element: HTMLElement = fixture.nativeElement;
    const p = element.querySelector('p');
    expect(p.textContent).toEqual('Mock Value');
  });
});

class MockValueService {
  getValue() { return "Mock Value"; }
}
