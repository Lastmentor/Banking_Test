import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(value: PaymentDetail){
    this.service.formData = Object.assign({}, value);
  }

  onDelete(value){
    if(confirm('Are u sure to delete the record ?')){    
    this.service.deletePaymentDetail(value).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning("Deleted Successfully","Payment Detail Register");
      },
      err => {
        console.log(err)
      })
    }
  }
}
