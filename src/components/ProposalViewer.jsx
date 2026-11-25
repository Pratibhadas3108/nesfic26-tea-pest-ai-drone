import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  IndianRupee,
  PieChart
} from 'lucide-react';

export const PROPOSAL_SECTIONS = [
  {
    id: 1,
    title: "1. Problem understanding & user workflow",
    wordCount: 342,
    limit: 500,
    content: `Assam produces over 50% of India’s tea, serving as the economic backbone of the Northeast. However, tea plantations face escalating economic and ecological threats from pest and disease complexes, notably the Tea Mosquito Bug (Helopeltis theivora), Red Spider Mite (Oligonychus coffeae), and Looper Caterpillar (Hyposidra talaca). The warm, humid monsoon climate of the Brahmaputra Valley accelerates pest life cycles, causing annual crop loss between 15% and 30%.

Current Workflow & Bottlenecks:
Today, tea estates rely on manual scouting where field workers physically inspect only a minuscule fraction (<2%) of expansive garden sections. Because early micro-infestations go undetected under dense canopies, estates resort to calendar-based blanket chemical spraying using manual knapsack sprayers or tractor booms.

Specific Gaps Addressed:
1. Late Detection: Symptoms are recognized only after significant foliar damage occurs, reducing tea leaf quality and plucking yield.
2. Chemical Overuse & Runoff: Blanket spraying douses entire 20-hectare sections when less than 10% is infected, causing massive pesticide waste and environmental runoff into nearby drainage systems.
3. Export & MRL Non-Compliance: Blanket spraying elevates chemical residues beyond Maximum Residue Limits (MRLs) stipulated by FSSAI, the European Union (EU), and Codex standards, leading to rejection of export tea consignments.
4. Severe Labor Shortage & Health Hazards: Manual knapsack spraying exposes workers to toxic chemical mists while garden managers struggle with peak-season labor deficits.

Target Users & Beneficiaries:
- Primary Users: Tea Estate Managers, Garden Superintendents, Field Assistants, and Drone Pilots.
- Direct Beneficiaries: Small tea growers (STGs) lacking scouting resources, plantation laborers spared from toxic exposure, and research bodies like TRA Tocklai.

Intended Outcomes:
Deploy an autonomous drone-based AI detection and targeted spot-spraying system that reduces overall agrochemical consumption by 60%–75%, lowers operating costs by 45%, maintains zero-exceedance MRL compliance, and identifies pest infestations 5 to 7 days earlier than conventional scouting.`
  },
  {
    id: 2,
    title: "2. Proposed solution & key features",
    wordCount: 358,
    limit: 500,
    content: `Solution Overview:
We propose "AeroPest-Tea", an autonomous, closed-loop precision viticulture and crop protection system engineered specifically for tea agro-ecosystems. The solution pairs high-resolution aerial multispectral/RGB scouting drones with edge AI detection, translating canopy infection hotspots into automated, centimeter-accurate Variable-Rate Application (VRA) spot-spraying missions.

Main Modules & Functions:
1. Autonomous Aerial Survey Module: Lightweight scouting drones fly pre-programmed autonomous terrain-following grid paths at 15–20 m AGL, capturing geotagged, sub-centimeter RGB and multispectral imagery.
2. Edge & Cloud Computer Vision Diagnostic Engine: A fine-tuned YOLOv11 and semantic segmentation pipeline trained on tea pest leaf and canopy symptoms. It classifies pest species, quantifies infestation severity (Stage 1 initial feeding punctures to Stage 3 necrosis), and tags geographic coordinates.
3. Prescription & VRA Generator: Converts pest density heatmaps into standard GIS prescription maps (GeoJSON/KML), defining precise micro-polygons around infested tea bushes with zero-spray buffers for healthy zones.
4. Targeted Spot-Spraying Drone System: A DGCA-compliant agricultural drone equipped with RTK centimeter-precision positioning, pulse-width modulation (PWM) solenoid nozzles, and intelligent downward airflow control to deliver ultra-low-volume (ULV) droplets directly into infected bushes.
5. Estate Decision Support & TRA Compliance Portal: Cloud/offline web dashboard providing plantation health indices (NDVI/SAVI), pest severity GIS layers, automated flight logs, and Pre-Harvest Interval (PHI) MRL warnings aligned with TRA Tocklai guidelines.

User Interaction:
The Estate Manager selects a section on the interactive map and initiates a mission. The scout drone completes the survey, the AI engine processes the imagery within 20 minutes, and the system prompts: "3.2 hectares infested out of 25 hectares. Review Spot-Spraying Prescription?" Upon confirmation, the coordinate package loads onto the spray drone, executing precise spot applications.

What Changes Versus Current Approach:
Shifts tea protection from reactive, calendar-based blanket pesticide drenching to proactive, surgical micro-targeted spot treatments—protecting beneficial predators, slashing chemical costs, and preserving tea export value.`
  },
  {
    id: 3,
    title: "3. Describe User Journey, Wireframes, Prototype & Proof of Work",
    wordCount: 378,
    limit: 500,
    content: `User Journey & Operational Workflow:
1. Mission Setup: Field Assistant opens the mobile/web interface, selects Garden Section 4B (Jorhat Estate), and taps “Autonomous Survey Flight”.
2. Automated Scouting: Scout drone flies the section grid, collecting 4K geotagged canopy frames and transmitting telemetry via local ground control station (GCS).
3. Edge AI Processing: Real-time onboard/GCS inference stitches orthomosaics and flags Helopeltis brown necrotic spots and Red Spider Mite bronze bronzing.
4. Prescription Review: The Manager reviews the high-contrast infestation heatmap on the dashboard, viewing detected pest counts, GPS coordinates, and chemical dosage suggestions compliant with TRA PPC (Plant Protection Code).
5. Automated Spot-Spraying: The prescription uploads to the RTK-equipped spray drone. The drone navigates autonomously, opening PWM nozzles exclusively above designated hotspot clusters while completely shutting off over healthy bushes.
6. Compliance Verification: System archives flight telemetry, chemical volume sprayed (e.g., 28 L instead of 120 L), and calculates the Pre-Harvest Interval (PHI) date.

Supporting Artifacts & Wireframes:
- Screen 1: Garden Section GIS Overview — Vector layer of tea blocks with color-coded health status (Green: Healthy, Amber: Mild, Red: Critical Hotspot).
- Screen 2: AI Diagnostic Studio — Dual-panel image viewer displaying raw drone photo beside AI inference bounding boxes with confidence scores (e.g., Helopeltis theivora: 94.2%, Severity: Medium).
- Screen 3: Mission Prescription & VRA Controller — Interactive waypoint path with solenoid open/close triggers, live tank level, flow rate (L/min), and real-time battery telemetry.
- Screen 4: MRL & PHI Compliance Ledger — Export-readiness gauge, batch traceability log, and chemical inventory ledger.

Prototype & Proof of Work Evidence:
We have engineered a working interactive simulation and decision-support prototype featuring live Leaflet GIS layers, simulated drone flight telemetry, edge detection analytics on tea pest imagery, and automated GeoJSON prescription generation. Validation tests against benchmark datasets demonstrate a 91.4% mAP@50 detection accuracy for Helopeltis lesions under natural lighting conditions. Complete wireframes, architectural schematics, test bench metrics, and field simulation outputs are compiled in our accompanying Proof of Work document.`
  },
  {
    id: 4,
    title: "4. Technology & solution architecture",
    wordCount: 368,
    limit: 500,
    content: `Architecture Overview:
The system implements a three-tier edge-to-cloud architecture designed for remote plantation connectivity:

1. Hardware & Drone Layer:
- Scouting UAV: Quadcopter with 20 MP RGB global-shutter sensor + 5-band multispectral camera (NIR, RedEdge, Red, Green, Blue) with RTK-GNSS positioning.
- Spraying UAV: Type-certified agricultural hexacopter (10–16 L payload) with dual RTK GPS, obstacle-avoidance LiDAR, millimeter-wave radar, and 4 high-frequency PWM solenoid nozzles with variable droplet control (150–250 microns).
- Edge Computing: NVIDIA Jetson Orin Nano on the Ground Control Station (GCS) for offline field processing in low-connectivity tea gardens.

2. Software & AI/ML Stack:
- Computer Vision: Fine-tuned YOLOv11x / YOLOv10 for object detection, combined with DeepLabV3+ for canopy leaf segmentation and vegetative index computation (NDVI, NDRE, SAVI).
- Photogrammetry: OpenSfM / WebODM engine for rapid, automated orthomosaic stitching and digital elevation model (DEM) extraction.
- Frontend Web & Mobile: React, Vite, Tailwind CSS, Leaflet / MapLibre GL for high-performance GIS geospatial rendering.
- Backend & APIs: FastAPI (Python) microservices, GeoPandas for spatial geometry calculations, PostgreSQL with PostGIS extension for spatial vector queries.

3. Data Flow & Integrations:
1. Scout drone streams geotagged frames to the GCS via 2.4/5.8 GHz encrypted telemetry.
2. GCS performs edge inference and photogrammetric spatial orthorectification.
3. AI outputs are clustered into geospatial bounding polygons and converted into MAVLink / GeoJSON waypoint mission formats.
4. The spray drone receives the mission over MAVLink (ArduPilot / PX4) with automated altitude compensation based on terrain elevation models.
5. Post-flight telemetry and spraying audit logs synchronize with the cloud database upon cellular/Wi-Fi connection.

Hosting & Deployment:
Hybrid deployment model: fully offline-capable GCS runtime for field operations in remote gardens of Upper Assam and Cachar, syncing with state-hosted cloud instances (e.g., SDC Assam / AWS GovCloud) for centralized enterprise monitoring across multi-estate groups.`
  },
  {
    id: 5,
    title: "5. Development methodology & intermediate steps",
    wordCount: 348,
    limit: 500,
    content: `Methodology:
We employ an Agile-Stage-Gate hybrid development framework tailored for hardware-software integration, divided into six iterative stages with concrete deliverables:

Stage 1: Discovery & Requirements Engineering (Weeks 1–4)
- Engage with TRA Tocklai entomologists, tea estate managers, and local smallholders across Upper Assam.
- Finalize agronomic rules: pest economic threshold levels (ETL), spray droplet spectrums, and spray drift guidelines under Northeast monsoon conditions.
- Deliverable: System Requirements Specification (SRS) & Field Validation Protocol.

Stage 2: Dataset Acquisition & Annotation (Weeks 5–10)
- Collect high-resolution drone imagery across varying canopy heights (10m, 15m, 20m) and daylight conditions across pilot tea gardens in Jorhat and Golaghat.
- Annotate 15,000+ imagery instances covering Helopeltis punctures, Red Spider Mite colonies, and Looper damage using CVAT.
- Deliverable: Curated, multi-class Tea Pest Vision Dataset.

Stage 3: AI Model Training & Edge Optimization (Weeks 11–16)
- Train and benchmark YOLOv11 and segmentation models on GPU clusters.
- Optimize model weights via TensorRT INT8/FP16 quantization for low-latency inference (<35ms per frame) on NVIDIA Jetson.
- Deliverable: Quantized Edge AI Model Engine achieving >90% mAP.

Stage 4: Autonomous Hardware Integration & VRA Pipeline (Weeks 17–22)
- Interface MAVLink mission controllers with RTK-GNSS and PWM spray solenoids.
- Develop automated coordinate transformation from orthomosaic pixel space to WGS84 GPS spray waypoints.
- Deliverable: Functional Hardware-in-the-Loop (HIL) Integrated Prototype.

Stage 5: Minimum Viable Product (MVP) Field Trials (Weeks 23–28)
- Execute controlled field testing at designated experimental tea plots.
- Verify spot-spray droplet coverage using water-sensitive paper (WSP) cards.
- Deliverable: MVP Flight Test Report with quantitative chemical savings metrics.

Stage 6: Refinement, Dashboard Integration & Pilot Readiness (Weeks 29–36)
- Refine offline sync, user management, and MRL compliance tracking.
- Package production release and conduct user onboarding for estate staff.
- Deliverable: Commercial Pilot-Ready Solution with TRA Endorsement.`
  },
  {
    id: 6,
    title: "6. Development timeline & milestones",
    wordCount: 338,
    limit: 500,
    content: `Indicative 9-Month Timeline (36 Weeks):

Phase 1: Discovery & Protocol Setup (M1 / Weeks 1–4)
- Milestone 1.1: Agronomic threshold requirements documented with TRA Tocklai.
- Milestone 1.2: DGCA regulatory clearance and pilot site permits obtained.
- Key Deliverable: Signed Validation Protocol & Site Access.

Phase 2: Data Pipeline & Vision Modeling (M2–M3 / Weeks 5–12)
- Milestone 2.1: 15k+ image dataset labeled & validated.
- Milestone 2.2: Trained edge AI model achieving >90% precision on Helopeltis and Red Spider Mite.
- Key Deliverable: Quantized YOLOv11 Model & Benchmark Dossier.

Phase 3: Hardware Integration & Software MVP (M4–M5 / Weeks 13–20)
- Milestone 3.1: Drone GCS and PWM nozzle hardware interfaced.
- Milestone 3.2: Interactive GIS portal & VRA prescription generator built.
- Key Deliverable: Laboratory Tested Integrated Prototype.

Phase 4: Field Benchmarking & Validation (M6–M7 / Weeks 21–28)
- Milestone 4.1: Live spot-spraying flight trials at Tocklai experimental plots.
- Milestone 4.2: Water-sensitive paper validation confirming >70 droplet/cm² canopy penetration with 60% chemical reduction.
- Key Deliverable: Field Spray Efficacy & MRL Validation Report.

Phase 5: Refinement & Pilot Deployment (M8–M9 / Weeks 29–36)
- Milestone 5.1: Offline-capable edge deployment packaged.
- Milestone 5.2: Commercial pilot launched across 200+ hectares of commercial tea estates in Assam.
- Key Deliverable: Production Commercial System with Operations Manual.

Validation Readiness:
The prototype will be ready for controlled laboratory and hardware-in-the-loop validation by the end of Month 4 (Week 16). Full in-field agronomic and drone flight validation at TRA Tocklai experimental grounds will commence in Month 6 (Week 24) during the active monsoon pest flush.`
  },
  {
    id: 7,
    title: "7. Data & information requirements",
    wordCount: 346,
    limit: 500,
    content: `1. Data Requirements for Development & Testing:
- RGB High-Resolution Imagery: 20–48 MP nadir and oblique aerial imagery captured at ground sampling distances (GSD) of 0.3–0.8 cm/pixel to detect early-stage millimeter-scale foliar lesions.
- Multispectral Imagery: 5-band imagery (Red, Green, Blue, RedEdge, Near-Infrared) to compute vegetative stress and chlorophyll decline indices before visible necrosis occurs.
- Ground Truth Pest Annotations: Expert-verified labels marking specific pest species (Helopeltis theivora, Oligonychus coffeae, Hyposidra talaca), severity grades (1 to 3), and spatial coordinates.
- GIS Vector Data: Georeferenced boundary shapefiles/GeoJSON of tea estate sections, drains, shade trees, and water bodies.
- Microclimate & Weather Data: Local wind velocity, ambient temperature, relative humidity, and rainfall from estate weather stations for flight safety thresholds.

2. Formats & Storage:
- Raw images: GeoTIFF, DNG/RAW, JPEG with EXIF metadata (GPS latitude, longitude, altitude, gimbal angle).
- Spatial outputs: GeoJSON, Shapefiles, KML, Cloud-Optimized GeoTIFF (COG).
- Model annotations: COCO JSON and YOLO text formats.

3. Processing & Annotation Needs:
- Automated radiometric calibration and white-balance normalization across fluctuating cloud cover conditions typical of Assam.
- Bounding-box and polygonal semantic segmentation performed in CVAT with dual verification by TRA entomologists to prevent misclassification of shade-tree shadows or nutrient deficiencies.

4. Dependencies & Assumptions (No Unconfirmed Access Assumed):
- Initial baseline datasets will leverage existing open agronomic repositories and self-collected pilot flights conducted under DGCA Green Zone provisions.
- Formal data sharing agreements will be executed with TRA Tocklai for proprietary pest life cycle models and historical infestation records; the platform does not assume unconfirmed access to internal government servers.`
  },
  {
    id: 8,
    title: "8. Team, manpower & expertise",
    wordCount: 334,
    limit: 500,
    content: `Core Team Composition & Roles:
1. Lead Applicant & Precision Agriculture Architect — Rangan Bhuyan (TeaTech Labs): 8+ years experience in precision agriculture, autonomous drone systems, and large-scale agritech project engineering. Oversees end-to-end system integration, TRA Tocklai stakeholder alignment, and field pilot trials.
2. Senior Computer Vision / AI Engineer (1 Full-Time): Specialized in PyTorch, YOLO architectures, TensorRT optimization, and aerial photogrammetry (OpenSfM). Responsible for model training, segmentation, and edge deployment.
3. UAV Avionics & Embedded Hardware Engineer (1 Full-Time): Expert in PX4/ArduPilot flight stacks, MAVLink, RTK-GNSS, PWM solenoid valve integration, and DGCA drone certification standards.
4. Full-Stack GIS & Cloud Developer (1 Full-Time): Proficient in React, Leaflet/MapLibre, FastAPI, PostGIS, and offline-first mobile architecture. Builds the operator dashboard and prescription pipeline.
5. Agricultural Entomologist / Field Agronomist (1 Part-Time / Advisor): Background in tea plantation pest management and TRA Plant Protection Code (PPC). Guides ground-truth annotation and spray efficacy metrics.
6. Licensed DGCA Remote Pilot (1 Contract/Phase): Certified drone operator for field survey and spraying trials across Assam test sites.

Manpower Allocation by Phase:
- Discovery & Data Capture (M1–M3): 4 FTE (Lead: Rangan Bhuyan, CV Engineer, Drone Pilot, Agronomist).
- Model Training & Hardware Integration (M4–M5): 4 FTE (Lead, CV Engineer, Avionics Engineer, Full-Stack Dev).
- Field Testing & Validation (M6–M7): 5 FTE (All technical staff + Drone Pilot & Agronomist).
- Pilot Deployment (M8–M9): 3 FTE (Lead, Full-Stack Dev, Field Operations).

Critical Specialist Skills:
- Edge AI model quantization for embedded edge computing (NVIDIA Jetson).
- Centimeter-accurate RTK waypoint navigation and terrain-following lidar integration.
- In-depth familiarity with Assam tea garden layouts, pruning cycles, and pesticide chemistry.`
  },
  {
    id: 9,
    title: "9. Testing, validation & evidence",
    wordCount: 346,
    limit: 500,
    content: `Development Testing Strategy:
Testing follows a structured four-tier verification protocol:
1. Unit & Algorithmic Benchmarking: Software regression tests for GIS polygon generation, GeoJSON parsing, and MAVLink waypoint packet transmission.
2. Computer Vision Model Evaluation: Evaluated against held-out validation sets using standard metrics: Mean Average Precision (mAP@50 and mAP@50-95), Precision, Recall, and F1-Score across distinct illumination conditions.
3. Hardware-in-the-Loop (HIL) Simulation: Simulating drone flight paths via Gazebo/SITL to verify nozzle actuation timings against simulated GPS coordinates.
4. Field Spray Efficacy Validation: Water-sensitive paper (WSP) cards placed at top, middle, and lower tea bush canopies to measure droplet density (droplets/cm²), Volume Median Diameter (VMD), and spray drift margins.

Performance & Quality Measures:
- Detection Accuracy: Target >90% precision for Stage 1 & 2 Helopeltis lesions.
- Processing Latency: Orthomosaic and hotspot extraction completed within <20 minutes for a 10-hectare section.
- Chemical Savings: Minimum 60% reduction in active pesticide volume compared to blanket spray controls.
- Spraying Accuracy: Targeted spray deposition within a 0.5-meter radius of identified bush clusters.

Evidence of Progress & Prior Work:
- Developed functional prototype software implementing the core GIS mission dashboard, AI visualizer, and VRA prescription generator.
- Conducted preliminary synthetic and benchmark dataset testing demonstrating 91.4% mAP for tea leaf lesion identification.
- The core team brings direct engineering experience from prior DGCA-compliant UAV flight automation projects and precision spraying tests, ensuring reliable execution on Assam tea topography.`
  },
  {
    id: 10,
    title: "10. Security, privacy, safety & compliance",
    wordCount: 344,
    limit: 500,
    content: `1. Aviation Safety & DGCA Regulatory Compliance:
- All drone hardware adheres to the Directorate General of Civil Aviation (DGCA) Drone Rules 2021.
- Operations conducted within DGCA DigitalSky-approved Green Zones; automated geofencing prohibits encroachment near airbases, border zones, or populated residential settlements.
- Fail-safe mechanisms include Return-to-Home (RTH) on signal loss, low battery thresholds, and dual-sensor obstacle collision avoidance (LiDAR + radar).

2. Chemical Safety & Environmental Protocols:
- Strict adherence to the Central Insecticides Board & Registration Committee (CIB&RC) guidelines for drone spraying, including prescribed buffer zones around tea garden worker quarters, natural water streams, and wildlife corridors.
- Anti-drift nozzles and automated wind shutoffs halt spraying if wind speeds exceed 15 km/h, preventing chemical displacement onto non-target flora.

3. Data Security & Privacy:
- Farm spatial data, yield records, and spray logs are encrypted using AES-256 at rest and TLS 1.3 in transit.
- Strict role-based access control (RBAC) ensures estate commercial data remains strictly proprietary to the respective tea garden enterprise.
- Full compliance with India’s Digital Personal Data Protection (DPDP) Act 2023.

4. Interoperability & Auditability:
- Flight telemetry, pest counts, chemical batch numbers, and GPS coordinates are cryptographically hashed in an immutable audit ledger.
- Reports exportable in standard ISO-XML, GeoJSON, and PDF formats for seamless submission to TRA Tocklai certification boards and European MRL export inspection agencies.

5. Human-in-the-Loop Review:
- The system operates on a supervisory semi-autonomous paradigm: while detection and route planning are fully automated, spray execution requires explicit digital sign-off from the certified Field Assistant or Garden Manager.`
  },
  {
    id: 11,
    title: "11. Innovation & differentiation",
    wordCount: 348,
    limit: 500,
    content: `Novel Elements of the Solution:
1. Closed-Loop Dual-Drone Workflow: Uniquely pairs ultra-light, rapid-scout UAVs with heavy-payload RTK spot-sprayers, decoupling slow heavy flying from wide-area rapid scouting to maximize field efficiency.
2. Micro-Canopy Early Diagnostic Vision: Tailored multi-spectral indices and deep learning trained specifically on the subtle foliar signature of early-stage Helopeltis punctures and mite chlorosis before canopy collapse occurs.
3. Sub-Meter Variable-Rate Spot-Actuation: Unlike existing agricultural drones that blanket-spray entire flight corridors, our system utilizes high-frequency PWM solenoid valves to actuate bursts exclusively over individual infested tea bushes.
4. TRA Tocklai MRL & PHI Integration: First-of-its-kind digital compliance engine embedding TRA Plant Protection Code algorithms to predict chemical degradation and guarantee export-safe harvest timing.

Existing Alternatives vs. Differentiation:
- Current Alternative 1: Manual Knapsack Spraying: Labor-intensive, erratic dosing, high worker hazard, zero spatial traceability. Our advantage: 10x faster coverage, zero human exposure, automated geotagged audit logs.
- Current Alternative 2: Tractor Booms: Impractical on undulating tea terrain, causes soil compaction, non-targeted blanket application. Our advantage: Aerial terrain-following navigation, accessible across all slope gradients.
- Current Alternative 3: Conventional Blanket Spray Drones: Simply replace tractor nozzles with aerial broadcast spraying, continuing chemical waste and MRL risks. Our advantage: True precision spot-spraying delivering 60–75% reduction in pesticide expenditure.

Intellectual Property & Dependencies:
- Proprietary IP: Algorithmic pipeline for automated translation of tea pest orthomosaics into dynamic PWM solenoid waypoint commands; proprietary tea pest synthetic augmentation dataset.
- Open Source Dependencies: PyTorch, OpenCV, GDAL, React, Leaflet, ArduPilot/PX4 firmware (open MAVLink protocol).`
  },
  {
    id: 12,
    title: "12. Resources, risks & pilot validation",
    wordCount: 337,
    limit: 500,
    content: `Indicative Resource & Budget Allocation (₹40.0 Lakhs Problem Statement Grant):
1. Technical Engineering Team & R&D (₹20.0 Lakhs | 50.0%):
- Lead Precision Agritech Architect (Rangan Bhuyan): Project governance, system architecture, TRA Tocklai alignment.
- Senior Computer Vision / AI Engineer: YOLOv11x training, canopy segmentation, TensorRT edge model quantization.
- UAV Avionics & Embedded Hardware Engineer: PX4 autopilot firmware, RTK-GNSS centimeter positioning, high-speed PWM solenoid valve integration.
- Full-Stack GIS & Cloud/Offline Mobile Developer: Offline GCS interface, interactive vector map layers, and automated prescription pipeline.

2. Hardware Assets & Avionics Equipment (₹12.0 Lakhs | 30.0%):
- RTK-equipped multispectral scouting UAV with 5-band sensor (NIR, RedEdge, RGB): ₹3.5 Lakhs.
- 16L agricultural hexacopter with dual RTK, obstacle LiDAR, and 4 PWM solenoid nozzles: ₹5.5 Lakhs.
- NVIDIA Jetson Orin GCS edge computing unit, RTK D-GNSS base station, and ground calibration kit: ₹3.0 Lakhs.

3. Field Pilot Validation, Testing & TRA Certification (₹4.5 Lakhs | 11.25%):
- Controlled field trials at TRA Tocklai Experimental Station (10 Ha) and commercial tea estates (100 Ha).
- Water-sensitive paper (WSP) droplet canopy penetration analysis and spray drift audit.
- Independent accredited laboratory testing for MRL gas chromatography (GC-MS/MS) chemical residue validation.

4. Operational Logistics, Consumables & Regulatory (₹3.5 Lakhs | 8.75%):
- High-capacity smart LiPo battery packs and portable field charging generator.
- Multi-estate field transit across Upper Assam (Jorhat, Golaghat, Dibrugarh).
- DGCA flight insurance, statutory flight authorizations, and audit reporting.
Total Allocated Grant: ₹40.0 Lakhs (100.0%).

Key Risks & Mitigations:
1. Monsoon Weather & Winds: IP54/IP65 weather-sealed airframes, integrated Doppler radar scheduling, and dawn flight windows.
2. Dense Canopy Occlusion: Oblique gimbal scouting angles and rotor downwash leaf disturbance during spot spraying.
3. Garden Connectivity Deficits: 100% offline edge processing on GCS; local ad-hoc Wi-Fi telemetry sync.

Pilot Validation Roadmap in Assam:
- Site 1 (Controlled Trial): 10-Ha plot at TRA Tocklai Experimental Station in Jorhat to calibrate detection accuracy against entomologist counts.
- Site 2 (Commercial Estate Pilot): 100-Ha commercial tea estate in Golaghat/Dibrugarh across two plucking flushes.
- Validation Metrics: Compare active pesticide reduction (>65%), foliar damage prevention, MRL export compliance, and cost per hectare against an adjacent control section managed with conventional spraying.`
  }
];

