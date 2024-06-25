import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserInputComponent } from "./user-input/user-input.component";
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import type { UserInput } from './user-input/user-input.interface';
import { InvestmentResult } from './investment-results/investment-result.interface';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent]
})
export class AppComponent {
  resultsData = signal<InvestmentResult[] | undefined>(undefined);

  onCalculateInvestmentResults(userInput?: UserInput) {

    if (userInput == null) {
      this.resultsData.set([]);
      return;
    }

    const {initialInvestment, annualInvestment, expectedReturn, duration} = userInput;

    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.resultsData.set(annualData);
  }
}
