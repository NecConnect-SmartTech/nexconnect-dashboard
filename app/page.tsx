import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { DevicesTable, Device } from "@/components/dashboard/devices-table"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { PlanCards } from "@/components/dashboard/plan-cards"

const OWNER_EMAIL = "jason@nexconnectst.ca"

type DashboardSummaryResponse = {
  success: boolean
  customer?: {
    email: string
    plan: string
  }
  summary?: {
    total_devices: number
    total_taps: number
    last_tap_at: string | null
    active_devices: number
  }
  devices?: Array<{
    device_id: string
    device_name: string | null
    platform: string | null
    product_type: string | null
    color: string | null
    status: string | null
    tap_count: number
    last_tap_at: string | null
  }>
  error?: string
}

type TapsResponse = {
  success: boolean
  taps?: Array<{
    id: number
    device_id: string
    tapped_at: string
  }>
  error?: string
}

function formatLastTap(value: string | null) {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return "Just now"
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`
  if (diffDay < 30) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`

  return date.toLocaleDateString()
}

function formatStatus(status: string | null) {
  if (!status) return "inactive"
  if (status.toLowerCase() === "activated") return "active"
  return status.toLowerCase()
}

function buildChartData(
  taps: Array<{ tapped_at: string }> = []
): Array<{ date: string; taps: number }> {
  const counts = new Map<string, number>()

  for (const tap of taps) {
    const d = new Date(tap.tapped_at)
    if (Number.isNaN(d.getTime())) continue

    const key = d.toISOString().slice(0, 10)
    counts.set(key, (counts.get(key) || 0) + 1)
  }

  const result: Array<{ date: string; taps: number }> = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)

    const key = d.toISOString().slice(0, 10)
    const label = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })

    result.push({
      date: label,
      taps: counts.get(key) || 0,
    })
  }

  return result
}

export default async function DashboardPage() {
  let summaryData: DashboardSummaryResponse | null = null
  let tapsData: TapsResponse | null = null

  try {
    const [summaryRes, tapsRes] = await Promise.all([
      fetch(
        `https://go.nexconnectst.ca/api/dashboard-summary?owner_email=${encodeURIComponent(OWNER_EMAIL)}`,
        { cache: "no-store" }
      ),
      fetch(`https://go.nexconnectst.ca/api/taps?owner_email=${encodeURIComponent(OWNER_EMAIL)}`, { cache: "no-store" }),
    ])

    summaryData = await summaryRes.json()
    tapsData = await tapsRes.json()
  } catch (error) {
    console.error("Dashboard fetch failed:", error)
  }

  const plan = summaryData?.customer?.plan || "free"
  const summary = summaryData?.summary || {
    total_devices: 0,
    total_taps: 0,
    last_tap_at: null,
    active_devices: 0,
  }

  const kpiData = {
    totalDevices: summary.total_devices,
    totalTaps: summary.total_taps,
    lastTap: formatLastTap(summary.last_tap_at),
    activeDevices: summary.active_devices,
  }

  const devices: Device[] = (summaryData?.devices || []).map((device, index) => ({
    id: String(index + 1),
    name: device.device_name || device.device_id,
    deviceId: device.device_id,
    productType: device.product_type || "—",
    platform: device.platform || "—",
    status: formatStatus(device.status) as "active" | "inactive",
    totalTaps: Number(device.tap_count || 0),
    lastTap: formatLastTap(device.last_tap_at),
  }))

  const chartData = buildChartData(tapsData?.taps || [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader customerName="Jason" plan={plan} />
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
            <PlanCards currentPlan={plan} />
          </div>
        </main>
      </div>
    </div>
  )
}
