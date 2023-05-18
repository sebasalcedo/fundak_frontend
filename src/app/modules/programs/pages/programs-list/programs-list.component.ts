import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { ProgramsService } from '@modules/programs/services/data.service';
import { Program, Programs } from '../../interfaces/Programs.interface';

import { DialogViewStepsComponent } from '@modules/programs/components/dialog-view-steps/dialog-view-steps.component';
import { StepsService } from '@modules/programs/services/steps.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit{

  listPrograms: Program[]=[];
  public filterText: string = '';


  public page_size: number = 0;
  public currentPage = 0;
  public totalSize = 0;
  public page_number = 1;



  constructor( private programService:ProgramsService, public dialog: MatDialog, private stepsService:StepsService){

  }


  ngOnInit(): void {
    this.getListPrograms();
  }


  receiveSearch($event: string) {
    this.filterText = $event;
  }


  public handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  getListPrograms():void{

    this.programService.getListPrograms().subscribe(
      (res: Programs) =>{
        if(res.ok){
          console.log(res);
          this.listPrograms =res.programs;
        
        }
      },
      err => {
        console.log(err);
      }
      )

  }

  openDialog(item: any): void {

    this.stepsService.getStepsByProgram(item.id).subscribe(

      res => {
       if (res.ok) {
        const steps = res.data;
        console.log(steps);
        this.openStepsDialog(steps);
       }else{
        console.log(res);
       }
      },
      err => {
        console.log(err);
      }

    )
   
   
  }

  openStepsDialog(steps: any[]): void {
    const dialogRef = this.dialog.open(DialogViewStepsComponent, {
      data: { steps: steps }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
