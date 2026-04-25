"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatSignedCurrency,
} from "@/lib/formatters";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface Investment {
  id: string;
  projectName: string;
  amount: number;
  dateInvested: string;
  status: "active" | "completed" | "failed";
  currentValue: number;
  claimableReturns: number;
  canClaim: boolean;
}

interface InvestmentTableProps {
  investments: Investment[];
  onClaim: (investmentId: string, amount: number) => Promise<void>;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({
  investments,
  onClaim,
}) => {
  const [claimingIds, setClaimingIds] = useState<Set<string>>(new Set());
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage;

  const handleClaim = async (investment: Investment) => {
    if (claimingIds.has(investment.id)) return;

    setClaimingIds((prev) => new Set(prev).add(investment.id));
    try {
      await onClaim(investment.id, investment.claimableReturns);
    } finally {
      setClaimingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(investment.id);
        return newSet;
      });
    }
  };

  const getStatusBadge = (status: Investment["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="primary">{t("common.status.active")}</Badge>;
      case "completed":
        return <Badge variant="success">{t("common.status.completed")}</Badge>;
      case "failed":
        return <Badge variant="danger">{t("common.status.failed")}</Badge>;
      default:
        return <Badge variant="secondary">{t("common.status.unknown")}</Badge>;
    }
  };

  const calculateGainLoss = (currentValue: number, invested: number) => {
    const gain = currentValue - invested;
    const percentage = invested > 0 ? (gain / invested) * 100 : 0;
    return {
      amount: gain,
      percentage,
      isPositive: gain >= 0,
    };
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalClaimable = investments.reduce(
    (sum, inv) => sum + inv.claimableReturns,
    0,
  );

  return (
    <div className="overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">
          {t("dashboard.table.title")}
        </h2>
        <p className="text-sm text-white/50 mt-1">
          {t("dashboard.table.description")}
        </p>
      </div>

      <div className="md:hidden">
        <div className="divide-y divide-white/10">
          {investments.map((investment) => {
            const gainLoss = calculateGainLoss(
              investment.currentValue,
              investment.amount,
            );
            const isClaiming = claimingIds.has(investment.id);

            return (
              <div key={investment.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-medium text-white">
                      {investment.projectName}
                    </div>
                    <div className="text-sm text-white/50">
                      {t("dashboard.table.investedOn", {
                        date: formatDate(investment.dateInvested, language),
                      })}
                    </div>
                  </div>
                  {getStatusBadge(investment.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/50">
                      {t("dashboard.table.columns.invested")}
                    </div>
                    <div className="font-medium text-white">
                      {formatCurrency(investment.amount, language)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50">
                      {t("dashboard.table.columns.currentValue")}
                    </div>
                    <div className="font-medium text-white">
                      {formatCurrency(investment.currentValue, language)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50">
                      {t("dashboard.table.columns.gainLoss")}
                    </div>
                    <div
                      className={
                        gainLoss.isPositive ? "text-green-400" : "text-red-400"
                      }
                    >
                      {formatSignedCurrency(gainLoss.amount, language)}
                      <div className="text-xs">
                        ({gainLoss.isPositive ? "+" : ""}
                        {formatNumber(Math.abs(gainLoss.percentage), language, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                        %)
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50">
                      {t("dashboard.table.columns.claimable")}
                    </div>
                    <div className="text-purple-400 font-medium">
                      {formatCurrency(investment.claimableReturns, language)}
                    </div>
                  </div>
                </div>

                {investment.canClaim && investment.claimableReturns > 0 && (
                  <Button
                    size="sm"
                    onClick={() => handleClaim(investment)}
                    disabled={isClaiming}
                    className="w-full"
                  >
                    {isClaiming ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("dashboard.table.actions.claiming")}
                      </div>
                    ) : (
                      t("dashboard.table.actions.claimReturns")
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.project")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.invested")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.currentValue")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.gainLoss")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.claimable")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                {t("dashboard.table.columns.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {investments.map((investment) => {
              const gainLoss = calculateGainLoss(
                investment.currentValue,
                investment.amount,
              );
              const isClaiming = claimingIds.has(investment.id);

              return (
                <tr
                  key={investment.id}
                  className="hover:bg-white/5 transition-colors text-white"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">
                        {investment.projectName}
                      </div>
                      <div className="text-sm text-white/50">
                        {t("dashboard.table.investedOn", {
                          date: formatDate(investment.dateInvested, language),
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatCurrency(investment.amount, language)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatCurrency(investment.currentValue, language)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div
                      className={
                        gainLoss.isPositive ? "text-green-400" : "text-red-400"
                      }
                    >
                      {formatSignedCurrency(gainLoss.amount, language)}
                      <div className="text-xs">
                        ({gainLoss.isPositive ? "+" : ""}
                        {formatNumber(Math.abs(gainLoss.percentage), language, {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        })}
                        %)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-purple-400 font-medium">
                      {formatCurrency(investment.claimableReturns, language)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(investment.status)}
                  </td>
                  <td className="px-6 py-4">
                    {investment.canClaim && investment.claimableReturns > 0 ? (
                      <Button
                        size="sm"
                        onClick={() => handleClaim(investment)}
                        disabled={isClaiming}
                        className="min-w-[80px]"
                      >
                        {isClaiming ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t("dashboard.table.actions.claiming")}
                          </div>
                        ) : (
                          t("dashboard.table.actions.claim")
                        )}
                      </Button>
                    ) : (
                      <span className="text-sm text-white/50">
                        {investment.claimableReturns === 0
                          ? t("dashboard.table.fallbacks.noReturns")
                          : t("dashboard.table.fallbacks.notReady")}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-white/5 border-t border-white/10">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center text-sm text-white">
          <span className="text-white/60">
            {t("dashboard.table.footer.totalInvestments", {
              count: investments.length,
              formattedCount: formatNumber(investments.length, language),
            })}
          </span>
          <div className="flex flex-col gap-2 md:flex-row md:space-x-6 md:gap-0">
            <span>
              {t("dashboard.table.footer.totalInvested")} {" "}
              <span className="font-medium">
                {formatCurrency(totalInvested, language)}
              </span>
            </span>
            <span>
              {t("dashboard.table.footer.totalClaimable")} {" "}
              <span className="font-medium text-purple-400">
                {formatCurrency(totalClaimable, language)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTable;
