import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import chatBot from '../../data/chat-bot.json';
import TimeZone from '../../data/timezon_from.json';
import coverage from '../../data/coverage-program.json';
import ProgramType from '../../data/program-type.json';

import { ListLines } from '@modules/lines-group/interfaces/lines.interface';
import { DataLineGroupService } from '@modules/lines-group/services/data.service';
import { SubCategoryService } from '@modules/configurations/services/sub-category.service';
import { _filter } from '../../components/autocomplete/autocomplete.component';
import { ProgramsService } from '@modules/programs/services/data.service';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Programs } from '@modules/programs/interfaces/Programs.interface';
import { StepsService } from '../../services/steps.service';
import { StepsComponent } from '../steps/steps.component';

@Component({
  selector: 'app-register-update-programs',
  templateUrl: './register-update-programs.component.html',
  styleUrls: ['./register-update-programs.component.css'],
})
export class RegisterUpdateProgramsComponent implements OnInit {
  public ListProgramType;
  public ListCoverage;
  public ListchatBot;
  public ListTimeZone;

  public listadoGroupsLineas: any[] = [];
  public listSubCategory: any[] = [];

  public levelList: any[] = ['1', '2', '3 '];
  public submitted = false;

  public programs!: FormGroup;
  public grupos!: FormGroup;

  public groupChild: any;
  public dateNow: any;

  public useDefault: boolean = true;
  public stateText: string = 'Activo';

  public messageButton: string = 'Submit';

  get listGroup(): FormArray {
    return this.grupos.get('grupos') as FormArray;
  }

  get form() {
    return this.programs.controls;
  }

  Toast: any;

  public idUrlUpdate: string = '';
  public listStep: string = '';

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  @ViewChild(StepsComponent) stepsComponent!: StepsComponent;

