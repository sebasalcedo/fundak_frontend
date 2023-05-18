import { Component,   EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search-input.component.html',
  styleUrls: [ ]
})
export class SearchInputComponent {

  public filterText: string = ''

  @Output() messageEvent = new EventEmitter<string>();



  sendSearch() {
    this.messageEvent.emit(this.filterText);
  }

}
