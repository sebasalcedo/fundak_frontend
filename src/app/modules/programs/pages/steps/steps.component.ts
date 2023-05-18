import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaElement } from '@modules/programs/interfaces/media.insterface';
import { MediasService } from '@modules/programs/services/medias.service';
import { StepsService } from '@modules/programs/services/steps.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
})
export class StepsComponent implements OnInit {
  public stepList: any[] = [];
  public steps!: FormGroup;

  public edit: boolean = false;
  public positionStepSelect: any;
  public messageButton: string = 'Add';

  public messageFinal: string = 'Register Program';
  public UpdatedFinal: Boolean = false;
  public idUpdated: string = '';
  public listMedia: MediaElement[] =[];

  @Output() messageEvent = new EventEmitter<string>();
  @Output() datosRecibidos = new EventEmitter<any>();
  public urlTree: any;
  public idProgram : string = '';
  constructor(private fb: FormBuilder, private stepsService: StepsService, private router: Router, private mediaService: MediasService) {

    this.urlTree = this.router.url.split('/');
    this.idProgram = this.urlTree[4];
  }

  ngOnInit(): void {
    this.steps = this.fb.group({
      numberStep: ['', Validators.required],
      interaction: ['', Validators.required],
      description: ['', Validators.required],
      media: ['', Validators.required],
    });
  }
  recibirDatos(datos: any) {
    this.stepList = JSON.parse(datos);
    this.messageFinal = 'Updated Program';
    this.UpdatedFinal = true;
  }

  registerStep() {
  if (this.edit) {
      this.updatedStetp();
    } else if (this.idProgram !== '') {
      let step = this.steps.value;

      let data = {
        idProgram: this.idProgram,
        steps:[step],
      };


      this.stepsService.registerSteps(data).subscribe(
        (res) => {

        if (res.ok) {
          this.steps.reset();
        } 

        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.stepList.push(this.steps.value);
      this.steps.reset();
    }
  }

  getListMedia (){
    this.mediaService.getListMedia().subscribe(

      res => {
        if (res.ok) {
          this.listMedia = res.media; 
        }
      }
      
    )
  }

  selectStep(position: number) {
    this.positionStepSelect = position;
    this.messageButton = 'Updated';
    this.idUpdated = this.stepList[position]._id;
    this.steps.get('numberStep')!.setValue(this.stepList[position].numberStep);
    this.steps.get('interaction')!.setValue(this.stepList[position].interaction);
    this.steps.get('description')!.setValue(this.stepList[position].description);
    this.steps.get('media')!.setValue(this.stepList[position].media);
    this.edit = true;
  }

  updatedStetp() {
    if (this.UpdatedFinal) {
      this.stepsService.updatedStep(this.idUpdated, this.steps.value).subscribe(
        (res) => {
          if (res.ok) {
            this.edit = false;
            this.steps.reset();
            this.messageButton = 'Add';
          } else {
            console.log(res.msg);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.stepList.splice(this.positionStepSelect, 1, this.steps.value);
      this.edit = false;
      this.steps.reset();
      this.messageButton = 'Add';
    }
  }

  deleteStep(position: number) {
    this.stepList.splice(position, 1);
  }

  registerData() {
    this.messageEvent.emit(JSON.stringify(this.stepList));
  }
}
