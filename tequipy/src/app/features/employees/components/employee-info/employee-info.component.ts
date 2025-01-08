import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmployeeData, OffboardForm} from '../../../../shared/models';
import {Observable, switchMap, take} from 'rxjs';
import {AsyncPipe, Location} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {EmployeeApiService} from '../../../../core/services';
import {MatDialog} from '@angular/material/dialog';
import {OffboardFormComponent} from '../../../../shared/components/offboard-form/offboard-form.component';

@Component({
  selector: 'tequipy-employee-info',
  imports: [AsyncPipe],
  templateUrl: './employee-info.component.html',
  styleUrl: './employee-info.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoComponent {
  public employee$: Observable<EmployeeData> = this._activatedRoute.params
    .pipe(
      take(1),
      switchMap((params: Params) =>
        this._employeeService.getEmployeeById(params['id']).pipe(take(1)),
      ),
    );

  constructor(private readonly _employeeService: EmployeeApiService,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _location: Location,
              private readonly _dialog: MatDialog) {
  }

  public goBack(): void {
    this._location.back();
  }

  public openModal(employee: EmployeeData): void {
    const dialogRef = this._dialog.open(OffboardFormComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result): void => {
      if (result) {
        this.offboardEmployee(employee.id, result);
      }
    });
  }

  private offboardEmployee(employeeId: string, offboardingData: OffboardForm): void {
    this._employeeService.offboardEmployee(employeeId, offboardingData).subscribe();
  }
}
