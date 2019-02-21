import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValueService } from '../serviceTestDemo/value.service';

@Component({
  selector: 'app-lightswitch',
  templateUrl: './lightswitch.component.html',
  styleUrls: ['./lightswitch.component.css']
})
export class LightswitchComponent implements OnInit {

  serviceValue :string;
  constructor(private valueService: ValueService) { }

  ngOnInit() {
    this.serviceValue = this.valueService.getValue();
  }

  isOn = false;
  clicked() { this.isOn = !this.isOn; }
  get message() { return `The light is ${this.isOn ? 'On' : 'Off'}`; }


  @Input() selectedMessage: string;
  @Output() selected = new EventEmitter<string>();
  clickeSelected() { this.selected.emit(this.selectedMessage); }
}
