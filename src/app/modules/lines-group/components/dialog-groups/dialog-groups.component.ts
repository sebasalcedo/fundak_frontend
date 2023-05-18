import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Groups } from '@modules/lines-group/interfaces/groups.interface';
import { DataLineGroupService } from '@modules/lines-group/services/data.service';

import Swal from 'sweetalert2';


export interface DialogData {
  idLine: string;
  line: string;
}

export interface groups {
  id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-dialog-groups',
  templateUrl: './dialog-groups.component.html',
  styleUrls: [],
})
export class DialogGroupsComponent implements OnInit {
  public groupForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    line: [''],
  });

  Toast: any;

  listGroups: any[] = [];

  selectEditGroup: string = '';

  cambioButton: boolean = false;

  constructor(

    public dialogRef: MatDialogRef<DialogGroupsComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private dataLineGroupService: DataLineGroupService,

    private fb: FormBuilder
  ) {
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

    this.groupForm.get('line')!.setValue(this.data.idLine);
  }

  ngOnInit() {
    this.getListGroups();
  }

  getListGroups() {
    this.dataLineGroupService.filterGroupsForLines(this.data.idLine).subscribe(
      (res) => {
        if (res.ok) {
          this.listGroups = res.group;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  registerNewGroups() {
    this.dataLineGroupService.registerGroup(this.groupForm.value).subscribe(
      (res) => {
        if (res.ok) {
          this.getListGroups();
          this.groupForm.get('name')!.setValue('');
          this.groupForm.get('description')!.setValue('');

          this.Toast.fire({
            icon: 'success',
            title: 'Successful registration',
          });
        }
      },
      (err) => {
        console.log(err);

        this.Toast.fire({
          icon: 'error',
          title: err.error.msg,
        });
      }
    );
  }

  getGroupById(idGroup: string) {
    this.cambioButton = true;
    this.selectEditGroup = idGroup;
    this.dataLineGroupService.getGruopById(idGroup).subscribe(
      (res) => {
        if (res.ok) {
          this.groupForm.get('name')!.setValue(res.group[0].name);
          this.groupForm.get('description')!.setValue(res.group[0].description);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editGroupById() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'you are going to update the data of the group!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!',
    }).then((result) => {
      this.cambioButton = false;

      if (result.isConfirmed) {
        this.dataLineGroupService
          .updateGroupById(this.selectEditGroup, this.groupForm.value)
          .subscribe(
            (res) => {
              if (res.ok) {
    this.groupForm.reset();

              
                this.getListGroups();

                this.Toast.fire({
                  icon: 'success',
                  title: 'record updated',
                });
              }
            },
            (err) => {
              this.selectEditGroup = '';
              this.groupForm.reset();

              this.Toast.fire({
                icon: 'error',
                title: err.error.msg,
              });
            }
          );
      }
    });
  }

  deleteGroupById(id: string) {
    if (this.listGroups.length == 1) {
      Swal.fire('cannot be deleted', 'there is only one group', 'warning');
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'you are going to delete the group!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        this.cambioButton = false;

        if (result.isConfirmed) {
          let group: groups[] = [];
          for (var i in this.listGroups) {
            // sacar de la lista para el select el grupo que se desea eliminar
            if (this.listGroups[i].id !== id) {
              group.push(this.listGroups[i].name);
            }
          }
     
 
          
  
        // Mostrar la ventana emergente para que el usuario seleccione un grupo
        const { value: selectedGroup } = await Swal.fire({
          title: 'Select migrate data',
          input: 'select',
          inputOptions: group,
          inputPlaceholder: 'Select Group',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value !== '') {
                resolve('');
              } else {
                resolve('Please select a group');
              }
            });
          },
        });

        // Imprimir el grupo seleccionado en la pantalla
        const groupName = group[selectedGroup];
            
            const select = this.listGroups.filter( element => element.name ===  groupName)
      

            // Ultima validación si esta seguro de eliminar el grupo
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
              if (result.isConfirmed) {

                this.dataLineGroupService.deleteGroupById(id, select).subscribe(
                  (res) => {
                    if (res.ok) {
                      this.getListGroups();

                      this.Toast.fire({
                        icon: 'success',
                        title: 'record deleted',
                      });
                    }
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              }
            });
          
        }
      });
    }
  }
}
