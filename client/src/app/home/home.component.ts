import { Component } from '@angular/core';
import { Record } from 'src/app/models/record';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private apiService: ApiService) {
  }
  
  expenses: Record[] = [
    { "name": "Adriana", "amount": 5.75 },
		{ "name": "Adriana", "amount": 5.75 },
		{ "name": "Bao", "amount": 12 }
  ];

  amount: number = 0;
  name: string = "";

  total: number = 0;
  equalShare: number = 0;
  payouts: Array<any> = []

  onAddPress() {
    if (this.name !== "" && this.amount > 0) {
      this.expenses.push({amount: this.amount, name: this.name });
      this.amount = 0;
      this.name = "";
    }
  }

  onRemovePress(index:number){
    if (index >= 0 && index < this.expenses.length) {
      this.expenses.splice(index, 1);
    }
  }

  onSettlePress() {
    this.apiService.payouts(this.expenses).subscribe(result => {
      this.total = result.data.total;
      this.equalShare = result.data.equalShare;
      this.payouts = result.data.payouts;
    }, error => {
      console.error(error);
    });
  }
}
