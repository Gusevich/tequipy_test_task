import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'tequipy-employees',
  imports: [RouterOutlet],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {

}
