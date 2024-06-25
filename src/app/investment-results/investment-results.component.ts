import { Component, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {

  constructor(private investmentService: InvestmentService) {}

  // // Returns signal without executing it
  // get results() {
  //   return this.investmentService.resultData;
  // }

  // Returns read only signal
  results = computed(() => {
    return this.investmentService.resultData();
  });

  // // Alternate to return read only signal
  // results = this.investmentService.resultData.asReadonly();

}
