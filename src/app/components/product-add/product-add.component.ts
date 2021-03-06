import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup
  constructor(private formsBuilder:FormBuilder,
              private productService:ProductService,
              private toatrService:ToastrService) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
     this.productAddForm = this.formsBuilder.group({
       productName:["",Validators.required],
       unitPrice:["",Validators.required],
       unitsInStock:["",Validators.required],
       categoryId:["",Validators.required]
     })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel =Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.toatrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toatrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
        })
    } else {
      this.toatrService.error("Formunuz Eksik","Dikkat")
    }

  }
}
