// src/components/StatsChart.tsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface Stat {
  name: string;
  value: number;
}

interface StatsChartProps {
  stats: Stat[];
}

export default function StatsChart({ stats }: StatsChartProps) {
  // Beispiel: Wandelt die Daten um, damit sie für Recharts passen
  const data = stats.map((s) => ({
    name: s.name.charAt(0).toUpperCase() + s.name.slice(1),
    value: s.value,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
          <YAxis tick={{ fill: "#4B5563" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 4 }}
            itemStyle={{ color: "#F9FAFB" }}
          />
          <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
