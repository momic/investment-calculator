import { Injectable, signal } from "@angular/core";
import { InvestmentResult } from "./investment-results/investment-result.interface";
import type { UserInput } from "./user-input/user-input.interface";

@Injectable({providedIn: 'root'})
export class InvestmentService {
    resultData = signal<InvestmentResult[] | undefined>(undefined);
    // resultData?: InvestmentResult[];

    calculateInvestmentResults(userInput?: UserInput) {

        if (userInput == null) {
          this.resultData.set([]);
          // this.resultData = [];
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
    
        // this.resultData = annualData;
        this.resultData.set(annualData);
      }
    
}