import { SensorStatus } from '../types';

export const serverUrl = 'http://8.210.112.36:5002';

export const normalColor = '#08B1A8';
export const warningColor = '#FBB71F';
export const dangerColor = '#F3314B';
export const unusedColor = '#808080';
export const timeInterval = 5000;

export const colorPaletteRGB = [
  '8, 177, 168',
  '251, 183, 31',
  '111, 115, 210',
  '118, 129, 179',
  '242, 186, 201',
  '239, 118, 122',
  '74, 82, 64',
  '218, 223, 247',
  '35, 44, 51',
  '0, 21, 36',
];

export const overviewMenuItems = [{
  label: '總覽',
  href: 'dashboard',
}, {
  label: '洗手間',
  href: 'toilet',
}, {
  label: '圖表',
  href: 'chart',
},
// {
//   label: '照明',
//   href: 'lighting',
// }
];

export const floorPlanMenuItems = [{
  label: '洗手間',
  href: 'floorPlan',
}]


export const l_male_01 = {
  width: 1024,
  height: 770,
  iaq: {x: 852, y: 85},
  queue: {x: 150, y: 200},
  toiletPapers: [ {x: 415, y: 65}, {x: 630, y: 65}],
  toiletPaperProgressBars: [{ x: 445, y: 70 }, { x: 660, y: 70 }],
 
  tissues: [{x: 620, y: 630.4}], //  抽纸
  tissueProgressBars: [{ x: 602.53, y: 680.41 }], // 抽纸进度条
  sanitizers: [{x: 418, y: 140}, {x: 631.85, y: 140}], // 消毒液
  sanitizerProgressBars: [{ x: 445.15, y: 148.79 }, { x: 660, y: 148.79 }],
  soaps: [{ x: 275, y: 620 }, { x: 390, y: 620 }, { x: 510, y: 620 }], // 洗手液
  soapProgressBars: [{x: 260, y: 680}, {x: 375, y: 680.97}, {x: 498.33, y: 680.97}],
};

export const l_female_01 = {
  width: 1100,
  height: 770,
  iaq: {x: 705, y: 575},
  toiletPapers: [ {x: 315, y: 145}, {x: 470, y: 145}, {x: 625, y: 145}],
  toiletPaperProgressBars: [{ x: 355, y: 150 }, { x: 510, y: 150 }, {x: 665, y: 150}],
  toilets: [{ x: 340, y: 50 }, { x: 495, y: 50 }, { x: 645, y: 50 }],
  tissues: [{ x: 410, y: 674 }], //  抽纸
  tissueProgressBars: [{ x: 393, y: 710 }], // 抽纸进度条
  
  // sanitizers: [{ x: 318, y: 210 }, { x: 470.85, y: 210 }, { x: 631.85, y: 210 }], // 消毒液
  // sanitizerProgressBars: [{ x: 355.15, y: 218.79 }, { x: 510, y: 218.79 },{ x: 665, y: 218.79 }],
  soaps: [ { x: 560, y: 655 }, { x: 720, y: 655 }, { x: 880, y: 655 }],
  soapProgressBars: [ { x: 545, y: 710 }, { x: 705.33, y: 710 }, {x:865, y: 710}], // 洗手液
}

export const l_male_02 = {
  width: 1024,
  height: 600,
  iaq: { x: 452, y: 305 },
  toilets: [{ x: 235, y: 50 }],
  toiletPapers: [ {x: 220, y: 165}],
  toiletPaperProgressBars: [{ x: 250, y: 170 }],
  soaps: [ { x: 500, y: 35 }],
  soapProgressBars: [{ x: 485, y: 90 }], // 洗手液
  tissues: [{ x: 650, y: 40 }], //  抽纸
  tissueProgressBars: [{ x: 633, y: 75 }], // 抽纸进度条
};


export const floorOptions = [
  { value: 'l_male_01', label: 'LG/F 男廁' },
  { value: 'l_female_01', label: 'LG/F 女廁' },
  { value: 'l_male_02', label: 'LG/F 男廁' },
];

export const categoryOptions = [
  { value: 'people_count', label: '人流統計' },
  { value: 'toilet_paper', label: '廁紙' },
  { value: 'soap', label: '洗手液' },
  { value: 'tissue', label: '抹手紙' },
  { value: 'sanitizer', label: '廁板消毒液' },
  { value: 'iaq_temperature', label: 'IAQ-溫度' },
  { value: 'iaq_humidity', label: 'IAQ-濕度' },
  { value: 'iaq_pm2d5', label: 'IAQ-PM2.5' },
  { value: 'iaq_NH3', label: 'IAQ-NH3' },
  { value: 'iaq_H2S', label: 'IAQ-H2S' },
];

