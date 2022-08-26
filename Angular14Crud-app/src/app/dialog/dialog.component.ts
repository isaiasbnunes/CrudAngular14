import { ProductService } from './../service/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  estadoProduto =["Novo", "Usado", "Reformado"]
  productForm !: FormGroup;

  labelButton: string = "Salvar";

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dilogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      category: ['',Validators.required],
      typeProduct: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',Validators.required],
      date: ['',Validators.required]
    })

    if(this.editData){
      this.labelButton = "Editar";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['typeProduct'].setValue(this.editData.typeProduct);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }

  }

  addProduct(){
    if(!this.editData){
      this.service.save(this.productForm.value)
      .subscribe({
        next:(r)=>{
          alert("Produto adicionado!");
          this.productForm.reset();
          this.dilogRef.close('true');
        },
        error:()=>{
          alert("Ocorreu um erro");
        }
      })
    }else{
      this.editProduct();
    }
  }

  editProduct(){
    this.service.edit(this.productForm.value, this.editData.id)
    .subscribe({
      next:(r)=>{
        alert("Editado com sucesso!");
        this.productForm.reset();
        this.dilogRef.close('true');
      },
      error:()=>{
        alert("Ocorreu um erro!");
      }
    })
  }


}
