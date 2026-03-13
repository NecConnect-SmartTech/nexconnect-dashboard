import { Check, Lock, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PlanCardsProps {
  currentPlan: "free" | "pro" | "enterprise"
}

export function PlanCards({ currentPlan }: PlanCardsProps) {
  const includedFeatures = [
    "1 NFC Device",
    "Basic tap analytics",
    "Email support",
    "Dashboard access",
  ]

  const lockedFeatures = [
    "Multiple devices",
    "Last tap history",
    "Advanced analytics",
    "Weekly reports",
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Current Plan</CardTitle>
          <CardDescription>Your subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-2xl font-bold text-foreground">
              {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </span>
            <span className="ml-2 text-muted-foreground">Plan</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Included features:</p>
            <ul className="space-y-2">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-chart-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {currentPlan === "free" && (
        <Card className="border-2 border-chart-1/20 bg-chart-1/5 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-chart-1" />
              <CardTitle className="text-lg font-semibold">Upgrade to Pro</CardTitle>
            </div>
            <CardDescription>Unlock powerful features for your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-2xl font-bold text-foreground">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <div className="mb-6 space-y-2">
              <p className="text-sm font-medium text-foreground">Unlock these features:</p>
              <ul className="space-y-2">
                {lockedFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 text-chart-1" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
