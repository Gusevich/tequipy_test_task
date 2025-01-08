import {Routes} from '@angular/router';
import {Routes as RoutesConstants} from './shared/constants/';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesConstants.Path.employees,
      },
      {
        path: RoutesConstants.Path.employees,
        loadComponent: () =>
          import('./features/employees/employees.component').then((m) => m.EmployeesComponent),
        children: [
          {
            path: ``,
            loadComponent: () =>
              import('./features/employees/components/employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
          },
          {
            path: `:id`,
            loadComponent: () =>
              import('./features/employees/components/employee-info/employee-info.component').then((m) => m.EmployeeInfoComponent),
          },
        ],
      },
      {
        path: `${RoutesConstants.Path.notFound}`,
        loadComponent: () =>
          import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: `${RoutesConstants.Path.notFound}`,
  },
];
