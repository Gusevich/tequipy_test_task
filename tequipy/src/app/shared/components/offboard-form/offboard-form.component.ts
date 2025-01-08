import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {EmployeeView} from '../../models';

@Component({
  selector: 'tequipy-offboard-form',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './offboard-form.component.html',
  styleUrl: './offboard-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffboardFormComponent {
  public offboardingForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<OffboardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: EmployeeView
  ) {
    this.offboardingForm = this._formBuilder.group({
      streetLine1: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      receiver: ['', Validators.required],
      notes: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(): void {
    if (this.offboardingForm.valid) {
      this._dialogRef.close(this.offboardingForm.value);
    }
  }

  public onCancel(): void {
    this._dialogRef.close();
  }
}
