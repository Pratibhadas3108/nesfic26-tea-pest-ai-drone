// Mock data and agronomic database for NESFIC-I-07 Platform

export const ESTATES = [
  {
    id: 'tocklai-exp',
    name: 'TRA Tocklai Experimental Station',
    location: 'Jorhat, Upper Assam',
    coordinates: [26.7509, 94.2237],
    totalAreaHa: 48.5,
    sectionsCount: 6,
    activePests: ['Helopeltis theivora', 'Red Spider Mite'],
    lastSurvey: '2026-11-22 08:30 AM',
    weather: {
      temp: '26°C',
      humidity: '84%',
      windSpeed: '6.2 km/h',
      condition: 'Partly Cloudy - Safe for Drone Spraying',
      isSprayingSafe: true
    }
  },
  {
    id: 'cinnamara-tea',
    name: 'Cinnamara Heritage Tea Estate',
    location: 'Jorhat District, Assam',
    coordinates: [26.7150, 94.2480],
    totalAreaHa: 142.0,
    sectionsCount: 14,
    activePests: ['Helopeltis theivora', 'Looper Caterpillar'],
    lastSurvey: '2026-11-21 04:15 PM',
    weather: {
      temp: '27°C',
      humidity: '79%',
      windSpeed: '8.4 km/h',
      condition: 'Overcast - Good Flight Window',
      isSprayingSafe: true
    }
  },
  {
    id: 'dibrugarh-valley',
    name: 'Brahmaputra Valley Tea Division',
    location: 'Dibrugarh, Assam',
    coordinates: [27.4728, 94.9120],
    totalAreaHa: 210.0,
    sectionsCount: 22,
    activePests: ['Red Spider Mite', 'Tea Thrips'],
    lastSurvey: '2026-11-20 10:00 AM',
    weather: {
      temp: '25°C',
      humidity: '88%',
      windSpeed: '12.1 km/h',
      condition: 'Breezy - Monitoring Drift Thresholds',
      isSprayingSafe: true
    }
  }
];

export const TEA_SECTIONS = [
  {
    id: 'SEC-4A',
    name: 'Section 4A (Clone TV-23)',
    estateId: 'tocklai-exp',
    areaHa: 8.4,
    bushes: 11200,
    pruningStatus: 'Light Pruned (LP)',
    healthIndex: 0.88,
    status: 'healthy',
    infestationRate: 3.2,
    dominantPest: 'None (Below ETL)',
    coordinates: [
      [26.7530, 94.2210],
      [26.7545, 94.2255],
      [26.7515, 94.2270],
      [26.7500, 94.2225]
    ],
    hotspotsCount: 2,
    lastScanned: '2 hrs ago'
  },
  {
    id: 'SEC-4B',
    name: 'Section 4B (Clone TV-1 Heritage)',
    estateId: 'tocklai-exp',
    areaHa: 12.6,
    bushes: 16800,
    pruningStatus: 'Unpruned (UP)',
    healthIndex: 0.61,
    status: 'critical',
    infestationRate: 24.8,
    dominantPest: 'Helopeltis theivora (Tea Mosquito Bug)',
    coordinates: [
      [26.7515, 94.2270],
      [26.7535, 94.2320],
      [26.7490, 94.2335],
      [26.7475, 94.2285]
    ],
    hotspotsCount: 14,
    lastScanned: '45 mins ago'
  },
  {
    id: 'SEC-4C',
    name: 'Section 4C (Clone TV-29 High-Yield)',
    estateId: 'tocklai-exp',
    areaHa: 9.8,
    bushes: 13400,
    pruningStatus: 'Deep Skiffed (DS)',
    healthIndex: 0.74,
    status: 'warning',
    infestationRate: 11.5,
    dominantPest: 'Oligonychus coffeae (Red Spider Mite)',
    coordinates: [
      [26.7475, 94.2225],
      [26.7490, 94.2285],
      [26.7450, 94.2295],
      [26.7435, 94.2235]
    ],
    hotspotsCount: 6,
    lastScanned: '1 hr ago'
  },
  {
    id: 'SEC-5A',
    name: 'Section 5A (Organic Block B)',
    estateId: 'tocklai-exp',
    areaHa: 7.2,
    bushes: 9600,
    pruningStatus: 'Medium Pruned (MP)',
    healthIndex: 0.92,
    status: 'healthy',
    infestationRate: 1.8,
    dominantPest: 'Negligible',
    coordinates: [
      [26.7500, 94.2165],
      [26.7530, 94.2210],
      [26.7475, 94.2225],
      [26.7450, 94.2180]
    ],
    hotspotsCount: 1,
    lastScanned: '3 hrs ago'
  }
];