  constructor(
    private serviceLine: DataLineGroupService,
    private subCategoryService: SubCategoryService,
    private programsService: ProgramsService,
    private stepsService: StepsService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.ListCoverage = coverage;
    this.ListTimeZone = TimeZone;
    this.ListProgramType = ProgramType;
    this.ListchatBot = chatBot;

    this.idUrlUpdate = this.router.snapshot.paramMap.get('id') ?? '';

    if (this.idUrlUpdate !== '') {
      this.searchPrograms();
    }

    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  ngOnInit(): void {
    this.dateNow = new Date().toISOString().slice(0, 10);
    this.getListsLinesFilterGroup();
    this.getListSubCategory();

    this.programs = this.fb.group({
      program_name: ['', Validators.required],
      type: ['', Validators.required],
      menu_option: ['', Validators.required],
      state: ['A', Validators.required],
      coverage: ['', Validators.required],
      program_type: ['', Validators.required],
      Subcategory: ['', Validators.required],
      timezone_from: ['', Validators.required],
      chatbot: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.grupos = this.fb.group({
      grupos: this.fb.array([]),
    });
  }

  receiveData($event: any) {
    this.groupChild = $event;

    this.listsGroupSelect();
  }

  borrarGroup(indice: number) {
    this.listGroup.removeAt(indice);
  }

  listsGroupSelect(): void {
    const form = this.fb.group({
      id: [this.groupChild.id],
      name: [{ value: `${this.groupChild.name}`, disabled: true }],
      level: [''],
      position: [''],
    });
    const existingObject = this.listGroup.controls.find(
      (control) => control.value.id === this.groupChild.id
    );

    if (!existingObject) {
      this.listGroup.push(form);
    }
  }

  getListsLinesFilterGroup(): void {
    this.serviceLine.getListLines().subscribe(
      (res: ListLines) => {
        if (res.ok) {
          res.lines.forEach((line: any) => {
            this.serviceLine.filterGroupsForLines(line.id.toString()).subscribe(
              (resGroup: any) => {
                const lisGroup = resGroup.group;
                if (lisGroup.length != 0) {
                  const data = {
                    title: line.name,
                    lisGroup,
                  };
                  this.listadoGroupsLineas.push(data);
                }
              },
              (err) => console.log('object', err)
            );
          });
        }
      },
      (err: any) => console.log(err)
    );
  }

  getListSubCategory(): void {
    this.subCategoryService.getListSubCategory().subscribe(
      (res) => {
        if (res.ok) {
          this.listSubCategory = res.subCategory;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.programs.reset();
  }
  onSubmit() {}

  handleApiResponse = (res: any) => {
    const toastConfig = {
      success: {
        icon: 'success',
        title: 'successful operation',
      },
      error: {
        icon: 'warning',
        title: 'an error has happened',
      },
    };

    const config = res.ok ? toastConfig.success : toastConfig.error;

    this.Toast.fire(config);
  };

  toggle($event: any) {
    if ($event.checked) {
      this.programs.controls['state'].setValue('A');
      this.stateText = 'Activo';
    } else {
      this.programs.controls['state'].setValue('I');
      this.stateText = 'Inactivo';
    }
  }

  searchPrograms() {
    this.programsService.getProgramById(this.idUrlUpdate).subscribe(
      (res: Programs) => {
        if (res.ok) {
          this.programs.get('program_name')!.setValue(res.programs[0].program_name);
          this.programs.get('type')!.setValue(res.programs[0].type);
          this.programs.get('coverage')!.setValue(res.programs[0].coverage);
          this.programs.get('menu_option')!.setValue(res.programs[0].menu_option);
          this.programs.get('state')!.setValue(res.programs[0].state);
          this.programs.get('program_type')!.setValue(res.programs[0].program_type);
          this.programs.get('Subcategory')!.setValue(res.programs[0].Subcategory);
          this.programs.get('timezone_from')!.setValue(res.programs[0].Timezone_from);
          this.programs.get('chatbot')!.setValue(res.programs[0].chatbot);
          this.programs.get('start_date')!.setValue(res.programs[0].start_date);
          this.programs.get('end_date')!.setValue(res.programs[0].end_date);

          const arrayGroup = res.groups!;

          for (let index = 0; index < arrayGroup.length; index++) {
            const element = arrayGroup[index];

            const form = this.fb.group({
              id: [element.id, Validators.required],
              name: [{ value: `${element.name}`, disabled: true }],
              level: [element.programs[0].level, Validators.required],
              position: [element.programs[0].position, Validators.required],
            });

            const existingObject = this.listGroup.controls.find(
              (control) => control.value.id === element.id
            );

            if (!existingObject) {
              this.listGroup.push(form);
            }
          }

          this.stepsService.getStepsByProgram(this.idUrlUpdate).subscribe(
            (res: any) => {
              if (res.ok) {
                this.listStep = JSON.stringify(res.data);
              }
            },
            (err) => {
              // TODO: FALTA MENSAJE DE ERROR
            }
          );

          this.messageButton = 'Updated';
        } else {
          // TODO: FALTA MENSAJE DE ERROR
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
   * metodo que recibe los step del componente hijo
   * 1. efectua el evento para registra el programa
   * 2. con el id del programa registra los steps
   * @param $event, json en string de los steps del programa
   */
  receiveSteps($event: string): void {
    if (this.programs.valid || this.grupos.valid) {
      let data = {
        ok: false,
      };
      this.handleApiResponse(data);
    }
    let JsonApi = {
      program_name: this.programs.value.program_name,
      type: this.programs.value.type,
      menu_option: this.programs.value.menu_option,
      coverage: this.programs.value.coverage,
      state: this.programs.value.state,
      program_type: this.programs.value.program_type,
      Subcategory: this.programs.value.Subcategory,
      Timezone_from: this.programs.value.timezone_from,
      chatbot: this.programs.value.chatbot,
      start_date: this.programs.value.start_date,
      end_date: this.programs.value.end_date,
      Groups: this.listGroup.value,
    };

    if (this.idUrlUpdate === '') {
      this.programsService.registerPrograms(JsonApi).subscribe(
        (res: any) => {
          if (res.ok) {
            let IdNewProgram = res.program.id;
            let steps = JSON.parse($event);

            if (steps.length !== 0) {
              let data = {
                idProgram: IdNewProgram,
                steps,
              };

              this.stepsService.registerSteps(data).subscribe(
                (res: any) => {
                  if (res.ok) {
                    this.handleApiResponse(res);
                    this._router.navigateByUrl(
                      '/dashboard/programs/listPrograms'
                    );
                  }
                },
                (err) => {
                  this.handleApiResponse(err);

                  console.log(err);
                }
              );
            }
            this.handleApiResponse(res);
            this.programs.reset();
            this._router.navigateByUrl('/dashboard/programs/listPrograms');
          }
          this.programs.reset();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.programsService.updatedPrograms(this.idUrlUpdate, JsonApi).subscribe(
        (res: any) => {
          console.log(res);
          if (res.ok) {
            this._router.navigateByUrl('/dashboard/programs/listPrograms');
            this.handleApiResponse(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  enviarDatos() {
    this.stepsComponent.recibirDatos(this.listStep);
  }
}
