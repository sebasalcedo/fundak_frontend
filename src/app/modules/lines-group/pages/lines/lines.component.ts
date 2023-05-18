import { Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { DataLineGroupService } from '@modules/lines-group/services/data.service';
import { ListLines } from '@modules/lines-group/interfaces/lines.interface';
import { ModalRegisterComponent } from '@modules/lines-group/components/modal-register/modal-register.component';
import { DialogGroupsComponent } from '@modules/lines-group/components/dialog-groups/dialog-groups.component';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css'],
})
export class LinesComponent implements OnInit {
  public listLines: any[] = [];

  public page_size: number = 0;
  public currentPage = 0;
  public totalSize = 0;
  public page_number = 1;

  public filterText: string = '';





  constructor(private dataLineGroupService: DataLineGroupService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getLists();
  }

  receiveSearch($event: string) {
    this.filterText = $event;
  }

  public handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  getLists() {
    this.dataLineGroupService.getListLines().subscribe(
      (res: ListLines) => {
        if (res.ok) {
          this.listLines = res.lines;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(ModalRegisterComponent,{
      data:{ idLine:id}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('object');
      this.getLists();
    });
  }

  openDialogGrups(idLine: string, name: string) {
    const dialogRef = this.dialog.open(DialogGroupsComponent, {
      data: { idLine: idLine, line: name },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('object2');

      this.getLists();
    });
  }
}
