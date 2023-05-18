import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Output, EventEmitter } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';


export interface DataString {
  name: string;
}

@Component({
  selector: 'app-chip-lists',
  templateUrl: './chip-lists.component.html',
  styleUrls: ['./chip-lists.component.css']
})
export class ChipListsComponent {
 addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  listText: DataString[] = [];

  @Output() dataEvent = new EventEmitter<string>();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    
    if (value) {
      this.listText.push({name: value});
    }

    
    event.chipInput!.clear();
  }

  remove(DataString: DataString): void {
    const index = this.listText.indexOf(DataString);

    if (index >= 0) {
      this.listText.splice(index, 1);
    }
    this.optionRegister()
  }

  edit(DataString: DataString, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(DataString);
      return;
    }

    
    const index = this.listText.indexOf(DataString);
    if (index >= 0) {
      this.listText[index].name = value;
    }
  }

  optionRegister(){
    this.dataEvent.emit(JSON.stringify(this.listText)); 
  }
}
