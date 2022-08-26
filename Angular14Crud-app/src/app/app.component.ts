import { Product } from './models/product';
import { ProductService } from './service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular14Crud';


  displayedColumns: string[] = ['productName', 'category', 'typeProduct', 'price', 'date', 'action'];
  dataSource = new MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: ProductService
    ) {}

  ngOnInit(): void {
      this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(v=>{
      if(v==='true'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.service.findAll().subscribe({
      next:(r)=>{
        console.log(r);
        this.dataSource = new MatTableDataSource(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (e)=>{
        alert("Erro ao tentar recuperar os dados!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number){
    this.service.delete(id).
    subscribe({
      next:(r)=>{
        alert("Deletado com sucesso!");
        this.getAllProducts();
      },
      error:()=>{
        alert("Ocorreu um erro ao tentar deletar!");
      }

    })
  }

  edit(row: any):void{
    this.dialog.open(DialogComponent,{
      width: '50%',
      data: row
    }).afterClosed().subscribe(v=>{
      if(v==='true'){
        this.getAllProducts();
      }
    })
  }

}
