import {Injectable} from '@angular/core';
import {EmployeeData, EmployeeView, Equipment} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  transformEmployeeData(employees: EmployeeData[]): EmployeeView[] {
    return employees.map((employee: EmployeeData) => ({
      ...employee,
      equipments: employee.equipments.map((equipment: Equipment) => equipment.name).join(', '),
    }));
  }
}
