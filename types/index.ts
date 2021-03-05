export enum Status {
  blank,
  requested,
  inProgress,
  success,
  failure,
  noContent,
}

export enum SensorStatus {
  normal,
  warning,
  danger,
  unused,
}

export enum AccessLevel {
  admin,
  cleaner,
}

export enum TimeScale {
  hour = "hour",
  day = "day",
  month = "month",
}

export interface AuthenticateUserConfig {
  username: string,
  password: string,
}

export type AuthResponse = {
  access_token: string,
  refresh_token: string,
}

type Sensor = {
  sensor_id: string,
}

type ToiletPaper = Sensor & {
  value: number,
  status: SensorStatus,
}

type Sanitizer = Sensor & {
  value: number,
}

type Toilet = Sensor & {
  value: number,
}

type Light = Sensor & {
  value: number,
}

type IAQ = Sensor & {
  value: {
    "H2S": number,
    "NH3": number,
    "humidity": number,
    "pm2d5": number,
    "temperature": number,
  },
  status: SensorStatus,
}

type Tissue = Sensor & {
  value: number,
  status: SensorStatus,
}

type Soap = Sensor & {
  value: number,
}

export type FloorData = {
  sensor_toilet_paper: ToiletPaper[],
  sensor_sanitizer: Sanitizer[],
  sensor_door: Toilet[],
  sensor_iaq: IAQ,
  sensor_tissue: Tissue[],
  sensor_soap: Soap[],
}

export type Claims = {
  exp: any;
}

type Coordinate = {
  x: number,
  y: number,
}

export type FloorPlan = {
  width: number,
  height: number,
  washStand?: Coordinate,
  toiletPapers?: Coordinate[],
  toiletPaperProgressBars? : Coordinate[],
  sanitizers?: Coordinate[],
  sanitizerProgressBars?: Coordinate[],
  toilets?: Coordinate[],
  light?: Coordinate,
  iaq?: Coordinate,
  tissues?: Coordinate[],
  soaps?: Coordinate[],
  tissueProgressBars?: Coordinate[],
  soapProgressBars?: Coordinate[],
}

type toiletOverviewCountStatus = {
  count: number,
}

type toiletOverviewCommonStatus = toiletOverviewCountStatus & {
  status: SensorStatus,
}

type toiletOverviewUsageStatus = {
  in_use: number,
  total: number,
  status: SensorStatus,
}

export type ToiletOverviewData = {
  device_id: string,
  people_count: toiletOverviewCountStatus,
  sanitizer: toiletOverviewCommonStatus,
  soap: toiletOverviewCommonStatus,
  tissue: toiletOverviewCommonStatus,
  toilet_paper: toiletOverviewCommonStatus,
  iaq: toiletOverviewCommonStatus,
  usage: toiletOverviewUsageStatus,
}

export type ToiletsOverviewData = Array<ToiletOverviewData>;

export type IAQType = "H2S" | "NH3" | "humidity" | "pm2d5" | "temperature";

type IAQNotice = {
  [K in IAQType]?: number
}

type NoticeSensor = {
  sensor_id: string,
  timestamp: number,
}

export type Notification = {
  device_id: string,
  sensor_iaq: IAQNotice,
  sensor_sanitizer: Array<NoticeSensor>,
  sensor_soap: Array<NoticeSensor>,
  sensor_tissue: Array<NoticeSensor>,
  sensor_toilet_paper: Array<NoticeSensor>,
  alert: boolean,
};

export type Notifications = Array<Notification>;

export type DailyPeopleCount = {
  time: string,
  count: number,
};

export type PeopleCountSummary = Array<DailyPeopleCount>;

type IndicatorScore = {
  score: number,
}

export type IndicatorsData = {
  sensor_iaq: IndicatorScore,
  sensor_sanitizer: IndicatorScore,
  sensor_soap: IndicatorScore,
  sensor_tissue: IndicatorScore,
  sensor_toilet_paper: IndicatorScore,
};

export type UsageOverview = Array<{
  device_id: string,
  usage: {
    in_use: number,
    total: number,
  },
}>

export type LightSaveTime = {
  turn_on: string,
  turn_off: string,
};

export type CategoryOptionsValue = 'people_count' | 'toilet_paper' | 'soap' |'tissue' | 'sanitizer' | IAQChartType;

export type PeopleCountChartData = {
  device_group_id: string,
  device_id: string,
  people_count: {
    count: number,
    time: string,
  }[],
};

export type PeopleCountChartsData = Array<PeopleCountChartData>;

type ChartScoreData = {
  score: number,
  time: string,
};

export type IAQChartData = {
  [key in IAQChartType]: ChartScoreData[]
} & {
  device_group_id: string
  device_id: string
}

export type IAQChartsData = Array<IAQChartData>;

type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

type IAQChartType = Concat<'iaq_', IAQType>;

export type SoapChartData = {
  device_group_id: string,
  device_id: string,
  soap: ChartScoreData[],
};

export type SoapChartsData = Array<SoapChartData>;

export type ToiletPaperChartData = {
  device_group_id: string,
  device_id: string,
  toilet_paper: ChartScoreData[],
};

export type ToiletPaperChartsData = Array<ToiletPaperChartData>;

export type TissueChartData = {
  device_group_id: string,
  device_id: string,
  toilet_paper: ChartScoreData[],
};

export type TissueChartsData = Array<TissueChartData>;

export type SanitizerChartData = {
  device_group_id: string,
  device_id: string,
  toilet_paper: ChartScoreData[],
};

export type SanitizerChartsData = Array<SanitizerChartData>;