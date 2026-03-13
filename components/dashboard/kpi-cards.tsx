import { Smartphone, MousePointerClick, Clock, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KPIData {
  totalDevices: number
  totalTaps: number
  lastTap: string
  activeDevices: number
}

interface KPICardsProps {
  data: KPIData
}

export function KPICards({ data }: KPICardsProps) {
  const kpis = [
    {
      title: "Total Devices",
      value: data.totalDevices.toString(),
      icon: Smartphone,
      description: "Registered NFC devices",
    },
    {
      title: "Total Taps",
      value: data.totalTaps.toLocaleString(),
      icon: MousePointerClick,
      description: "All-time interactions",
    },
    {
      title: "Last Tap",
      value: data.lastTap,
      icon: Clock,
      description: "Most recent activity",
    },
    {
      title: "Active Devices",
      value: data.activeDevices.toString(),
      icon: Activity,
      description: "Active in last 30 days",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
