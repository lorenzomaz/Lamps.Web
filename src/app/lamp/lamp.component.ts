import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Lamp } from '../lamp';
import { LampService } from '../lamp.service';

@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.css']
})
export class LampComponent implements OnInit {

  lamps: Array<Lamp> = new Array<Lamp>();

  dataSource!: MatTableDataSource<Lamp>;
  displayedColumns: string[] = ['id', 'name', 'img', 'info', 'width', 'height', 'price'];

  constructor(
    private lampService: LampService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.getLamps(), 1500);
    // this.getLamps();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getLamps() {
    this.lampService.getLamp()
      .subscribe({
        next: (r) => {
          this.dataSource = new MatTableDataSource<Lamp>(r);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error: Error) => console.log(error)
      })
  }

}
