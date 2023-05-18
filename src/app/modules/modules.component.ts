import { Component } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: [ ]
})
export class ModuleComponent {
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }
}
