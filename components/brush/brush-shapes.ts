export type BrushVariant = "hero" | "arc" | "ring" | "sweep" | "none";

export interface BrushPath {
  d: string;
  opacity?: number;
  transform?: string;
}

export const BRUSH_SHAPES: Record<Exclude<BrushVariant, "none">, BrushPath[]> = {
  hero: [
    // 1. Tall faint streak hugging the left edge (width ~140-190px, height ~820px)
    {
      d: "M -20,60 C 45,90 95,220 85,380 C 75,540 120,680 40,840 C 20,870 -10,880 -40,860 C -60,780 -25,620 -15,460 C -5,300 -65,160 -35,70 Z",
      opacity: 0.95,
    },
    // 2. Big diagonal sweep passing behind the headline (width ~220px, length ~1180px)
    {
      d: "M 160,220 C 380,170 680,210 920,270 C 1140,320 1340,310 1440,340 C 1460,370 1420,440 1320,430 C 1120,410 880,360 660,320 C 420,280 240,330 140,310 C 110,290 120,240 160,220 Z",
      opacity: 1,
    },
    // 3. Large curved arc under the upload card at the bottom right (width ~200px)
    {
      d: "M 780,660 C 940,620 1140,650 1300,720 C 1420,770 1470,830 1450,880 C 1410,910 1330,890 1210,830 C 1070,760 920,740 760,770 C 720,760 730,680 780,660 Z",
      opacity: 0.9,
    },
  ],

  arc: [
    // 1. Thick arc/swoosh curving behind mockup (width ~240px, curved)
    {
      d: "M 80,340 C 240,240 520,260 760,360 C 960,440 1120,420 1260,390 C 1310,410 1290,470 1200,500 C 1040,540 860,530 680,460 C 460,380 260,390 110,480 C 60,470 50,380 80,340 Z",
      opacity: 1,
    },
    // 2. Secondary sweeping stroke toward bottom right
    {
      d: "M 580,720 C 760,670 1020,700 1240,760 C 1390,800 1460,840 1450,890 C 1420,920 1320,910 1180,860 C 980,800 760,790 560,830 C 520,810 530,740 580,720 Z",
      opacity: 0.85,
    },
  ],

  ring: [
    // 1. Big C-shaped / ring-like brush circle behind left-hand heading (center x:~320, y:~420)
    {
      d: "M 420,180 C 260,190 120,290 80,440 C 40,600 140,740 300,790 C 440,830 560,780 640,730 C 670,760 650,810 580,840 C 440,900 240,870 100,770 C -20,670 -40,490 20,330 C 80,180 240,90 440,110 C 490,130 470,170 420,180 Z",
      opacity: 1,
    },
    // 2. Diagonal sweeps on right, partly cut off by section edges
    {
      d: "M 880,240 C 1040,220 1260,280 1420,370 C 1470,400 1460,460 1390,480 C 1250,420 1060,380 910,400 C 850,390 840,280 880,240 Z",
      opacity: 0.9,
    },
    // 3. Lower right streak
    {
      d: "M 1020,680 C 1160,640 1320,660 1440,710 C 1470,730 1460,780 1390,810 C 1270,780 1130,760 1000,780 C 970,760 980,700 1020,680 Z",
      opacity: 0.75,
    },
  ],

  sweep: [
    // 1. Giant diagonal sweep crossing mid-section (width ~250px, length ~1350px)
    {
      d: "M -40,460 C 260,360 620,340 960,420 C 1220,480 1380,460 1460,430 C 1490,460 1470,520 1380,560 C 1180,610 940,560 680,490 C 380,420 140,480 -30,580 C -70,560 -70,490 -40,460 Z",
      opacity: 1,
    },
    // 2. Upper right accent streak
    {
      d: "M 920,140 C 1080,110 1280,140 1430,200 C 1460,220 1450,270 1380,290 C 1250,250 1080,230 940,250 C 900,240 890,160 920,140 Z",
      opacity: 0.8,
    },
  ],
};
