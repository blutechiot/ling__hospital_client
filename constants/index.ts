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

// export const g_female_01 = {
//   width: 832.704,
//   height: 465.962,
//   washStand: {x: 200.96, y: 342.23},
//   toiletPapers: [{x: 137.37,y: 24.78}, {x: 224.55,y: 24.78}, {x: 311.74,y: 24.78}, {x: 398.92,y: 24.78}, {x: 486.1,y: 24.78}, {x: 573.29,y: 24.78}, {x: 660.47,y: 24.78}, {x: 747.66,y: 24.78}],
//   toiletPaperProgressBars: [{x: 157.9, y: 30.32}, {x: 245.08, y: 30.32}, {x: 332.26, y: 30.32}, {x: 419.45, y: 30.32}, {x: 506.63, y: 30.32}, {x: 593.81, y: 30.32}, {x: 681, y: 30.32}, {x: 768.18, y: 30.32}],
//   sanitizers: [{x: 137.37,y: 56.51}, {x: 224.55,y: 56.51}, {x: 311.74,y: 56.51}, {x: 398.92,y: 56.51}, {x: 486.1,y: 56.51}, {x: 573.29,y: 56.51}, {x: 660.47,y: 56.51}, {x: 747.66,y: 56.51}],
//   sanitizerProgressBars: [{x: 157.9, y: 66.24}, {x: 245.08, y: 66.24}, {x: 332.26, y: 66.24}, {x: 419.45, y: 66.24}, {x: 506.63, y: 66.24}, {x: 593.81, y: 66.24}, {x: 681, y: 66.24}, {x: 768.18, y: 66.24}],
//   toilets: [{x: 142.08, y: 94.03}, {x: 229.27, y: 94.03}, {x: 316.45, y: 94.03}, {x: 403.63, y: 94.03}, {x: 490.82, y: 94.03}, {x: 578, y: 94.03}, {x: 665.18, y: 94.03}, {x: 752.37, y: 94.03}],
//   light: {x: 524.394, y: 262.934},
//   light2: {x: 80, y: 370},
//   iaq: {x: 751.6 ,y: 229.33},
//   tissues: [{x: 241.88, y: 378}, {x: 390.78, y: 378}, {x: 542.49, y: 378}, {x: 767.67, y: 378}],
//   soaps: [{x: 322.91, y: 378}, {x: 624.07, y: 378}, {x: 699.79, y: 378}],
//   tissueProgressBars: [{x: 222.91, y: 420.97}, {x: 373.72, y: 420.97}, {x: 524.52, y: 420.97}, {x: 750.73, y: 420.97}],
//   soapProgressBars: [{x: 298.32, y: 420.97}, {x: 599.92, y: 420.97}, {x: 675.33, y: 420.97}],
// };

// export const g_male_01 = {
//   width: 1087.819,
//   height: 677.372,
//   washStand: {x: 327.71, y: 549.72},
//   toiletPapers: [{x: 35.53,y: 50}, {x: 198.842,y: 50}, {x: 362.154,y: 50}, {x: 525.466,y: 50}, {x: 688.778,y: 50}],
//   toiletPaperProgressBars: [{x: 67.04, y: 55}, {x: 230.352, y: 55}, {x: 393.664, y: 55}, {x: 556.976, y: 55}, {x: 720.288, y: 55}],
//   sanitizers: [{x: 35.53,y: 85}, {x: 198.842,y: 85}, {x: 362.154,y: 85}, {x: 525.466,y: 85}, {x: 688.778,y: 85}],
//   sanitizerProgressBars: [{x: 67.04, y: 95}, {x: 230.352, y: 95}, {x: 393.664, y: 95}, {x: 556.976, y: 95}, {x: 720.288, y: 95}],
//   toilets: [{x: 52.53, y: 130.35}, {x: 215.842, y: 130.35}, {x: 379.154, y: 130.35}, {x: 542.466, y: 130.35}, {x: 705.778, y: 130.35}],
//   iaq: {x: 18 ,y: 345.35},
//   tissues: [{x: 489.53, y: 580.44}, {x: 725.53, y: 580.44}],
//   soaps: [{x: 384.53, y: 580.44}, {x: 624.07, y: 580.44}],
//   tissueProgressBars: [{x: 470.53, y: 622.35}, {x: 706.53, y: 622.35}],
//   soapProgressBars: [{x: 360.53, y: 622.35}, {x: 599.53, y: 622.35}],
// };

// export const b1_female_03 = {
//   width: 565.084,
//   height: 523.714,
//   washStand: {x: 0, y: 418.05},
//   toiletPapers: [{x: 28.89, y: 92.81}, {x: 160.89, y: 92.81}, {x: 292.89, y: 92.81}],
//   toiletPaperProgressBars: [{x: 57.87, y: 98.39}, {x: 189.87, y: 98.39}, {x: 321.87, y: 98.39}],
//   sanitizers: [{x: 28.89, y: 134.36}, {x: 160.89, y: 134.36}, {x: 292.89, y: 134.36}],
//   sanitizerProgressBars: [{x: 57.87, y: 142.36}, {x: 189.87, y: 142.36}, {x: 321.87, y: 142.36}],
//   toilets: [{x: 40.54, y: 185.82}, {x: 172.54, y: 185.82}, {x: 304.54, y: 185.82}],
//   iaq: {x: 488.58, y: 10.36},
//   tissues: [{x: 334.68, y: 446.33}],
//   soaps: [{x: 145.79, y: 446.33}, {x: 242.36, y: 446.33}],
//   tissueProgressBars: [{x: 317.57, y: 484.2}],
//   soapProgressBars: [{x: 120.68, y: 484.2}, {x: 218.39, y: 484.2}],
// };

// export const b1_accessible_02 = {
//   width: 532.686,
//   height: 519.9,
//   washStand: {x: 0, y: 241.77},
//   toiletPapers: [{x: 359.85, y: 262.86}],
//   toiletPaperProgressBars: [{x: 394.15, y: 267.11}],
//   sanitizers: [{x: 359.85, y: 302.05}],
//   sanitizerProgressBars: [{x: 394.15, y: 308.79}],
//   toilets: [{x: 372.72, y: 341.12}],
//   iaq: {x: 453.53, y: 13.4},
//   tissues: [{x: 52.53, y: 270.4}],
//   soaps: [{x: 58.53, y: 367.49}],
//   tissueProgressBars: [{x: 34.53, y: 310.41}],
//   soapProgressBars: [{x: 34.53, y: 407.41}],
// };

export const l_male_01 = {
  width: 740,
  height: 610,
  iaq: {x: 602, y: 85},
  queue: {x: 150, y: 200},
  toiletPapers: [{x: 325, y: 80}, {x: 445, y: 80}],
  toiletPaperProgressBars: [{x: 355, y: 85}, {x: 475, y: 85}],
  tissues: [{x: 452.53, y: 492.4}],
  tissueProgressBars: [{x: 434.53, y: 525.41}],
  sanitizers: [{x: 325, y: 140}, {x: 445.85, y: 140}], // 消毒液
  sanitizerProgressBars: [{x: 353.15, y: 148.79}, {x: 475.15, y: 148.79} ],
};


export const floorOptions = [
  { value: 'l_male_01', label: 'LG/Ｆ男廁'}
  // { value: 'g_female_01', label: 'Blk S G/F婦科門診女廁' },
  // { value: 'g_male_01', label: 'Blk S G/F藥房男廁'},
  // { value: 'b1_female_03', label: 'Blk S B1/F急症走廊女廁' },
  // { value: 'b1_accessible_02', label: 'Blk S B1/F暢通易達洗手間' },
 
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