"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency, formatNumber } from "@/lib/formatters";

interface PortfolioData {
  totalInvested: number;
  totalCurrentValue: number;
  totalClaimableReturns: number;
  totalProjects: number;
}

interface PortfolioStatsProps {
  data: PortfolioData;
}

const PortfolioStats: React.FC<PortfolioStatsProps> = ({ data }) => {
  const { t, i18n } = useTranslation();
  const totalGains = data.totalCurrentValue - data.totalInvested;
  const totalGainsPercentage =
    data.totalInvested > 0 ? (totalGains / data.totalInvested) * 100 : 0;
  const language = i18n.resolvedLanguage;
  const formattedGainPercentage = formatNumber(
    Math.abs(totalGainsPercentage),
    language,
    {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },
  );

  const stats = [
    {
      title: t("dashboard.stats.totalInvested"),
      value: formatCurrency(data.totalInvested, language),
      description: t("dashboard.stats.acrossAllProjects"),
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      title: t("dashboard.stats.currentValue"),
      value: formatCurrency(data.totalCurrentValue, language),
      description: t(
        totalGains >= 0
          ? "dashboard.stats.gainDescription"
          : "dashboard.stats.lossDescription",
        { percent: formattedGainPercentage },
      ),
      color: totalGains >= 0 ? "text-green-400" : "text-red-400",
      bgColor: totalGains >= 0 ? "bg-green-900/20" : "bg-red-900/20",
    },
    {
      title: t("dashboard.stats.claimableReturns"),
      value: formatCurrency(data.totalClaimableReturns, language),
      description: t("dashboard.stats.readyToClaim"),
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      title: t("dashboard.stats.activeProjects"),
      value: formatNumber(data.totalProjects, language),
      description: t("dashboard.stats.inPortfolio"),
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`relative overflow-hidden rounded-2xl p-6 ${stat.bgColor} border border-white/10 backdrop-blur-xl shadow-lg`}
        >
          <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-white/60 mb-1">{stat.title}</p>
              <p className={`text-3xl font-extrabold ${stat.color} drop-shadow-sm`}>
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-1">{stat.description}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}
            >
              {index === 0 && (
                <svg
                  className={`w-6 h-6 ${stat.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              )}
              {index === 1 && (
                <svg
                  className={`w-6 h-6 ${stat.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              )}
              {index === 2 && (
                <svg
                  className={`w-6 h-6 ${stat.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
              {index === 3 && (
                <svg
                  className={`w-6 h-6 ${stat.color}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioStats;