export const floorDeviceMapping = {
  g_female_01: 1,
  b1_female_03: 2,
  b1_accessible_02: 3,
  g_male_01: 4,
};

export const mockInitialFloorData = {
  sensor_toilet_paper: [{
    sensor_id: '1',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '2',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '3',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '4',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '5',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '6',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '7',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '8',
    value: 0.24,
    status: SensorStatus.normal,
  }],
  sensor_sanitizer: [{
    sensor_id: '1',
    value: 1,
  }, {
    sensor_id: '2',
    value: 1,
  }, {
    sensor_id: '3',
    value: 1,
  }, {
    sensor_id: '4',
    value: 1,
  }, {
    sensor_id: '5',
    value: 1,
  }, {
    sensor_id: '6',
    value: 1,
  }, {
    sensor_id: '7',
    value: 1,
  }, {
    sensor_id: '8',
    value: 0,
  }],
  sensor_door: [{
    sensor_id: '1',
    value: 0,
  }, {
    sensor_id: '2',
    value: 0,
  }, {
    sensor_id: '3',
    value: 0,
  }, {
    sensor_id: '4',
    value: 0,
  }, {
    sensor_id: '5',
    value: 0,
  }, {
    sensor_id: '6',
    value: 0,
  }, {
    sensor_id: '7',
    value: 0,
  }, {
    sensor_id: '8',
    value: 0,
  }, ],
  sensor_iaq: {
    sensor_id: '1',
    value: {
      "H2S": 0.001,
      "NH3": 0.01,
      "humidity": 50.0,
      "pm2d5": 530.0,
      "temperature": 27.0
    },
    status: SensorStatus.warning,
  },
  sensor_tissue: [{
    sensor_id: '0',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '1',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '2',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '3',
    value: 0.24,
    status: SensorStatus.normal,
  }, {
    sensor_id: '4',
    value: 0.24,
    status: SensorStatus.normal,
  }],
  sensor_soap: [{
    sensor_id: '0',
    value: 1,
  }, {
    sensor_id: '1',
    value: 1,
  }, {
    sensor_id: '2',
    value: 1,
  }],
};

export const toiletTableHeads = ['名稱', '人流統計', '使用率', '廁紙', '洗手液', '廁板消毒液', '抹手紙', 'IAQ', '地圖'];

// status 0正常 1警告 2危险
export const mockToiletsOverviewData = [
  {
    device_id: '1', //现在前端写死直接拿device_id做对应
    // floor: 'G/F',
    // toiletName: '女厕 01',
    people_count: {
      count: 123,
    },
    sanitizer: {
      count: 0,
      status: SensorStatus.normal,
    },
    soap: {
      count: 3,
      status: SensorStatus.warning,
    },
    tissue: {
      count: 0,
      status: SensorStatus.normal,
    },
    toilet_paper: {
      count: 0,
      status: SensorStatus.normal,
    },
    iaq: {
      count: 0,
      status: SensorStatus.normal,
    },
    usage: {
      in_use: 1,
      total: 8,
      status: SensorStatus.normal,
    },
  }, {
    device_id: '2', 
    people_count: {
      count: 123,
    },
    sanitizer: {
      count: 0,
      status: SensorStatus.normal,
    },
    soap: {
      count: 3,
      status: SensorStatus.warning,
    },
    tissue: {
      count: 0,
      status: SensorStatus.normal,
    },
    toilet_paper: {
      count: 0,
      status: SensorStatus.normal,
    },
    iaq: {
      count: 0,
      status: SensorStatus.normal,
    },
    usage: {
      in_use: 1,
      total: 8,
      status: SensorStatus.normal,
    },
  }, {
    device_id: '3', 
    people_count: {
      count: 123,
    },
    sanitizer: {
      count: 0,
      status: SensorStatus.normal,
    },
    soap: {
      count: 3,
      status: SensorStatus.warning,
    },
    tissue: {
      count: 0,
      status: SensorStatus.normal,
    },
    toilet_paper: {
      count: 0,
      status: SensorStatus.normal,
    },
    iaq: {
      count: 3,
      status: SensorStatus.danger,
    },
    usage: {
      in_use: 8,
      total: 8,
      status: SensorStatus.danger,
    },
  },
];