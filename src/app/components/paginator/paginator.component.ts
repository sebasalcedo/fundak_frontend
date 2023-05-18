import { Component,  Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: []
})
export class PaginatorComponent {
  public page_size: number = 0;
  public currentPage = 0;
  public totalSize = 0;
  public page_number = 1;


  @Input() listsData: any[] = [];
  @Input() pagesize: number =0;
  @Input() pagenumber: number =0;

  constructor() { }

  public handlePage(e: PageEvent) {
    console.log(e);
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }


}
