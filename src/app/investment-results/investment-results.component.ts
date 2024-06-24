import { Component, Input } from '@angular/core';
import { UserInput } from '../user-input/user-input.interface';
import { InvestmentResultsService } from './investment-results.service';
import { InvestmentResult } from './investment-result.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  @Input({required: false}) userInput?: UserInput;

  constructor(private investmentResultsService: InvestmentResultsService) {}

  get investmentResults() : InvestmentResult[]
  {
    return this.investmentResultsService.calculateInvestmentResults(this.userInput);
  }
}
