import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'tequipy-table',
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatSortModule,
    TitleCasePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit {
  @Input({ required: true }) dataSource!: MatTableDataSource<any>;
  @Input({ required: true }) displayedColumns: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  @Output() rowClickEvent: EventEmitter<any> = new EventEmitter<any>();

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  public rowClick(event: any): void {
    this.rowClickEvent.emit(event);
  }
}
