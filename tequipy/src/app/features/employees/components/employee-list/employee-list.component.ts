import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EmployeeData, EmployeeView} from '../../../../shared/models';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Router} from '@angular/router';
import {take} from 'rxjs';
import {TableComponent} from '../../../../shared/components/table/table.component';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {EmployeeApiService, EmployeeDataService} from '../../../../core/services';

@Component({
  selector: 'tequipy-employee-list',
  imports: [
    TableComponent,
    MatIcon,
    MatFormField,
    MatLabel,
    MatIconButton,
    MatInput,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];
  public dataSource!: MatTableDataSource<EmployeeView>;

  constructor(private readonly _employeeApiService: EmployeeApiService,
              private readonly _employeeDataService: EmployeeDataService,
              private readonly _liveAnnouncer: LiveAnnouncer,
              private readonly _router: Router,
              private readonly _cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this._employeeApiService.getEmployees()
      .pipe(take(1))
      .subscribe((employees: EmployeeData[]): void => {
        const data: EmployeeView[] = this._employeeDataService.transformEmployeeData(employees);
        this.dataSource = new MatTableDataSource(data);
        this._cdr.markForCheck();
      });
  }

  public applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public handleRowClick(event: EmployeeView): void {
    this._router.navigate([`/employees/${event.id}`]);
  }
}
