import { Injectable } from "@angular/core";
import { UserInput } from "../user-input/user-input.interface";
import { InvestmentResult } from "./investment-result.interface";

@Injectable({ providedIn: 'root' })
export class InvestmentResultsService {

  calculateInvestmentResults(userInput?: UserInput): InvestmentResult[] {

    if (userInput == null) {
      return [];
    }

    let initialInvestment = +userInput.initialInvestment;
    let annualInvestment = +userInput.annualInvestment;
    let expectedReturn = +userInput.expectedReturn;
    let duration = +userInput.duration;

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
  
    return annualData;
  }
  

}
