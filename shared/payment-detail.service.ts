import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail;
  list: PaymentDetail[];
  readonly rootURL = "http://localhost:50833/api";
  
  constructor(private http: HttpClient) { }

  postPaymentDetail(){
    return this.http.post(this.rootURL + '/PaymentDetail', this.formData);
  }

  updatePaymentDetail(){
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.pmId, this.formData);
  }

  deletePaymentDetail(id){
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/PaymentDetail')
      .toPromise()
      .then(res => {
        this.list = res as PaymentDetail[]
      });
  }
}
