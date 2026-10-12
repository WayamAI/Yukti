import type { Status } from "@/components/ui/status-badge";
import type { HealthSegment } from "@/components/dashboard/health-score-card";

/**
 * Placeholder fixtures for the command-center dashboard. Swap for real data
 * sources; the component contracts stay the same.
 */

export const healthSegments: HealthSegment[] = [
  { key: "healthy", label: "Healthy", count: 296 },
  { key: "warning", label: "Warning", count: 3 },
  { key: "critical", label: "Critical", count: 1 },
];

export type QueueFilter = {
  id: string;
  label: string;
  count: number;
  tone?: "neutral" | Status;
};

export const queueFilters: QueueFilter[] = [
  { id: "all", label: "All", count: 54 },
  { id: "critical", label: "Critical", count: 1, tone: "critical" },
  { id: "warning", label: "Warning", count: 25, tone: "warning" },
  { id: "info", label: "Info", count: 23, tone: "info" },
  { id: "open", label: "Open", count: 48 },
  { id: "in-progress", label: "In Progress", count: 1 },
  { id: "today", label: "Today", count: 49 },
];

export type ActionRow = {
  id: string;
  priority: Status;
  asset: string;
  assetMeta: string;
  description: string;
  time: string;
  timeMeta: string;
  driver: string;
  driverInitials: string;
};

export const actionRows: ActionRow[] = [
  {
    id: "RS-3001",
    priority: "critical",
    asset: "RS-3001",
    assetMeta: "Traction unit · Itarsi–Bhopal",
    description: "Critical telemetry: coolant loss with rising core temperature",
    time: "2 min ago",
    timeMeta: "14:36",
    driver: "Rajesh Kumar",
    driverInitials: "RK",
  },
  {
    id: "RS-3014",
    priority: "warning",
    asset: "RS-3014",
    assetMeta: "Traction unit · Kalyan Shed",
    description: "Brake pad wear crossed 82% of service limit",
    time: "18 min ago",
    timeMeta: "14:20",
    driver: "Anita Desai",
    driverInitials: "AD",
  },
  {
    id: "RS-3027",
    priority: "warning",
    asset: "RS-3027",
    assetMeta: "Auxiliary power · Itarsi–Bhopal",
    description: "Battery voltage dipping below 23.8V under load",
    time: "41 min ago",
    timeMeta: "13:57",
    driver: "Sunil Yadav",
    driverInitials: "SY",
  },
  {
    id: "RS-3033",
    priority: "info",
    asset: "RS-3033",
    assetMeta: "Bogie frame · Itarsi Yard",
    description: "Scheduled inspection window opens in 36 hours",
    time: "1 h ago",
    timeMeta: "13:31",
    driver: "Priya Nair",
    driverInitials: "PN",
  },
  {
    id: "RS-3042",
    priority: "warning",
    asset: "RS-3042",
    assetMeta: "HVAC compressor · Nagpur–Wardha",
    description: "Compressor duty cycle 14% above fleet baseline",
    time: "2 h ago",
    timeMeta: "12:44",
    driver: "Ravi Menon",
    driverInitials: "RM",
  },
  {
    id: "RS-3058",
    priority: "info",
    asset: "RS-3058",
    assetMeta: "Door system · Ajni Shed",
    description: "Firmware 4.2.1 available for door controller",
    time: "3 h ago",
    timeMeta: "11:52",
    driver: "Neha Kulkarni",
    driverInitials: "NK",
  },
  {
    id: "RS-3061",
    priority: "warning",
    asset: "RS-3061",
    assetMeta: "Pantograph · Itarsi–Bhopal",
    description: "Contact strip wear trending 9% faster than forecast",
    time: "4 h ago",
    timeMeta: "10:38",
    driver: "Harpreet Singh",
    driverInitials: "HS",
  },
  {
    id: "RS-3072",
    priority: "info",
    asset: "RS-3072",
    assetMeta: "Wheelset · Bhusawal Yard",
    description: "Telemetry gap of 12 minutes recovered and backfilled",
    time: "5 h ago",
    timeMeta: "09:47",
    driver: "Kavita Iyer",
    driverInitials: "KI",
  },
];

export type ActivityItem = {
  id: string;
  status: Status;
  title: string;
  meta: string;
  time: string;
};

