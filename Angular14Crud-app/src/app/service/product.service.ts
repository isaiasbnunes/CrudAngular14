import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "http://localhost:8080/product";

  constructor(
    private http: HttpClient
  ) { }

  findAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  save(a: any): Observable<Product>{
    console.log(a.value);
    return this.http.post<any>(this.url, a);
  }

  edit(data: any, id: number){
    return this.http.put<any>(this.url+"/"+id, data);
  }

  delete(id: number){
    return this.http.delete<any>(this.url+"/"+id);
  }

}
