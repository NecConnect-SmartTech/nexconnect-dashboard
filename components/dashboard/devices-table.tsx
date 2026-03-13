"use client"

import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface Device {
  id: string
  name: string
  deviceId: string
  productType: string
  platform: string
  status: "active" | "inactive" | "pending"
  totalTaps: number
  lastTap: string
}

interface DevicesTableProps {
  devices: Device[]
}

export function DevicesTable({ devices }: DevicesTableProps) {
  const statusStyles = {
    active: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    inactive: "bg-muted text-muted-foreground border-muted",
    pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Devices</CardTitle>
        <CardDescription>Manage and monitor your NFC devices</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Name</TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Taps</TableHead>
              <TableHead>Last Tap</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {device.deviceId}
                </TableCell>
                <TableCell>{device.productType}</TableCell>
                <TableCell>{device.platform}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[device.status]}>
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{device.totalTaps.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">{device.lastTap}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Device</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Device
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