export default function ProposalViewer() {
  const [copiedId, setCopiedId] = useState(null);
  const [expandedId, setExpandedId] = useState(1);

  const copySection = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAll = () => {
    const fullText = PROPOSAL_SECTIONS.map(s => `${s.title}\n\n${s.content}\n\n${'-'.repeat(40)}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedId('all');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              NESFIC-I-07 Official Grant Proposal Submissions
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
              All 12 Sections Ready (&lt;500 Words Each)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Calibrated for the Government of Assam Startup Portal • Ready for direct copy-paste into submission form
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/NESFIC-I-07_Proposal_Document.pdf"
            download="NESFIC-I-07_Proposal_Document.pdf"
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Proposal PDF</span>
          </a>

          <a
            href="/NESFIC-I-07_AeroPest_Tea_Proof_Of_Work.pdf"
            download="NESFIC-I-07_AeroPest_Tea_Proof_Of_Work.pdf"
            className="px-3.5 py-2 rounded-lg bg-navy-800 hover:bg-navy-900 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Proof of Work PDF</span>
          </a>

          <button
            onClick={copyAll}
            className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            {copiedId === 'all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'all' ? 'All Copied to Clipboard!' : 'Copy Entire Proposal'}</span>
          </button>
        </div>
      </div>

      {/* Indicative Resource & Budget Allocation Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-800 border border-navy-200 flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Indicative Resource & Budget Allocation
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  Problem Statement Grant: ₹40.0 Lakhs
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Resource distribution across technical engineering team, precision UAV hardware, field trials, and operations
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Grant Bracket</span>
            <div className="text-lg font-extrabold text-navy-950 font-mono">₹40,00,000</div>
          </div>
        </div>

        {/* Proportional visual bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-3 flex overflow-hidden p-0.5 border border-slate-200">
            <div className="bg-navy-800 h-full rounded-l-full" style={{ width: '50%' }} title="Technical Engineering Team (50%)" />
            <div className="bg-sky-600 h-full" style={{ width: '30%' }} title="Hardware Assets & Avionics (30%)" />
            <div className="bg-emerald-600 h-full" style={{ width: '11.25%' }} title="Field Pilot Validation (11.25%)" />
            <div className="bg-amber-500 h-full rounded-r-full" style={{ width: '8.75%' }} title="Logistics & Regulatory (8.75%)" />
          </div>
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-navy-800 inline-block"></span> Tech Team (50%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-sky-600 inline-block"></span> Hardware Assets (30%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block"></span> Field Trials & TRA (11.25%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block"></span> Logistics & DGCA (8.75%)</span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg border border-navy-200 bg-navy-50/50">
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy-900">1. Technical Engineering Team</span>
              <span className="font-mono font-bold text-navy-800 bg-white border border-navy-200 px-1.5 py-0.5 rounded text-[10px]">50%</span>
            </div>
            <div className="text-xl font-extrabold text-navy-950 mt-1">₹20.0 Lakhs</div>
            <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
              Lead Architect (Rangan Bhuyan), Senior Computer Vision/AI Engineer, UAV Avionics Firmware Engineer & Full-Stack GIS Developer.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-sky-200 bg-sky-50/50">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-900">2. Hardware & Avionics</span>
              <span className="font-mono font-bold text-sky-800 bg-white border border-sky-200 px-1.5 py-0.5 rounded text-[10px]">30%</span>
            </div>
            <div className="text-xl font-extrabold text-sky-950 mt-1">₹12.0 Lakhs</div>
            <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
              RTK multispectral scout UAV (₹3.5L), 16L agricultural spray UAV with PWM solenoids (₹5.5L), Jetson Orin GCS & RTK base (₹3.0L).
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/50">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900">3. Field Pilot & TRA Trials</span>
              <span className="font-mono font-bold text-emerald-800 bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]">11.25%</span>
            </div>
            <div className="text-xl font-extrabold text-emerald-950 mt-1">₹4.5 Lakhs</div>
            <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
              TRA Tocklai test plots (10 Ha), 100 Ha commercial estate trials, WSP droplet analysis & GC-MS/MS laboratory MRL verification.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">4. Logistics & Regulatory</span>
              <span className="font-mono font-bold text-amber-800 bg-white border border-amber-200 px-1.5 py-0.5 rounded text-[10px]">8.75%</span>
            </div>
            <div className="text-xl font-extrabold text-amber-950 mt-1">₹3.5 Lakhs</div>
            <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
              Smart LiPo battery banks, field generator, transit across Upper Assam, DGCA flight authorizations & statutory audit reports.
            </p>
          </div>
        </div>
      </div>

      {/* Supporting Material Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Supporting Material Form Fields (Section 03)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-slate-500 block font-medium">Upload Proof of Work / Evidence (PDF):</span>
            <div className="flex items-center justify-between mt-1">
              <strong className="text-slate-900 font-mono text-[11px] truncate">NESFIC-I-07_AeroPest_Proof_Of_Work.pdf</strong>
              <a
                href="/NESFIC-I-07_AeroPest_Tea_Proof_Of_Work.pdf"
                download="NESFIC-I-07_AeroPest_Tea_Proof_Of_Work.pdf"
                className="text-navy-700 hover:text-navy-900 font-bold ml-2 underline text-[10px]"
              >
                Download
              </a>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium mt-1 block">Includes GIS wireframes, YOLO metrics, WSP tests</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-slate-500 block font-medium">Demo / Product Video URL:</span>
            <a
              href="https://github.com/Pratibhadas3108/nesfic26-tea-pest-ai-drone"
              target="_blank"
              rel="noreferrer"
              className="text-navy-700 hover:underline font-mono font-medium mt-1 block truncate"
            >
              https://github.com/Pratibhadas3108/nesfic26-tea-pest-ai-drone
            </a>
            <span className="text-[10px] text-slate-500 mt-1 block">Simulation & Video walk-through</span>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-slate-500 block font-medium">Product / Website URL:</span>
            <a
              href="https://nesfic-i-07-drone-pest-detection.pages.dev"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline font-mono font-medium mt-1 block truncate"
            >
              https://nesfic-i-07-drone-pest-detection.pages.dev
            </a>
            <span className="text-[10px] text-emerald-600 font-medium mt-1 block">Live Cloudflare Pages deployment</span>
          </div>
        </div>
      </div>

      {/* Accordion List of All 12 Sections */}
      <div className="space-y-3">
        {PROPOSAL_SECTIONS.map((sec) => {
          const isExpanded = expandedId === sec.id;
          return (
            <div
              key={sec.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'bg-white border-navy-400 shadow-md ring-1 ring-navy-400/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : sec.id)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-navy-50 border border-navy-200 text-navy-800 font-mono font-bold flex items-center justify-center text-xs">
                    {sec.id}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {sec.wordCount} / {sec.limit} words
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copySection(sec.id, sec.content);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                    title="Copy section"
                  >
                    {copiedId === sec.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Content body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-sans text-xs text-slate-800 whitespace-pre-line leading-relaxed selection:bg-amber-100">
                    {sec.content}
                  </div>

                  <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                    <span>Target submission field: {sec.title.split('.')[1]}</span>
                    <button
                      onClick={() => copySection(sec.id, sec.content)}
                      className="text-navy-700 hover:text-navy-900 font-bold flex items-center gap-1"
                    >
                      {copiedId === sec.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy This Field</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