export const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    status: "critical",
    title: "RS-3001 escalated to incident",
    meta: "AI Concierge · auto-dispatched",
    time: "2 min ago",
  },
  {
    id: "a2",
    status: "success",
    title: "RS-3019 cleared after coolant top-up",
    meta: "Kalyan Shed · Anita Desai",
    time: "26 min ago",
  },
  {
    id: "a3",
    status: "warning",
    title: "RS-3027 flagged for voltage instability",
    meta: "Threshold rule · APU-320",
    time: "41 min ago",
  },
  {
    id: "a4",
    status: "info",
    title: "Fleet health snapshot published",
    meta: "Daily digest · 300 assets",
    time: "1 h ago",
  },
  {
    id: "a5",
    status: "success",
    title: "RS-3044 returned to service",
    meta: "Itarsi Yard · inspection passed",
    time: "2 h ago",
  },
];

export type TelemetryMetric = {
  label: string;
  value: string;
  unit?: string;
  /** Tints the value only — the metric surface stays neutral. */
  tone: Status | "neutral";
  /** Threshold or context for the reading, e.g. "limit 105 °C". */
  note?: string;
};

export type Incident = {
  id: string;
  status: Status;
  location: string;
  driver: { name: string; role: string; initials: string };
  /** Whether the AI Concierge has engaged with the driver. */
  conciergeActive: boolean;
  primaryIssue: string;
  /** Label for the panel's primary CTA — evacuation only makes sense for a
   *  live critical incident. */
  primaryAction: string;
  /** Four channels, chosen per asset type rather than a fixed set — a door
   *  controller has no coolant loop. */
  telemetry: TelemetryMetric[];
};

