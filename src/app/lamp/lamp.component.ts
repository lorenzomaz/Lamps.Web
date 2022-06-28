import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lamp } from '../lamp';
import { LampService } from '../lamp.service';
import { TableParameters } from '../table-parameters';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AddLampComponent } from '../add-lamp/add-lamp.component';
import { Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.css']
})
export class LampComponent implements OnInit {

  dataSource!: MatTableDataSource<Lamp>;
  displayedColumns: string[] = ['select', 'id', 'name', 'info', 'width', 'height', 'price', 'actions'];
  selection = new SelectionModel<Lamp>(true, []);

  pageSizeOptions = [5, 10, 25, 1000, 20000];
  params: TableParameters = { index: 0, size: 10 };
  filter$ = new Subject<string>();
  total: number = 0;

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private lampService: LampService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.getLamps(), 1500);
    // this.getLamps();

    this.filter$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.params.search = value;
      this.paginator.firstPage();
      this.getLamps();
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.params.search !== filterValue)
      this.filter$.next(filterValue);
  }

  getLamps() {
    this.lampService.getAllLamp(this.params)
      .subscribe({
        next: (r) => {
          this.dataSource = new MatTableDataSource<Lamp>(r.results);
          this.total = r.total;
          // console.log(r);
        },
        error: (error: Error) => console.log(error)
      })
  }

  addLamp() {
    this.dialog.open(AddLampComponent, {
      width: '300px'
    }).afterClosed()
      .subscribe(results => {
        if (results) {
          this.lampService.addLamps(results).subscribe({
            complete: ()=> {
              this.getLamps();
            }
          });

        }
      })
  }

  removeLamp(lamp: Lamp) {
    this.lampService.removeLamp(lamp.id!)
      .subscribe({
        next: (r) => {
          this.getLamps()
        },
        error: (error: Error) => console.log(error)
      });
  }

  removeAll(){
    this.lampService.removeAll(this.selection.selected)
      .subscribe({
        next: (r) => {
          this.getLamps()
        },
        error: (error: Error) => console.log(error)
      });
  }

  editLamp(lamp: Lamp) { }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sorDir = event.direction;
    this.getLamps();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getLamps();
  }

}
