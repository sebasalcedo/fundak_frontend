import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataLineGroupService } from '@modules/lines-group/services/data.service';
import { catchError, forkJoin } from 'rxjs';

import Swal from 'sweetalert2';

export interface DialogData {
  idLine: string;
}

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: [],
})
export class ModalRegisterComponent implements OnInit {
  titleDialog: string = 'formComplete';

  public linesForm = this.fb.group({
    name: ['', Validators.required],
    indicative: ['', Validators.maxLength(2)],
    description: [''],
  });

  public groupForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });

  Toast: any;

  public listGroups: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private dataLineGroupService: DataLineGroupService
  ) {}

  ngOnInit(): void {
    if (this.data.idLine !== 'formComplete') {
      this.titleDialog = 'Updated lines';
      this.getLinesById();
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

  addGroups(): void {
    this.listGroups.push(this.groupForm.value);
    this.groupForm.reset();
  }
  removeGroups(position: number): void {
    this.listGroups.splice(position, 1);
  }

  registerLinesAndGroups(): void {
    this.dataLineGroupService
      .registerLine(this.linesForm.value)
      .pipe(
        catchError((err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.msg,
          });
          return [];
        })
      )
      .subscribe((res) => {
        if (res.ok) {
          const requests = this.listGroups.map((group) => {
            const dataJson = {
              name: group.name,
              description: group.description,
              line: res.data.id,
            };
            return this.dataLineGroupService.registerGroup(dataJson);
          });
          if (requests.length > 0) {
            forkJoin(requests).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Successful registration of line and groups',
              });
              this.dialogRef.close();
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Successful registration of line',
            });
            this.dialogRef.close();
          }
        }
      });
  }

  registerGroup(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataLineGroupService
        .registerGroup(data)
        .toPromise()
        .then((respuesta) => {
          resolve(console.log(respuesta));
        })
        .catch((error) => {
          reject(console.log(error));
        });
    });
  }

  getLinesById() {
    this.dataLineGroupService.getLinesById(this.data.idLine).subscribe(
      (res) => {
        if (res.ok) {
          this.linesForm.get('name')!.setValue(res.line[0].name);
          this.linesForm.get('indicative')!.setValue(res.line[0].indicative);
          this.linesForm.get('description')!.setValue(res.line[0].description);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updatedLine = () => {
    this.dataLineGroupService
      .updatedLineById(this.data.idLine, this.linesForm.value)
      .subscribe(
        (res) => {
          this.handleApiResponse(res);
        },
        (err) => {
          this.Toast.fire({
            icon: 'error',
            title: err.error.msg,
          });
          console.log(err);
        }
      );
  }
  
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
}