/** Keyed by asset id so a selected queue row resolves directly. */
export const incidents: Record<string, Incident> = {
  "RS-3001": {
    id: "RS-3001",
    status: "critical",
    location: "Itarsi–Bhopal section, KM 45",
    driver: { name: "Rajesh Kumar", role: "Loco pilot · 6 yrs", initials: "RK" },
    conciergeActive: true,
    primaryIssue: "Coolant loss with rising core temperature on traction unit",
    primaryAction: "Confirm Evacuation",
    telemetry: [
      { label: "Temperature", value: "118", unit: "°C", tone: "critical", note: "limit 105 °C" },
      { label: "Voltage", value: "22.4", unit: "V", tone: "warning", note: "nominal 24 V" },
      { label: "Coolant Level", value: "12", unit: "%", tone: "critical", note: "refill required" },
      { label: "Speed", value: "0", unit: "km/h", tone: "neutral", note: "stationary" },
    ],
  },
  "RS-3014": {
    id: "RS-3014",
    status: "warning",
    location: "Kalyan Shed, Bay 7",
    driver: { name: "Anita Desai", role: "Depot technician · 4 yrs", initials: "AD" },
    conciergeActive: false,
    primaryIssue: "Brake pad wear crossed 82% of service limit",
    primaryAction: "Schedule Pad Replacement",
    telemetry: [
      { label: "Pad Wear", value: "82", unit: "%", tone: "warning", note: "replace at 90 %" },
      { label: "Disc Temp", value: "68", unit: "°C", tone: "neutral", note: "limit 90 °C" },
      { label: "Brake Pressure", value: "7.4", unit: "bar", tone: "neutral", note: "nominal 7.5 bar" },
      { label: "Speed", value: "0", unit: "km/h", tone: "neutral", note: "in depot" },
    ],
  },
  "RS-3027": {
    id: "RS-3027",
    status: "warning",
    location: "Itarsi–Bhopal section, KM 12",
    driver: { name: "Sunil Yadav", role: "Loco pilot · 9 yrs", initials: "SY" },
    conciergeActive: true,
    primaryIssue: "Auxiliary battery voltage dipping under sustained load",
    primaryAction: "Dispatch Technician",
    telemetry: [
      { label: "Voltage", value: "23.6", unit: "V", tone: "warning", note: "nominal 24 V" },
      { label: "Load Current", value: "96", unit: "A", tone: "warning", note: "rated 90 A" },
      { label: "Battery Temp", value: "44", unit: "°C", tone: "neutral", note: "limit 60 °C" },
      { label: "Charge", value: "71", unit: "%", tone: "neutral", note: "healthy above 60 %" },
    ],
  },
  "RS-3033": {
    id: "RS-3033",
    status: "info",
    location: "Itarsi Yard, Road 4",
    driver: { name: "Priya Nair", role: "Inspection lead · 7 yrs", initials: "PN" },
    conciergeActive: false,
    primaryIssue: "Scheduled bogie inspection window opens in 36 hours",
    primaryAction: "Confirm Inspection Slot",
    telemetry: [
      { label: "Mileage", value: "148,200", unit: "km", tone: "neutral", note: "since overhaul" },
      { label: "Vibration", value: "1.8", unit: "mm/s", tone: "success", note: "within limits" },
      { label: "Axle Temp", value: "32", unit: "°C", tone: "neutral", note: "ambient +9 °C" },
      { label: "Speed", value: "0", unit: "km/h", tone: "neutral", note: "stabled" },
    ],
  },
  "RS-3042": {
    id: "RS-3042",
    status: "warning",
    location: "Nagpur–Wardha line, KM 8",
    driver: { name: "Ravi Menon", role: "Loco pilot · 5 yrs", initials: "RM" },
    conciergeActive: true,
    primaryIssue: "HVAC compressor duty cycle running above fleet baseline",
    primaryAction: "Schedule Compressor Service",
    telemetry: [
      { label: "Duty Cycle", value: "78", unit: "%", tone: "warning", note: "baseline 64 %" },
      { label: "Discharge Temp", value: "92", unit: "°C", tone: "warning", note: "limit 100 °C" },
      { label: "Suction Pressure", value: "3.1", unit: "bar", tone: "neutral", note: "nominal 3.4 bar" },
      { label: "Refrigerant", value: "88", unit: "%", tone: "success", note: "nominal" },
    ],
  },
  "RS-3058": {
    id: "RS-3058",
    status: "info",
    location: "Ajni Shed, Bay 2",
    driver: { name: "Neha Kulkarni", role: "Depot technician · 3 yrs", initials: "NK" },
    conciergeActive: false,
    primaryIssue: "Door controller firmware 4.2.1 available for rollout",
    primaryAction: "Approve Firmware Rollout",
    telemetry: [
      { label: "Firmware", value: "4.1.6", tone: "neutral", note: "4.2.1 available" },
      { label: "Cycle Count", value: "214,800", tone: "neutral", note: "since install" },
      { label: "Obstruction Faults", value: "0", tone: "success", note: "last 30 days" },
      { label: "Close Time", value: "3.2", unit: "s", tone: "neutral", note: "nominal 3.0 s" },
    ],
  },
  "RS-3061": {
    id: "RS-3061",
    status: "warning",
    location: "Itarsi–Bhopal section, KM 63",
    driver: { name: "Harpreet Singh", role: "Loco pilot · 11 yrs", initials: "HS" },
    conciergeActive: true,
    primaryIssue: "Pantograph contact strip wearing faster than forecast",
    primaryAction: "Schedule Strip Replacement",
    telemetry: [
      { label: "Strip Wear", value: "64", unit: "%", tone: "warning", note: "replace at 80 %" },
      { label: "Arc Events", value: "12", tone: "warning", note: "last 24 h" },
      { label: "Contact Force", value: "71", unit: "N", tone: "neutral", note: "nominal 70 N" },
      { label: "Speed", value: "82", unit: "km/h", tone: "neutral", note: "in service" },
    ],
  },
  "RS-3072": {
    id: "RS-3072",
    status: "info",
    location: "Bhusawal Yard, Road 1",
    driver: { name: "Kavita Iyer", role: "Telemetry analyst · 2 yrs", initials: "KI" },
    conciergeActive: false,
    primaryIssue: "Telemetry uplink gap recovered and backfilled",
    primaryAction: "Acknowledge",
    telemetry: [
      { label: "Uplink Gap", value: "12", unit: "min", tone: "success", note: "backfilled" },
      { label: "Flange Wear", value: "41", unit: "%", tone: "neutral", note: "limit 70 %" },
      { label: "Axle Temp", value: "29", unit: "°C", tone: "neutral", note: "ambient +6 °C" },
      { label: "Speed", value: "0", unit: "km/h", tone: "neutral", note: "stabled" },
    ],
  },
};

/** Selected when nothing has been picked from the queue yet. */
export const defaultIncidentId = "RS-3001";

export function getIncident(id: string): Incident {
  return incidents[id] ?? incidents[defaultIncidentId];
}
