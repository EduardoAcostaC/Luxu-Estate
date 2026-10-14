'use client';

import React, { useState, useId } from 'react';
import { useTranslation } from '@/lib/i18n';

interface MortgageCalculatorProps {
  price: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ price }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const downPaymentSliderId = useId();
  const interestRateSliderId = useId();

  // Calculations
  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const principal = price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyPrincipalAndInterest =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // Estimated property taxes & home insurance (~1.2% property tax + 0.3% insurance annually)
  const monthlyTaxesAndInsurance = (price * 0.015) / 12;
  const totalMonthlyPayment = Math.round(monthlyPrincipalAndInterest + monthlyTaxesAndInsurance);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-mosque/5 rounded-xl border border-mosque/15 overflow-hidden transition-all">
      {/* Banner Teaser Header */}
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full text-mosque shadow-sm flex-shrink-0">
            <span className="material-icons text-2xl">calculate</span>
          </div>
          <div>
            <h3 className="font-semibold text-nordic-dark text-base sm:text-lg">
              {t('propertyDetail.estimatedPayment')}
            </h3>
            <p className="text-sm text-nordic-dark/70">
              {t('propertyDetail.startingFrom')}{' '}
              <strong className="text-mosque font-bold">
                {currencyFormatter.format(totalMonthlyPayment)}{t('propertyDetail.perMonth')}
              </strong>{' '}
              {t('propertyDetail.withDown', { down: downPaymentPercent })}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="whitespace-nowrap px-4 py-2 bg-white border border-nordic-dark/15 rounded-lg text-sm font-semibold hover:border-mosque hover:text-mosque transition-all text-nordic-dark shadow-sm cursor-pointer"
        >
          {isOpen ? t('propertyDetail.readLess') : t('propertyDetail.estimatedPayment')}
        </button>
      </div>

      {/* Interactive Expandable Calculator */}
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-mosque/10 bg-white/60 space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Down Payment Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-nordic-dark">
                <label htmlFor={downPaymentSliderId}>
                  {t('propertyDetail.downPayment')} ({downPaymentPercent}%)
                </label>
                <span className="text-mosque">{currencyFormatter.format(downPaymentAmount)}</span>
              </div>
              <input
                id={downPaymentSliderId}
                type="range"
                min="5"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-mosque cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-nordic-muted">
                <span>5%</span>
                <span>20%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-nordic-dark">
                <label htmlFor={interestRateSliderId}>{t('propertyDetail.interestRate')}</label>
                <span className="text-mosque">{interestRate.toFixed(1)}%</span>
              </div>
              <input
                id={interestRateSliderId}
                type="range"
                min="3.0"
                max="10.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-mosque cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-nordic-muted">
                <span>3.0%</span>
                <span>6.5%</span>
                <span>10.0%</span>
              </div>
            </div>

            {/* Loan Term Toggle */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-nordic-dark">{t('propertyDetail.loanTerm')}</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLoanTermYears(30)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    loanTermYears === 30
                      ? 'bg-mosque text-white border-mosque shadow-sm'
                      : 'bg-white text-nordic-dark border-slate-200 hover:border-mosque'
                  }`}
                >
                  30 {t('propertyDetail.years')}
                </button>
                <button
                  type="button"
                  onClick={() => setLoanTermYears(15)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    loanTermYears === 15
                      ? 'bg-mosque text-white border-mosque shadow-sm'
                      : 'bg-white text-nordic-dark border-slate-200 hover:border-mosque'
                  }`}
                >
                  15 {t('propertyDetail.years')}
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-nordic-muted block">{t('propertyDetail.principalAndInterest')}:</span>
              <strong className="text-sm text-nordic-dark">
                {currencyFormatter.format(Math.round(monthlyPrincipalAndInterest))}{t('propertyDetail.perMonth')}
              </strong>
            </div>
            <div>
              <span className="text-nordic-muted block">{t('propertyDetail.taxesAndInsurance')}:</span>
              <strong className="text-sm text-nordic-dark">
                {currencyFormatter.format(Math.round(monthlyTaxesAndInsurance))}{t('propertyDetail.perMonth')}
              </strong>
            </div>
            <div>
              <span className="text-nordic-muted block">{t('propertyDetail.homePrice')}:</span>
              <strong className="text-sm text-nordic-dark">
                {currencyFormatter.format(principal)}
              </strong>
            </div>
            <div className="text-right ml-auto">
              <span className="text-nordic-muted block">{t('propertyDetail.monthlyTotal')}:</span>
              <strong className="text-base text-mosque font-bold">
                {currencyFormatter.format(totalMonthlyPayment)}{t('propertyDetail.perMonth')}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
