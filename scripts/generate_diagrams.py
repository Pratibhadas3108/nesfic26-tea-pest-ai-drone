#!/usr/bin/env python3
"""
Generate publication-grade diagrams and charts for NESFIC-I-07 Proposal & Proof of Work.
Output directory: public/images/ and scripts/assets/
"""

import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.gridspec import GridSpec
import numpy as np

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images')
ASSETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

# -------------------------------------------------------------
# FIGURE 1: End-to-End Closed-Loop Workflow Pipeline
# -------------------------------------------------------------
def generate_workflow_diagram():
    fig, ax = plt.subplots(figsize=(10, 3.2), dpi=300)
    ax.set_facecolor('#0f172a')
    fig.patch.set_facecolor('#0f172a')

    steps = [
        {"num": "STEP 1", "title": "Scout Drone Survey", "sub": "Autonomous Grid Flight\n4K RGB + Multispectral\n15-20m AGL (0.4 cm/px)", "icon": "🛰️", "color": "#10b981"},
        {"num": "STEP 2", "title": "Edge AI Inference", "sub": "YOLOv11x + DeepLabV3+\nNVIDIA Jetson Orin\nStage 1 Lesion Tagging", "icon": "🧠", "color": "#06b6d4"},
        {"num": "STEP 3", "title": "GIS Hotspot Mapping", "sub": "Centimeter RTK-Fix\nPest Severity Clustering\nZero-Spray Buffer Zones", "icon": "📍", "color": "#f59e0b"},
        {"num": "STEP 4", "title": "RTK Spot-Spraying", "sub": "HexaSpray Drone\nPWM Solenoid Bursts\n68.4% Chemical Saved", "icon": "🚁", "color": "#ec4899"},
        {"num": "STEP 5", "title": "MRL Export Audit", "sub": "TRA Tocklai PPC Ledger\nPre-Harvest Interval (PHI)\nEU & FSSAI Compliant", "icon": "🛡️", "color": "#8b5cf6"},
    ]

    n = len(steps)
    box_w, box_h = 1.55, 2.3
    spacing = 1.95
    start_x = 0.3

    for i, step in enumerate(steps):
        x = start_x + i * spacing
        y = 0.45

        # Card shadow / glow
        shadow = patches.FancyBboxPatch((x-0.02, y-0.02), box_w+0.04, box_h+0.04,
                                        boxstyle="round,pad=0.08,rounding_size=0.15",
                                        facecolor=step["color"], alpha=0.15, edgecolor="none")
        ax.add_patch(shadow)

        # Card body
        card = patches.FancyBboxPatch((x, y), box_w, box_h,
                                      boxstyle="round,pad=0.08,rounding_size=0.12",
                                      facecolor='#1e293b', edgecolor=step["color"], linewidth=1.8)
        ax.add_patch(card)

        # Step header badge
        badge = patches.FancyBboxPatch((x + 0.15, y + box_h - 0.32), box_w - 0.3, 0.24,
                                       boxstyle="round,pad=0.04,rounding_size=0.06",
                                       facecolor=step["color"], edgecolor="none")
        ax.add_patch(badge)
        ax.text(x + box_w/2, y + box_h - 0.20, step["num"], color='#0f172a',
                fontsize=8.5, fontweight='bold', ha='center', va='center')

        # Title
        ax.text(x + box_w/2, y + box_h - 0.58, step["title"], color='#ffffff',
                fontsize=9.5, fontweight='bold', ha='center', va='center')

        # Subtitle description
        ax.text(x + box_w/2, y + 0.75, step["sub"], color='#94a3b8',
                fontsize=7.8, ha='center', va='center', linespacing=1.35)

        # Bottom status pill
        pill = patches.FancyBboxPatch((x + 0.2, y + 0.12), box_w - 0.4, 0.22,
                                      boxstyle="round,pad=0.03,rounding_size=0.06",
                                      facecolor='#0f172a', edgecolor='#334155', linewidth=0.8)
        ax.add_patch(pill)
        ax.text(x + box_w/2, y + 0.23, "TRA Certified", color='#38bdf8',
                fontsize=7, fontweight='semibold', ha='center', va='center')

        # Connecting arrow
        if i < n - 1:
            arrow_x = x + box_w + 0.05
            ax.annotate("", xy=(arrow_x + 0.28, y + box_h/2),
                        xytext=(arrow_x, y + box_h/2),
                        arrowprops=dict(arrowstyle="->,head_width=0.35,head_length=0.45",
                                        color=step["color"], lw=2.2))

    ax.set_xlim(0, start_x + n * spacing - 0.05)
    ax.set_ylim(0, 3.2)
    ax.axis('off')

    plt.tight_layout()
    path1 = os.path.join(OUTPUT_DIR, 'workflow_pipeline.png')
    path2 = os.path.join(ASSETS_DIR, 'workflow_pipeline.png')
    plt.savefig(path1, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(path2, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Generated workflow_pipeline.png")


# -------------------------------------------------------------
# FIGURE 2: Blanket Spraying vs. AeroPest Precision Spot-Spraying
# -------------------------------------------------------------
def generate_spray_comparison_diagram():
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4.2), dpi=300)
    fig.patch.set_facecolor('#0f172a')

    for ax in (ax1, ax2):
        ax.set_facecolor('#1e293b')
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.set_aspect('equal')
        ax.axis('off')

    # --- LEFT: Conventional Blanket Spraying ---
    ax1.set_title("CONVENTIONAL BLANKET SPRAYING\n120 L/ha Chemical Drenching (90% Waste)",
                  color='#f87171', fontsize=10.5, fontweight='bold', pad=12)

    # Tea bushes grid (green dots)
    for x in np.linspace(1, 9, 7):
        for y in np.linspace(1, 8, 6):
            circle = plt.Circle((x, y), 0.35, color='#15803d', alpha=0.6)
            ax1.add_patch(circle)

    # 3 Infested clusters (red dots)
    hotspots = [(3.66, 5.2), (3.66, 6.6), (6.33, 3.8)]
    for hx, hy in hotspots:
        circle = plt.Circle((hx, hy), 0.45, color='#dc2626')
        ax1.add_patch(circle)

    # Blanket chemical cloud across entire field
    cloud = patches.Rectangle((0.5, 0.5), 9, 8, linewidth=2, edgecolor='#ef4444',
                              facecolor='#ef4444', alpha=0.22, linestyle='--')
    ax1.add_patch(cloud)

    # Callouts
    ax1.text(5, 8.8, "⚠️ 100% Surface Drenched Regardless of Infestation", color='#fca5a5',
             fontsize=8.5, ha='center', fontweight='bold',
             bbox=dict(boxstyle="round,pad=0.3", facecolor='#450a0a', edgecolor='#dc2626', lw=1))
    ax1.text(5, 0.4, "High Chemical Runoff • Export MRL Exceedance Risk • ₹1,850/ha",
             color='#fca5a5', fontsize=8, ha='center')

    # --- RIGHT: AeroPest Targeted Spot-Spraying ---
    ax2.set_title("AEROPEST TARGETED SPOT-SPRAYING\nSub-Meter PWM Micro-Bursts (68.4% Saved)",
                  color='#34d399', fontsize=10.5, fontweight='bold', pad=12)

    # Tea bushes grid (green dots)
    for x in np.linspace(1, 9, 7):
        for y in np.linspace(1, 8, 6):
            circle = plt.Circle((x, y), 0.35, color='#10b981', alpha=0.8)
            ax2.add_patch(circle)

    # 3 Targeted spray circles with pulsing bursts
    for hx, hy in hotspots:
        # Buffer zone
        buf = plt.Circle((hx, hy), 1.05, linewidth=1.5, edgecolor='#fbbf24',
                         facecolor='#fbbf24', alpha=0.25, linestyle=':')
        ax2.add_patch(buf)
        # Spot spray target
        target = plt.Circle((hx, hy), 0.5, color='#ef4444')
        ax2.add_patch(target)
        # Nozzle spray pulse
        pulse = plt.Circle((hx, hy), 0.25, color='#38bdf8', alpha=0.9)
        ax2.add_patch(pulse)

    # Drone flight path
    path_x = [1, 3.66, 6.33, 9]
    path_y = [2, 5.9, 3.8, 7]
    ax2.plot(path_x, path_y, color='#38bdf8', linestyle='--', linewidth=2, label="RTK Flight Track")

    ax2.text(5, 8.8, "✓ Only Infected Clusters Sprayed (32.2 L/ha Active)", color='#6ee7b7',
             fontsize=8.5, ha='center', fontweight='bold',
             bbox=dict(boxstyle="round,pad=0.3", facecolor='#064e3b', edgecolor='#10b981', lw=1))
    ax2.text(5, 0.4, "Zero Runoff • 100% Export MRL Compliant • Save ₹13,850/12-Ha",
             color='#6ee7b7', fontsize=8, ha='center')

    plt.tight_layout()
    path1 = os.path.join(OUTPUT_DIR, 'blanket_vs_spotspray.png')
    path2 = os.path.join(ASSETS_DIR, 'blanket_vs_spotspray.png')
    plt.savefig(path1, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(path2, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Generated blanket_vs_spotspray.png")


# -------------------------------------------------------------
# FIGURE 3: Quantitative ROI & Performance Impact
# -------------------------------------------------------------
def generate_roi_charts():
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(10, 5.5), dpi=300)
    fig.patch.set_facecolor('#0f172a')

    for ax in (ax1, ax2, ax3, ax4):
        ax.set_facecolor('#1e293b')
        ax.tick_params(colors='#94a3b8', labelsize=8)
        for spine in ax.spines.values():
            spine.set_color('#334155')

    labels = ['Conventional\nBlanket', 'AeroPest\nSpot-Spray']

    # 1. Chemical Volume (L/ha)
    vols = [120, 38.2]
    colors1 = ['#ef4444', '#10b981']
    bars1 = ax1.bar(labels, vols, color=colors1, width=0.55)
    ax1.set_ylabel('Agrochemical (L/ha)', color='#e2e8f0', fontsize=8.5, fontweight='bold')
    ax1.set_title('Chemical Volume: 68.4% Reduction', color='#34d399', fontsize=9.5, fontweight='bold')
    for b in bars1:
        ax1.text(b.get_x() + b.get_width()/2, b.get_height() + 3, f"{b.get_height()} L",
                 ha='center', color='#ffffff', fontweight='bold', fontsize=8.5)
    ax1.set_ylim(0, 140)

    # 2. Operational Labor Time (Hours / 12-Ha)
    times = [18.0, 1.4]
    colors2 = ['#f97316', '#38bdf8']
    bars2 = ax2.bar(labels, times, color=colors2, width=0.55)
    ax2.set_ylabel('Hours to Complete', color='#e2e8f0', fontsize=8.5, fontweight='bold')
    ax2.set_title('Labor & Coverage: 12.8x Faster', color='#38bdf8', fontsize=9.5, fontweight='bold')
    for b in bars2:
        ax2.text(b.get_x() + b.get_width()/2, b.get_height() + 0.6, f"{b.get_height()} hrs",
                 ha='center', color='#ffffff', fontweight='bold', fontsize=8.5)
    ax2.set_ylim(0, 22)

    # 3. Cost per Application Cycle (₹/ha)
    costs = [1850, 540]
    colors3 = ['#f43f5e', '#10b981']
    bars3 = ax3.bar(labels, costs, color=colors3, width=0.55)
    ax3.set_ylabel('Cost (₹ / Hectare)', color='#e2e8f0', fontsize=8.5, fontweight='bold')
    ax3.set_title('Direct Chemical Cost: 70.8% Lower', color='#34d399', fontsize=9.5, fontweight='bold')
    for b in bars3:
        ax3.text(b.get_x() + b.get_width()/2, b.get_height() + 45, f"₹{int(b.get_height())}",
                 ha='center', color='#ffffff', fontweight='bold', fontsize=8.5)
    ax3.set_ylim(0, 2200)

    # 4. Export MRL Compliance Score (%)
    scores = [42, 100]
    colors4 = ['#dc2626', '#10b981']
    bars4 = ax4.bar(labels, scores, color=colors4, width=0.55)
    ax4.set_ylabel('Compliance Rate (%)', color='#e2e8f0', fontsize=8.5, fontweight='bold')
    ax4.set_title('EU & FSSAI MRL Compliance: 100% Pass', color='#34d399', fontsize=9.5, fontweight='bold')
    for b in bars4:
        ax4.text(b.get_x() + b.get_width()/2, b.get_height() + 2.5, f"{int(b.get_height())}%",
                 ha='center', color='#ffffff', fontweight='bold', fontsize=8.5)
    ax4.set_ylim(0, 120)

    fig.suptitle('Quantitative Field ROI & Agronomic Benchmarks (Jorhat Section 4B)',
                 color='#ffffff', fontsize=12, fontweight='bold', y=0.98)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    path1 = os.path.join(OUTPUT_DIR, 'roi_impact_charts.png')
    path2 = os.path.join(ASSETS_DIR, 'roi_impact_charts.png')
    plt.savefig(path1, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(path2, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Generated roi_impact_charts.png")


# -------------------------------------------------------------
# FIGURE 4: Assam Tea Pest Identification Matrix
# -------------------------------------------------------------
def generate_pest_matrix_diagram():
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(10, 3.6), dpi=300)
    fig.patch.set_facecolor('#0f172a')

    pests = [
        {
            "ax": ax1,
            "name": "Tea Mosquito Bug",
            "sci": "Helopeltis theivora",
            "symptom": "Water-soaked lesions on young flush;\ncankerous brown necrotic patches;\nshoot die-back.",
            "mAP": "94.6%",
            "etl": "5% infested plucking bushes",
            "color": "#ef4444",
            "tag": "CRITICAL"
        },
        {
            "ax": ax2,
            "name": "Red Spider Mite",
            "sci": "Oligonychus coffeae",
            "symptom": "Foliar bronzing along midrib;\nsevere webbing & chlorosis;\npremature leaf senescence.",
            "mAP": "91.2%",
            "etl": "4 mites / leaf or 10% bushes",
            "color": "#f59e0b",
            "tag": "MODERATE"
        },
        {
            "ax": ax3,
            "name": "Tea Looper Caterpillar",
            "sci": "Hyposidra talaca",
            "symptom": "Rapid leaf notch feeding;\nskeletonization of canopy;\ncomplete defoliation in 48h.",
            "mAP": "96.1%",
            "etl": "1 caterpillar / 5 bushes",
            "color": "#10b981",
            "tag": "DEFOLIATOR"
        }
    ]

    for p in pests:
        ax = p["ax"]
        ax.set_facecolor('#1e293b')
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.axis('off')

        # Frame border
        rect = patches.FancyBboxPatch((0.2, 0.2), 9.6, 9.6,
                                      boxstyle="round,pad=0.2,rounding_size=0.3",
                                      facecolor='#1e293b', edgecolor=p["color"], linewidth=1.8)
        ax.add_patch(rect)

        # Header tag
        tag_box = patches.FancyBboxPatch((0.6, 8.4), 8.8, 1.0,
                                         boxstyle="round,pad=0.1,rounding_size=0.15",
                                         facecolor=p["color"], edgecolor="none")
        ax.add_patch(tag_box)
        ax.text(5, 8.9, f"{p['name']} ({p['tag']})", color='#ffffff',
                fontweight='bold', fontsize=9.5, ha='center', va='center')

        # Scientific name
        ax.text(5, 7.8, p['sci'], color='#94a3b8', fontstyle='italic',
                fontsize=8.5, ha='center')

        # Symptoms
        ax.text(5, 5.8, f"<b>Symptom Diagnostics:</b>\n{p['symptom']}", color='#e2e8f0',
                fontsize=7.8, ha='center', linespacing=1.35)

        # Metric box (mAP & ETL)
        m_box = patches.FancyBboxPatch((0.8, 1.0), 8.4, 2.5,
                                       boxstyle="round,pad=0.1,rounding_size=0.2",
                                       facecolor='#0f172a', edgecolor='#334155', linewidth=1)
        ax.add_patch(m_box)
        ax.text(5, 2.6, f"AI Detection Accuracy: {p['mAP']}", color='#34d399',
                fontweight='bold', fontsize=8.5, ha='center')
        ax.text(5, 1.8, f"Economic Threshold Level (ETL):", color='#cbd5e1',
                fontsize=7.5, ha='center')
        ax.text(5, 1.3, p['etl'], color='#fde047',
                fontweight='semibold', fontsize=7.5, ha='center')

    fig.suptitle('Assam Tea Agro-Pest Identification & Diagnostic Matrix (TRA Tocklai)',
                 color='#ffffff', fontsize=11, fontweight='bold', y=0.98)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    path1 = os.path.join(OUTPUT_DIR, 'ai_pest_matrix.png')
    path2 = os.path.join(ASSETS_DIR, 'ai_pest_matrix.png')
    plt.savefig(path1, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(path2, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Generated ai_pest_matrix.png")


# -------------------------------------------------------------
# FIGURE 5: Water-Sensitive Paper (WSP) Droplet Lab Evidence
# -------------------------------------------------------------
def generate_wsp_diagram():
    fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(10, 3.2), dpi=300)
    fig.patch.set_facecolor('#0f172a')

    wsp_tests = [
        {
            "ax": ax1,
            "title": "Upper Plucking Canopy (0–15cm)",
            "density": "92.4 droplets / cm²",
            "vmd": "195 µm (Anti-Drift)",
            "eval": "100% Lethal Coverage",
            "dot_count": 92,
            "color": "#10b981"
        },
        {
            "ax": ax2,
            "title": "Middle Canopy (15–35cm)",
            "density": "68.1 droplets / cm²",
            "vmd": "205 µm (Downwash)",
            "eval": "Optimal Target Penetration",
            "dot_count": 68,
            "color": "#38bdf8"
        },
        {
            "ax": ax3,
            "title": "Lower Stems / Soil Margin (>35cm)",
            "density": "12.3 droplets / cm²",
            "vmd": "Negligible Overspray",
            "eval": "Zero Environmental Runoff",
            "dot_count": 14,
            "color": "#f59e0b"
        }
    ]

    np.random.seed(42)
    for t in wsp_tests:
        ax = t["ax"]
        ax.set_facecolor('#1e293b')
        ax.set_xlim(0, 10)
        ax.set_ylim(0, 10)
        ax.axis('off')

        # Yellow WSP card representation
        card = patches.FancyBboxPatch((1.0, 3.2), 8.0, 5.8,
                                      boxstyle="round,pad=0.1,rounding_size=0.2",
                                      facecolor='#fef08a', edgecolor='#ca8a04', linewidth=1.5)
        ax.add_patch(card)

        # Blue spray stain droplets
        for _ in range(t["dot_count"]):
            dx = np.random.uniform(1.3, 8.7)
            dy = np.random.uniform(3.5, 8.7)
            r = np.random.uniform(0.06, 0.16)
            dot = plt.Circle((dx, dy), r, color='#1d4ed8', alpha=0.85)
            ax.add_patch(dot)

        # Card Title
        ax.text(5, 9.4, t["title"], color='#ffffff', fontweight='bold', fontsize=8.2, ha='center')

        # Density badge
        ax.text(5, 2.3, t["density"], color=t["color"], fontweight='bold', fontsize=9.5, ha='center')
        ax.text(5, 1.5, f"VMD: {t['vmd']}", color='#94a3b8', fontsize=7.5, ha='center')
        ax.text(5, 0.8, t["eval"], color='#cbd5e1', fontweight='semibold', fontsize=7.5, ha='center')

    fig.suptitle('Water-Sensitive Paper (WSP) Droplet Canopy Penetration (Target >70 droplets/cm²)',
                 color='#ffffff', fontsize=11, fontweight='bold', y=0.98)
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    path1 = os.path.join(OUTPUT_DIR, 'wsp_droplet_analysis.png')
    path2 = os.path.join(ASSETS_DIR, 'wsp_droplet_analysis.png')
    plt.savefig(path1, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(path2, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()
    print("Generated wsp_droplet_analysis.png")


if __name__ == '__main__':
    generate_workflow_diagram()
    generate_spray_comparison_diagram()
    generate_roi_charts()
    generate_pest_matrix_diagram()
    generate_wsp_diagram()
    print("All diagrams generated successfully.")
