#!/usr/bin/env node

/**
 * Autonomous Gemini Pro Infographic Generation Bot (Puppeteer CDP)
 * Generates 16:9 widescreen technological framework infographics using Google Pro Account (kalyanjit@gmail.com)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const BASE_DIR = path.resolve(__dirname, '..');
const SCRIPTS_ASSETS = path.join(BASE_DIR, 'scripts', 'assets');
const PUBLIC_IMAGES = path.join(BASE_DIR, 'public', 'images');
const DIST_IMAGES = path.join(BASE_DIR, 'dist', 'images');

[SCRIPTS_ASSETS, PUBLIC_IMAGES, DIST_IMAGES].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const INFOGRAPHICS = [
  {
    id: 1,
    filename: 'workflow_pipeline.png',
    title: 'AeroPest-Tea: End-to-End Autonomous Precision Crop Protection Framework',
    prompt: 'A visionary 16:9 widescreen technological architectural framework infographic on a clean white and subtle light-gray blueprint grid background illustrating AEROPEST-TEA: CLOSED-LOOP AUTONOMOUS PRECISION CROP PROTECTION SYSTEM FOR ASSAM TEA PLANTATIONS. The top header features bold dark navy typography with subtitle Closed-Coupled Agronomic Intelligence & Spot-Spraying Architecture (TRA Tocklai). The visual layout presents five sequential, interconnected technological stages displayed horizontally across the widescreen canvas connected by flowing cyan and emerald data vectors: 1) STAGE 1: AUTONOMOUS AERIAL SCOUTING - A sleek carbon-fiber quadcopter drone flying at 18m AGL over lush green undulating Assam tea plantation rows with a 5-band multispectral sensor scanning the canopy with glowing cyan scan cones; 2) STAGE 2: EDGE AI DIAGNOSTIC STUDIO - NVIDIA Jetson Orin Nano edge unit processing 48MP frames with YOLOv11x inference bounding boxes detecting Helopeltis necrotic lesions and Red Spider Mite chlorosis with 94.6% confidence gauges; 3) STAGE 3: VARIABLE-RATE APPLICATION (VRA) ENGINE - An interactive GIS vector map generating micro-polygon shapefiles isolating pest clusters with zero-spray buffer zones; 4) STAGE 4: CENTIMETER RTK SPOT-SPRAYING - A high-payload 16L agricultural hexacopter equipped with dual RTK GNSS antennas and 4 high-frequency PWM solenoid nozzles firing precision droplet bursts directly into infested bushes while healthy bushes remain unsprayed; 5) STAGE 5: TRA TOCKLAI MRL & PHI COMPLIANCE LEDGER - An export compliance digital ledger displaying countdown timers, Pre-Harvest Intervals (PHI), EU 0.05 ppm pass badges, and digital QR audit certificates. Includes high-visibility KPI badges: 68.4% Agrochemical Reduction, 12.8x Faster Coverage, Sub-Meter Centimeter Accuracy, and 100% Export Clearance. Clean 2D flat vector aesthetic, royal navy blue, emerald green, electric cyan, and amber accents, ultra-sharp technical typography, publication-grade.'
  },
  {
    id: 2,
    filename: 'blanket_vs_spotspray.png',
    title: 'Spatial Comparison: Conventional Blanket Chemical Drenching vs. AeroPest-Tea Precision Spot-Spraying',
    prompt: 'A high-impact 16:9 widescreen technological architectural comparison infographic on a clean white and subtle light-gray blueprint grid background illustrating SPATIAL COMPARISON: CONVENTIONAL BLANKET SPRAYING VS. AEROPEST-TEA PRECISION SPOT-SPRAYING IN ASSAM TEA ESTATES. The header features bold dark navy typography with subtitle Quantitative Spatial Footprint & Chemical Dispersion Analysis (12-Hectare Tea Section). The visual presents a dramatic dual-panel comparison side-by-side with crisp borders: LEFT PANEL (RED ACCENT): CONVENTIONAL BLANKET DRENCHING - Top-down satellite view of a tea block saturated with dense red/orange chemical wash covering 100% of the surface area (12 Hectares), knapsack laborers spraying toxic mists, showing severe chemical runoff into water drains, 120 Liters/Ha pesticide waste, high worker hazard, and non-compliant chemical residues. RIGHT PANEL (EMERALD GREEN ACCENT): AEROPEST-TEA PRECISION SPOT-SPRAYING - Same 12-hectare tea block with pristine green healthy tea bushes left completely untreated, and precise neon-green circular micro-spray zones (sub-meter PWM actuation) targeting only the 3.8 hectares of confirmed pest clusters, RTK-guided hexacopter overhead with directed downward droplet airflow. CENTER DIVIDER: High-contrast KPI comparison cards: 120 L vs 38.2 L Chemical Volume (-68.4%), 18 Hours vs 1.4 Hours Coverage Speed (12.8x Faster), High Exposure vs Zero Human Exposure, and ₹13,850 Saved per Section. Clean 2D flat vector infographic style, deep navy, emerald green, vivid crimson, and cyan accents, ultra-sharp technical typography.'
  },
  {
    id: 3,
    filename: 'roi_impact_charts.png',
    title: 'Quantitative Economic ROI & Agronomic Impact Benchmark Matrix',
    prompt: 'A master quantitative engineering benchmark and economic ROI infographic in 16:9 widescreen format on a clean white blueprint background with subtle technical gridlines illustrating AEROPEST-TEA: QUANTITATIVE FIELD ROI & ECONOMIC BENCHMARK ANALYSIS. The top header displays bold dark navy typography with subtitle Operational Performance & Agronomic Impact Metrics Across Assam Tea Estates. The layout features four structured, color-coded diagnostic data panels with elegant vector bar charts, gauges, and comparison dials: 1) PANEL 1 (Emerald Green): CHEMICAL CONSUMPTION - High-impact comparative bar chart showing 120 L/ha (Conventional Knapsack) vs 95 L/ha (Tractor Boom) vs 38.2 L/ha (AeroPest-Tea), highlighting 68.4% Pesticide Reduction; 2) PANEL 2 (Electric Blue): OPERATIONAL TIME & SPEED - Radial gauge and timeline comparing 18.0 Hours (Manual Labor, 6 spray workers) vs 1.4 Hours (Autonomous UAV), demonstrating 12.8x Faster Mission Turnaround; 3) PANEL 3 (Gold / Amber): ECONOMIC COST SAVINGS - Financial waterfall chart displaying savings of ₹13,850 per 12-Ha spraying cycle (₹1,850/ha baseline slashed to ₹695/ha), yielding ₹2.4 Million annual estate savings; 4) PANEL 4 (Royal Purple / Cyan): MRL EXPORT COMPLIANCE & SAFETY - Circular gauge at 98/100 showing 100% Pass rate for European Union (EU <0.05 ppm) and FSSAI tea standards, with zero worker toxic exposure. Includes bottom banner with TRA Tocklai validation certification badge. Clean 2D flat vector aesthetic, deep navy blue, vibrant emerald green, cyan, and amber badges, crisp professional typography.'
  },
  {
    id: 4,
    filename: 'ai_pest_matrix.png',
    title: 'Assam Tea Agro-Pest Identification & Edge Computer Vision Diagnostic Matrix',
    prompt: 'A master entomological computer vision diagnostic matrix in 16:9 widescreen format on a clean white blueprint grid background illustrating ASSAM TEA AGRO-PEST IDENTIFICATION & AI DIAGNOSTIC MATRIX. The top header features bold dark navy typography with subtitle YOLOv11 Edge Computer Vision Classification & Foliar Lesion Quantification (TRA Tocklai). The visual layout presents three distinct, highly detailed, color-coded diagnostic pest profile cards side-by-side: 1) CARD 1 (Crimson / Coral): TEA MOSQUITO BUG (Helopeltis theivora) - Macro vector illustration of the black-and-red bug with long antennae on tender tea shoots, circular brown necrotic feeding punctures (1-2mm) with glowing AI bounding box showing Helopeltis: 94.6% Conf | Stage 1 | High Risk, ETL threshold: 5% affected shoots; 2) CARD 2 (Amber / Orange): RED SPIDER MITE (Oligonychus coffeae) - Microscopic vector depiction of red spider mites with webbing on upper mature leaves, bronze discoloration and chlorosis with AI bounding box O. coffeae: 91.2% Conf | Severity: Medium, ETL: 4-5 mites/leaf; 3) CARD 3 (Emerald / Teal): TEA LOOPER CATERPILLAR (Hyposidra talaca) - Vector of green looping caterpillar chewing leaf margins, skeletonized tea foliage with bounding box H. talaca: 96.1% Conf | Stage 2 Foliar Defoliation, ETL: 2-3 larvae/bush. Each card features technical telemetry badges: Ground Sampling Distance (GSD 0.42 cm/px), TensorRT INT8 Latency (28.4 ms), and TRA PPC Approved Chemical Treatment. Clean 2D flat vector aesthetic, royal navy, crimson, amber, and emerald accents, ultra-sharp typography.'
  },
  {
    id: 5,
    filename: 'wsp_droplet_analysis.png',
    title: 'Water-Sensitive Paper (WSP) Droplet Canopy Penetration & Micro-Droplet Physics Analysis',
    prompt: 'A master agricultural drone droplet physics and canopy penetration engineering infographic in 16:9 widescreen format on a clean white blueprint background illustrating WATER-SENSITIVE PAPER (WSP) DROPLET CANOPY PENETRATION & PWM ACTUATION ANALYSIS. The header displays bold dark navy typography with subtitle Downward Downwash Aerodynamics & Variable Droplet Spectrum (TRA Tocklai Experimental Station). The central visual features an architectural cross-section of a dense Camellia sinensis (Assamica) tea bush showing high-frequency PWM solenoid nozzles firing downward blue droplet clouds propelled by rotor downwash. Three highlighted horizontal sampling tiers feature high-resolution diagnostic Water-Sensitive Paper (WSP) yellow-to-blue stain cards: 1) UPPER TIER (0-15cm, Plucking Table): WSP card showing dense uniform droplet distribution (92.4 droplets/cm², 195 µm VMD) achieving 100% lethal coverage for Helopeltis; 2) MIDDLE TIER (15-35cm, Dense Foliage): WSP card with optimal coverage (68.1 droplets/cm², 205 µm VMD) propelled by rotor turbulence targeting Red Spider Mites; 3) LOWER TIER (>35cm, Soil & Drainage Margin): WSP card showing negligible runoff (12.3 droplets/cm²) preventing chemical leaching into soil and waterways. Accompanying engineering dials display PWM Pulse Frequency (20 Hz), Droplet VMD (150-250 µm Anti-Drift), and Airflow Velocity (4.2 m/s). Clean 2D flat vector aesthetic, dark navy, vibrant cyan, cobalt blue, and golden-yellow WSP cards, ultra-sharp typography.'
  },
  {
    id: 6,
    filename: 'budget_allocation_framework.png',
    title: 'NESFIC-I-07 Indicative Resource & Budget Allocation Framework (₹40.0 Lakhs Grant)',
    prompt: 'A master institutional financial architecture infographic in 16:9 widescreen format on a clean white blueprint background with subtle technical gridlines illustrating NESFIC-I-07: INDICATIVE RESOURCE & BUDGET ALLOCATION FRAMEWORK (₹40.0 LAKHS PROBLEM STATEMENT GRANT). The header features bold dark navy typography with subtitle Strategic Financial Governance & Milestone Drawdown Architecture (Government of Assam & TRA Tocklai). The visual layout presents a central proportional allocation gauge and 4 distinct, color-coded strategic resource pillar cards: 1) PILLAR 1 (50.0% | ₹20.0 LAKHS - Deep Navy Blue): TECHNICAL ENGINEERING TEAM & R&D - Icons of Lead Agritech Architect Pratibha Das Hatibaruah, Senior Computer Vision Engineer, UAV Avionics Engineer, and Full-Stack GIS Developer; 2) PILLAR 2 (30.0% | ₹12.0 LAKHS - Electric Sky Blue): HARDWARE ASSETS & AVIONICS - Icons of multispectral scouting UAV (₹3.5L), 16L agricultural spot-spray drone with PWM nozzles (₹5.5L), NVIDIA Jetson Orin GCS & RTK base station (₹3.0L); 3) PILLAR 3 (11.25% | ₹4.5 LAKHS - Emerald Green): FIELD PILOT TRIALS & TRA TESTING - Icons of TRA Tocklai experimental grounds (10 Ha), 100 Ha commercial estate trials, WSP droplet assays & GC-MS/MS laboratory residue testing; 4) PILLAR 4 (8.75% | ₹3.5 LAKHS - Warm Amber): OPERATIONAL LOGISTICS & REGULATORY - Icons of smart LiPo battery packs, portable field generator, multi-estate Upper Assam transit, DGCA authorizations. Includes milestone release schedule (M1-M9) and audit governance certification. Clean 2D flat vector aesthetic, dark navy, emerald, sky blue, and amber accents, ultra-sharp corporate typography.'
  }
];

// CLI filter argument: --file=workflow_pipeline.png or --index=1 or --start=2
const args = process.argv.slice(2);
let targetFile = null;
let targetIndex = null;
let startIndex = null;
let skipExisting = false;
let port = 9223;

args.forEach(a => {
  if (a.startsWith('--file=')) targetFile = a.split('=')[1].trim();
  if (a.startsWith('--index=')) targetIndex = parseInt(a.split('=')[1].trim(), 10);
  if (a.startsWith('--start=')) startIndex = parseInt(a.split('=')[1].trim(), 10);
  if (a === '--skip-existing') skipExisting = true;
  if (a.startsWith('--port=')) port = parseInt(a.split('=')[1].trim(), 10);
});

const queue = INFOGRAPHICS.filter(item => {
  if (targetFile && item.filename !== targetFile) return false;
  if (targetIndex !== null && item.id !== targetIndex) return false;
  if (startIndex !== null && item.id < startIndex) return false;
  if (skipExisting) {
    const p = path.join(SCRIPTS_ASSETS, item.filename);
    if (fs.existsSync(p)) return false;
  }
  return true;
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveImageBuffers(filename, buffer) {
  const destPaths = [
    path.join(SCRIPTS_ASSETS, filename),
    path.join(PUBLIC_IMAGES, filename),
    path.join(DIST_IMAGES, filename)
  ];

  destPaths.forEach(p => {
    try {
      fs.writeFileSync(p, buffer);
      console.log(`   💾 Saved to: ${p} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
    } catch (e) {
      console.error(`   ⚠️ Failed saving to ${p}:`, e.message);
    }
  });
}

async function main() {
  console.log('\n=============================================================');
  console.log('🤖 GOOGLE GEMINI PRO INFOGRAPHIC AUTOMATION (PORT ' + port + ')');
  console.log('Account: kalyanjit@gmail.com (Google Pro)');
  console.log(`Queue size: ${queue.length} of ${INFOGRAPHICS.length} items`);
  console.log('=============================================================\n');

  let browser;
  try {
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}`, defaultViewport: null });
    console.log('✅ Connected to Google Chrome on port ' + port);
  } catch (err) {
    console.error(`❌ Could not connect to Chrome on port ${port}:`, err.message);
    process.exit(1);
  }

  const pages = await browser.pages();
  let geminiPage = pages.find(p => p.url().includes('gemini.google.com'));
  if (!geminiPage) {
    geminiPage = await browser.newPage();
    await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
  } else {
    await geminiPage.bringToFront();
  }

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    console.log(`\n-------------------------------------------------------------`);
    console.log(`[${i + 1}/${queue.length}] 🎨 Generating: ${item.filename}`);
    console.log(`   🎯 Title: ${item.title}`);
    console.log(`-------------------------------------------------------------`);

    let attempts = 0;
    let completed = false;

    while (attempts < 2 && !completed) {
      attempts++;
      try {
        // Navigate to fresh chat for clean generation
        await geminiPage.goto('https://gemini.google.com/app', { waitUntil: 'networkidle2' });
        await sleep(2500);

        // Record initial images
        const existingUrls = await geminiPage.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean);
        });

        // Focus and type prompt into Gemini input box
        const promptFull = `Generate a high-quality 16:9 widescreen technological framework infographic image: ${item.prompt}`;

        await geminiPage.evaluate((text) => {
          const input = document.querySelector('rich-textarea div[contenteditable="true"], div[contenteditable="true"]');
          if (input) {
            input.focus();
            input.innerText = text;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }, promptFull);

        await sleep(1000);

        // Click Send button or press Enter
        const clicked = await geminiPage.evaluate(() => {
          const sendBtn = document.querySelector('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"], button[aria-label*="Send"]')?.closest('button');
          if (sendBtn && !sendBtn.disabled) {
            sendBtn.click();
            return true;
          }
          return false;
        });

        if (!clicked) {
          await geminiPage.keyboard.press('Enter');
        }

        console.log(`   📤 Prompt submitted to Gemini. Waiting for Imagen 3 generation...`);

        // Wait for generated image
        let imageBuffer = null;
        let waitSeconds = 0;

        while (!imageBuffer && waitSeconds < 90) {
          await sleep(3000);
          waitSeconds += 3;

          const newImageData = await geminiPage.evaluate((existing) => {
            const allImages = Array.from(document.querySelectorAll('img'));
            const candidates = allImages.filter(img => 
              img.src && 
              !existing.includes(img.src) &&
              (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
              img.naturalWidth > 350
            );

            if (candidates.length > 0) {
              const latest = candidates[candidates.length - 1];
              return { src: latest.src, width: latest.naturalWidth, height: latest.naturalHeight };
            }
            return null;
          }, existingUrls);

          if (newImageData) {
            console.log(`   🖼️ Image detected in response (${newImageData.width}x${newImageData.height})! Extracting image buffer...`);

            // Fetch image data directly from browser context
            const base64Data = await geminiPage.evaluate(async (imgSrc) => {
              try {
                const response = await fetch(imgSrc);
                const blob = await response.blob();
                return new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result.split(',')[1]);
                  reader.onerror = () => resolve(null);
                  reader.readAsDataURL(blob);
                });
              } catch (e) {
                // Fallback to canvas
                const img = Array.from(document.querySelectorAll('img')).find(i => i.src === imgSrc);
                if (!img || !img.complete || img.naturalWidth === 0) return null;
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                return canvas.toDataURL('image/png').split(',')[1];
              }
            }, newImageData.src);

            if (base64Data) {
              imageBuffer = Buffer.from(base64Data, 'base64');
            }
          }
        }

        if (imageBuffer) {
          await saveImageBuffers(item.filename, imageBuffer);
          completed = true;
          console.log(`   ✅ Finished: ${item.filename}`);
        } else {
          console.error(`   ⚠️ Timed out waiting for ${item.filename}. Retrying...`);
        }

      } catch (err) {
        console.error(`   ❌ Error during attempt ${attempts}:`, err.message);
      }
    }

    if (i < queue.length - 1) {
      console.log(`   ⏳ Cooling down 5s before next image...`);
      await sleep(5000);
    }
  }

  console.log('\n=============================================================');
  console.log('🎉 ALL REQUESTED INFOGRAPHICS GENERATION PROCESS FINISHED!');
  console.log('=============================================================\n');

  browser.disconnect();
}

main().catch(err => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
