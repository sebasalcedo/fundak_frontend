import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

export interface linesGroup {
  title: string;
  lisGroup: any[];
}

export const _filter = (opt: any[], value: string): any[] => {
  const filterValue = value.toLowerCase();
  return opt.filter((item) => item.name.toLowerCase().includes(filterValue));
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [],
})
export class AutocompleteComponent implements OnInit {
  @Input() listData: linesGroup[] = [];

  groupSearch = this._formBuilder.group({
    name: '',
  });

  groupOptions!: Observable<linesGroup[]>;


  @Output() dataEvent = new EventEmitter<string>();


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
   
    this.groupOptions = this.groupSearch.get('name')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterGroup(value || ''))
    );
  }

  private _filterGroup(value: string): linesGroup[] {
    if (value) {
      return this.listData
        .map((group) => ({
          title: group.title,
          lisGroup: _filter(group.lisGroup, value),
        }))
        .filter((group) => group.lisGroup.length > 0);
    }

    return this.listData;
  }


  
  optionSelected(event: any){
    this.dataEvent.emit(event); 
  }
}
