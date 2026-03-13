"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ChartData {
  date: string
  taps: number
}

interface AnalyticsChartProps {
  data: ChartData[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Taps Over Time</CardTitle>
        <CardDescription>Daily tap activity for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
                tick={{ fill: 'var(--color-muted-foreground)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                labelStyle={{ color: 'var(--color-foreground)', fontWeight: 500 }}
              />
              <Line
                type="monotone"
                dataKey="taps"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-chart-2)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