export const PEST_SPECIES = [
  {
    id: 'helopeltis',
    commonName: 'Tea Mosquito Bug',
    scientificName: 'Helopeltis theivora Waterhouse',
    order: 'Hemiptera: Miridae',
    severity: 'High / Critical',
    symptoms: 'Circular water-soaked necrotic brown patches on tender leaves, shoots, and buds. In heavy attacks, shoots dry up (cankerous lesions), causing "die-back".',
    etl: '5% infested bushes / shoots in plucking table',
    traRecommendation: 'Spot-spray Neem extract / Thiamethoxam 25% WG @ 100g/ha in early mornings. Follow 7-day PHI.',
    mrlPpmEU: 0.05,
    mrlPpmFSSAI: 0.1,
    confidenceAvg: 94.6,
    detectedImages: [
      {
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
        caption: 'Necrotic feeding punctures on flush shoots'
      }
    ]
  },
  {
    id: 'red-spider-mite',
    commonName: 'Red Spider Mite',
    scientificName: 'Oligonychus coffeae Nietner',
    order: 'Acari: Tetranychidae',
    severity: 'Moderate to High',
    symptoms: 'Bronzing and rusty red discoloration along midribs of mature upper leaves. Severe webbing, premature defoliation, and halted photosynthesis.',
    etl: '4 mites per leaf or 10% affected leaves',
    traRecommendation: 'Spot-spray wettable sulfur 80% WDG or Spiromesifen 22.9% SC. Follow 10-day PHI.',
    mrlPpmEU: 0.02,
    mrlPpmFSSAI: 0.05,
    confidenceAvg: 91.2,
    detectedImages: [
      {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        caption: 'Severe foliar bronzing on mature canopy'
      }
    ]
  },
  {
    id: 'looper',
    commonName: 'Tea Looper Caterpillar',
    scientificName: 'Hyposidra talaca Walker',
    order: 'Lepidoptera: Geometridae',
    severity: 'High / Defoliator',
    symptoms: 'Rapid skeletonization and marginal leaf notch feeding. Voracious caterpillars consume entire flush shoots within 48 hours.',
    etl: '1 caterpillar per 5 bushes',
    traRecommendation: 'Microbial bio-agent Beauveria bassiana or Emamectin Benzoate 5% SG. Follow 5-day PHI.',
    mrlPpmEU: 0.01,
    mrlPpmFSSAI: 0.05,
    confidenceAvg: 96.1,
    detectedImages: [
      {
        url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
        caption: 'Foliar skeletonization on top plucking canopy'
      }
    ]
  }
];

export const DETECTED_HOTSPOTS = [
  {
    id: 'HS-101',
    sectionId: 'SEC-4B',
    lat: 26.7512,
    lng: 94.2295,
    pestId: 'helopeltis',
    pestName: 'Helopeltis theivora',
    confidence: 96.4,
    stage: 'Stage 2 (Active Lesions)',
    affectedRadiusMeters: 4.5,
    severity: 'High',
    bushCount: 18,
    spotSprayVolumeL: 1.8,
    status: 'Pending Spray',
    timestamp: '10:14 AM'
  },
  {
    id: 'HS-102',
    sectionId: 'SEC-4B',
    lat: 26.7521,
    lng: 94.2308,
    pestId: 'helopeltis',
    pestName: 'Helopeltis theivora',
    confidence: 93.8,
    stage: 'Stage 3 (Die-back Punctures)',
    affectedRadiusMeters: 6.0,
    severity: 'Critical',
    bushCount: 32,
    spotSprayVolumeL: 3.2,
    status: 'Pending Spray',
    timestamp: '10:17 AM'
  },
  {
    id: 'HS-103',
    sectionId: 'SEC-4B',
    lat: 26.7498,
    lng: 94.2315,
    pestId: 'red-spider-mite',
    pestName: 'Red Spider Mite',
    confidence: 89.5,
    stage: 'Stage 2 (Canopy Bronzing)',
    affectedRadiusMeters: 5.0,
    severity: 'Moderate',
    bushCount: 22,
    spotSprayVolumeL: 2.2,
    status: 'Pending Spray',
    timestamp: '10:21 AM'
  },
  {
    id: 'HS-104',
    sectionId: 'SEC-4B',
    lat: 26.7485,
    lng: 94.2290,
    pestId: 'looper',
    pestName: 'Looper Caterpillar',
    confidence: 97.2,
    stage: 'Stage 1 (Leaf Notching)',
    affectedRadiusMeters: 3.8,
    severity: 'Moderate',
    bushCount: 14,
    spotSprayVolumeL: 1.4,
    status: 'Pending Spray',
    timestamp: '10:24 AM'
  },
  {
    id: 'HS-105',
    sectionId: 'SEC-4C',
    lat: 26.7460,
    lng: 94.2260,
    pestId: 'red-spider-mite',
    pestName: 'Red Spider Mite',
    confidence: 92.1,
    stage: 'Stage 1 (Foliar Stippling)',
    affectedRadiusMeters: 4.0,
    severity: 'Moderate',
    bushCount: 16,
    spotSprayVolumeL: 1.6,
    status: 'Pending Spray',
    timestamp: '10:45 AM'
  }
];

