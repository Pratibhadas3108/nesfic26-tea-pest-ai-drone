export const BASE_URL = 'https://nesfic26-tea-pest-ai-drone.pages.dev';

export const APP_ROUTES = {
  landing: {
    path: '/',
    title: 'AeroPest-Tea | AI Drone Pest Detection & Spot-Spraying in Assam | TeaTech Labs',
    description:
      'AeroPest-Tea by TeaTech Labs (Lead Applicant: Pratibha Das Hatibaruah) is an AI-driven drone crop protection and targeted spot-spraying platform for Assam tea plantations under NESFIC-I-07.',
  },
  'gis-map': {
    path: '/assam-tea-gis-mission-map',
    title: 'Assam Tea GIS Mission Map & RTK Telemetry | AeroPest-Tea Jorhat',
    description:
      'Interactive georeferenced GIS mission map for Assam tea estates (Jorhat, Dibrugarh, Tezpur) with RTK-fix drone telemetry and pest hotspot layers.',
  },
  'ai-studio': {
    path: '/ai-tea-pest-detection-studio',
    title: 'AI Tea Pest Detection Studio (YOLOv11x) | Helopeltis & Red Spider Mite',
    description:
      'Edge AI computer vision diagnostics detecting Helopeltis theivora, Red Spider Mite, and Looper Caterpillar in Assam tea canopies using 48MP drone imagery.',
  },
  'spray-planner': {
    path: '/drone-spot-spraying-vra-planner',
    title: 'Variable-Rate Drone Spot-Spraying (VRA) Planner | AeroPest-Tea',
    description:
      'Generate centimeter-accurate PWM solenoid variable-rate spot-spraying drone missions reducing chemical usage by 68.4% in Assam tea gardens.',
  },
  compliance: {
    path: '/tra-tocklai-mrl-compliance-ledger',
    title: 'TRA Tocklai MRL & EU Export Compliance Ledger | AeroPest-Tea Assam',
    description:
      'Automated Pre-Harvest Interval (PHI) tracking and EU/FSSAI Maximum Residue Limit (MRL) compliance certificates aligned with TRA Tocklai Plant Protection Code.',
  },
  admin: {
    path: '/estate-admin-console',
    title: 'Tea Estate Admin Console & ₹40L Grant Budget | AeroPest-Tea',
    description:
      'Enterprise fleet management, DGCA Green Zone telemetry, TRA Tocklai role access, and NESFIC-I-07 ₹40 Lakhs grant budget allocation.',
  },
  proposal: {
    path: '/nesfic-i-07-proposal-dossier',
    title: 'NESFIC-I-07 Proposal Dossier & Proof of Work PDFs | TeaTech Labs Assam',
    description:
      'Complete 12-section NESFIC-I-07 Startup Assam proposal dossier, Proof of Work PDFs, technical architecture, and ₹40L budget breakdown.',
  },
  tutorial: {
    path: '/how-to-use-aeropest-tea-tutorial',
    title: 'Tutorial: What AeroPest-Tea Does & How to Use It | TeaTech Labs',
    description:
      'Step-by-step interactive guide explaining what AeroPest-Tea does and how Assam tea planters use GIS mapping, AI pest diagnostics, VRA spot-spraying, and MRL compliance.',
  },
};

export function getTabFromPath(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  for (const [tab, meta] of Object.entries(APP_ROUTES)) {
    if (meta.path === clean) return tab;
  }
  return 'landing';
}
