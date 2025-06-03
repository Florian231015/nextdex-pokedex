// src/components/StatsChart.tsx
"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Stat {
  name: string;
  value: number;
}

interface StatsChartProps {
  stats: Stat[]; // z. B. [{ name: "Hp", value: 45 }, { name: "Attack", value: 49 }, ...]
}

export default function StatsChart({ stats }: StatsChartProps) {
  // Mappe die Daten so um, dass Recharts sie nutzen kann
  const data = stats.map((s) => ({
    name: s.name.charAt(0).toUpperCase() + s.name.slice(1),
    value: s.value,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          {/* Definiere einen Farbverlauf (Gradient) */}
          <defs>
            <linearGradient id="statGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "#E5E7EB", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#E5E7EB", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, "dataMax + 20"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderRadius: 4,
              border: "none",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
            itemStyle={{ color: "#F9FAFB", fontSize: 12 }}
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
          />
          <Bar dataKey="value" fill="url(#statGradient)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
