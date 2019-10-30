import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form != null)
      form.resetForm();        
    this.service.formData = {
      pmId: 0,
      cardOwnerName: '',
      cardNumber: '',      
      expirationDate: '',
      cvv: ''
    }
  }

  onSubmit(form: NgForm){
    if(this.service.formData.pmId == 0){
      this.insertRecord(form);
    }else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm){    
    this.service.postPaymentDetail().subscribe(res => {
      this.resetForm(form);
      this.toastr.success("Submitted Successfully","Payment Detail Register");
      this.service.refreshList();
    },
    err => {
      console.log(err);
    })
  }  

  updateRecord(form: NgForm){    
    this.service.updatePaymentDetail().subscribe(res => {
      this.resetForm(form);
      this.toastr.success("Submitted Successfully","Payment Detail Register");
      this.service.refreshList();
    },
    err => {
      console.log(err);
    })
  }  
}
