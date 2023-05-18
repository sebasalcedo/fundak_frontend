import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StepsByProgram } from '@modules/programs/interfaces/steps.interface';



@Component({
  selector: 'app-dialog-view-steps',
  templateUrl: './dialog-view-steps.component.html',
  styleUrls: []
})
export class DialogViewStepsComponent {


  public steps : any = [];

  constructor(
    public dialogRef: MatDialogRef<DialogViewStepsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StepsByProgram,
  ) {
    this.steps = this.data.steps
    ;
    console.log(this.steps);
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
