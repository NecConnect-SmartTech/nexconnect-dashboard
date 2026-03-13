import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { DevicesTable, Device } from "@/components/dashboard/devices-table"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { PlanCards } from "@/components/dashboard/plan-cards"

// Mock data
const kpiData = {
  totalDevices: 3,
  totalTaps: 1247,
  lastTap: "2 min ago",
  activeDevices: 2,
}

const devices: Device[] = [
  {
    id: "1",
    name: "Business Card Pro",
    deviceId: "NXC-8A2F-K9D3",
    productType: "Card",
    platform: "iOS",
    status: "active",
    totalTaps: 892,
    lastTap: "2 min ago",
  },
  {
    id: "2",
    name: "Store Display Tag",
    deviceId: "NXC-3B7E-M4P1",
    productType: "Tag",
    platform: "Android",
    status: "active",
    totalTaps: 341,
    lastTap: "1 hour ago",
  },
  {
    id: "3",
    name: "Event Badge",
    deviceId: "NXC-5C1D-N6Q8",
    productType: "Badge",
    platform: "Cross-platform",
    status: "inactive",
    totalTaps: 14,
    lastTap: "3 days ago",
  },
]

const chartData = [
  { date: "Feb 12", taps: 45 },
  { date: "Feb 13", taps: 52 },
  { date: "Feb 14", taps: 38 },
  { date: "Feb 15", taps: 65 },
  { date: "Feb 16", taps: 42 },
  { date: "Feb 17", taps: 58 },
  { date: "Feb 18", taps: 73 },
  { date: "Feb 19", taps: 49 },
  { date: "Feb 20", taps: 62 },
  { date: "Feb 21", taps: 55 },
  { date: "Feb 22", taps: 71 },
  { date: "Feb 23", taps: 48 },
  { date: "Feb 24", taps: 67 },
  { date: "Feb 25", taps: 59 },
  { date: "Feb 26", taps: 82 },
  { date: "Feb 27", taps: 64 },
  { date: "Feb 28", taps: 76 },
  { date: "Mar 1", taps: 53 },
  { date: "Mar 2", taps: 69 },
  { date: "Mar 3", taps: 88 },
  { date: "Mar 4", taps: 72 },
  { date: "Mar 5", taps: 61 },
  { date: "Mar 6", taps: 79 },
  { date: "Mar 7", taps: 54 },
  { date: "Mar 8", taps: 68 },
  { date: "Mar 9", taps: 85 },
  { date: "Mar 10", taps: 77 },
  { date: "Mar 11", taps: 63 },
  { date: "Mar 12", taps: 91 },
  { date: "Mar 13", taps: 74 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader customerName="Jason" plan="free" />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Jason</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your NFC devices today.
            </p>
          </div>

          <div className="space-y-6">
            <KPICards data={kpiData} />
            <DevicesTable devices={devices} />
            <AnalyticsChart data={chartData} />
            <PlanCards currentPlan="free" />
          </div>
        </main>
      </div>
    </div>
  )
}