export const DRONE_FLEET = [
  {
    id: 'DRN-SCOUT-01',
    name: 'AeroScout Pro-X4',
    role: 'Canopy Multispectral & RGB Survey',
    model: 'Quadcopter Survey UAV',
    status: 'Standby / Ready',
    battery: 94,
    payload: '5-Band Multispectral + 48MP RGB',
    altitudeLimitM: 120,
    flightSpeedMs: 7.5,
    gnss: 'Dual RTK-GNSS (Centimeter Precision)',
    dgcaUIN: 'UIN-AGRI-2026-AS-0914'
  },
  {
    id: 'DRN-SPRAY-01',
    name: 'HexaSpray VRA-16',
    role: 'Targeted Variable-Rate Spot Sprayer',
    model: 'Agricultural Hexacopter',
    status: 'Armed / Ready for Mission',
    battery: 88,
    tankCapacityL: 16.0,
    tankCurrentL: 14.5,
    nozzleType: '4x PWM High-Frequency Solenoid Nozzles',
    dropletVMDMicrons: '180–220 µm (Anti-Drift)',
    flowRateLMin: 1.2,
    gnss: 'Dual RTK + Millimeter Wave Radar',
    dgcaUIN: 'UIN-AGRI-2026-AS-0988'
  }
];

export const MRL_LEDGER = [
  {
    chemical: 'Thiamethoxam 25% WG',
    targetPest: 'Helopeltis theivora',
    applicationMethod: 'Targeted Spot-Spray (PWM Nozzle)',
    lastSprayedSection: 'SEC-4B',
    dosageAppliedHa: '32 g a.i./ha (72% reduction vs 100g blanket)',
    dateApplied: '2026-11-20',
    phiDays: 7,
    safeHarvestDate: '2026-11-27',
    euMrlStatus: 'COMPLIANT (Estimated residue <0.02 ppm, Limit: 0.05 ppm)',
    fssaiStatus: 'PASS',
    exportReadinessScore: 98
  },
  {
    chemical: 'Spiromesifen 22.9% SC',
    targetPest: 'Red Spider Mite',
    applicationMethod: 'Targeted Spot-Spray (PWM Nozzle)',
    lastSprayedSection: 'SEC-4C',
    dosageAppliedHa: '28 ml/ha (65% reduction vs 80ml blanket)',
    dateApplied: '2026-11-18',
    phiDays: 10,
    safeHarvestDate: '2026-11-28',
    euMrlStatus: 'COMPLIANT (Estimated residue <0.01 ppm, Limit: 0.02 ppm)',
    fssaiStatus: 'PASS',
    exportReadinessScore: 96
  },
  {
    chemical: 'Beauveria bassiana (Bio-agent)',
    targetPest: 'Looper Caterpillar',
    applicationMethod: 'Targeted Spot-Spray (Organic)',
    lastSprayedSection: 'SEC-5A',
    dosageAppliedHa: '1.2 kg/ha (Spot targeting)',
    dateApplied: '2026-11-21',
    phiDays: 0,
    safeHarvestDate: 'Immediate',
    euMrlStatus: 'EXEMPT / ORGANIC CERTIFIED',
    fssaiStatus: 'PASS',
    exportReadinessScore: 100
  }
];
