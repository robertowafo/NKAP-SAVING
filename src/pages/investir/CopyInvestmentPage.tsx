import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Copy, Star, Users, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

/* ─── Types ──────────────────────────────────────────────────── */
type Holding = {
  code: string;
  label: string;
  pct: number;
  color: string;
  bg: string;
  flag?: string;
  isOther?: boolean;
};

type Manager = {
  name: string;
  titre: string;
  societe: string;
  perf1an: string;
  perf1anNum: number;
  perf3ans: string;
  risque: string;
  copiants: number;
  specialite: string;
  note: number;
  badge: string;
  badgeColor: string;
  avatar: string;
  avatarColor: string;
  holdings: Holding[];
};

/* ─── Holdings data ──────────────────────────────────────────── */
const HOLDINGS_PAUL: Holding[] = [
  { code: 'SEMC',    label: 'SEMC',    pct: 20, color: '#14b8a6', bg: '#0d9488' },
  { code: 'SFCM',   label: 'SAFACAM', pct: 18, color: '#3b82f6', bg: '#2563eb' },
  { code: 'SCP',    label: 'SOCAP.',  pct: 15, color: '#a855f7', bg: '#9333ea' },
  { code: 'BANGE',  label: 'BANGE',   pct: 12, color: '#f59e0b', bg: '#d97706' },
  { code: 'CMR',    label: 'CMR',     pct: 15, color: '#22c55e', bg: '#16a34a', flag: '🇨🇲' },
  { code: 'GAB',    label: 'GAB',     pct: 10, color: '#bef264', bg: '#1b5e4c', flag: '🇬🇦' },
  { code: 'AUTRES', label: 'Autres',  pct: 10, color: '#374151', bg: '#1f2937', isOther: true },
];

const HOLDINGS_CLAIRE: Holding[] = [
  { code: 'CMR',    label: 'CMR',     pct: 25, color: '#22c55e', bg: '#16a34a', flag: '🇨🇲' },
  { code: 'CGO',    label: 'CGO',     pct: 20, color: '#ef4444', bg: '#dc2626', flag: '🇨🇬' },
  { code: 'CIV',    label: 'CIV',     pct: 15, color: '#f97316', bg: '#ea580c', flag: '🇨🇮' },
  { code: 'SEMC',   label: 'SEMC',    pct: 18, color: '#14b8a6', bg: '#0d9488' },
  { code: 'BANGE',  label: 'BANGE',   pct: 12, color: '#f59e0b', bg: '#d97706' },
  { code: 'AUTRES', label: 'Autres',  pct: 10, color: '#374151', bg: '#1f2937', isOther: true },
];

const HOLDINGS_YVES: Holding[] = [
  { code: 'SCP',    label: 'SOCAP.',  pct: 25, color: '#a855f7', bg: '#9333ea' },
  { code: 'SFCM',   label: 'SAFACAM', pct: 22, color: '#3b82f6', bg: '#2563eb' },
  { code: 'SEMC',   label: 'SEMC',    pct: 18, color: '#14b8a6', bg: '#0d9488' },
  { code: 'CICAM',  label: 'CICAM',   pct: 15, color: '#ec4899', bg: '#db2777' },
  { code: 'CMR',    label: 'CMR',     pct: 10, color: '#22c55e', bg: '#16a34a', flag: '🇨🇲' },
  { code: 'AUTRES', label: 'Autres',  pct: 10, color: '#374151', bg: '#1f2937', isOther: true },
];

const HOLDINGS_AICHA: Holding[] = [
  { code: 'CMR',    label: 'CMR',     pct: 20, color: '#22c55e', bg: '#16a34a', flag: '🇨🇲' },
  { code: 'GAB',    label: 'GAB',     pct: 15, color: '#bef264', bg: '#1b5e4c', flag: '🇬🇦' },
  { code: 'CGO',    label: 'CGO',     pct: 15, color: '#ef4444', bg: '#dc2626', flag: '🇨🇬' },
  { code: 'SEMC',   label: 'SEMC',    pct: 15, color: '#14b8a6', bg: '#0d9488' },
  { code: 'BANGE',  label: 'BANGE',   pct: 15, color: '#f59e0b', bg: '#d97706' },
  { code: 'SFCM',   label: 'SAFACAM', pct: 10, color: '#3b82f6', bg: '#2563eb' },
  { code: 'AUTRES', label: 'Autres',  pct: 10, color: '#374151', bg: '#1f2937', isOther: true },
];

const MANAGERS: Manager[] = [
  {
    name: 'Paul Ngando', titre: 'Asset Manager Senior', societe: 'SGI Douala AM',
    perf1an: '+24.3%', perf1anNum: 24.3, perf3ans: '+68.5%',
    risque: 'Modéré', copiants: 1247, specialite: 'Actions BVMAC',
    note: 4.8, badge: 'Top performeur', badgeColor: 'bg-[#bef264] text-[#0a0a0a]',
    avatar: 'PN', avatarColor: 'bg-[#1b5e4c]',
    holdings: HOLDINGS_PAUL,
  },
  {
    name: 'Claire Mbemba', titre: 'Gestionnaire de portefeuille', societe: 'Afriland AM',
    perf1an: '+18.7%', perf1anNum: 18.7, perf3ans: '+52.1%',
    risque: 'Faible-Modéré', copiants: 842, specialite: 'Obligations d\'État',
    note: 4.6, badge: 'Prudent', badgeColor: 'bg-[#e5f0ff] text-blue-600',
    avatar: 'CM', avatarColor: 'bg-blue-600',
    holdings: HOLDINGS_CLAIRE,
  },
  {
    name: 'Yves Fotso', titre: 'Directeur Investissements', societe: 'BDEAC Capital',
    perf1an: '+31.2%', perf1anNum: 31.2, perf3ans: '+85.4%',
    risque: 'Élevé', copiants: 623, specialite: 'Croissance & Tech',
    note: 4.9, badge: 'Haut rendement', badgeColor: 'bg-orange-100 text-orange-600',
    avatar: 'YF', avatarColor: 'bg-orange-500',
    holdings: HOLDINGS_YVES,
  },
  {
    name: 'Aïcha Diallo', titre: 'Portfolio Manager', societe: 'CCA AM',
    perf1an: '+14.2%', perf1anNum: 14.2, perf3ans: '+43.7%',
    risque: 'Faible', copiants: 2103, specialite: 'Mixte défensif',
    note: 4.7, badge: 'Plus copié', badgeColor: 'bg-purple-100 text-purple-600',
    avatar: 'AD', avatarColor: 'bg-purple-600',
    holdings: HOLDINGS_AICHA,
  },
];

/* ─── Mini Donut (in cards) ──────────────────────────────────── */
function MiniDonut({ holdings }: { holdings: Holding[] }) {
  const size = 72;
  const cx = size / 2, cy = size / 2;
  const r = 26;
  const sw = 9;
  const circumference = 2 * Math.PI * r;
  const GAP = 2;
  let c = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a2e" strokeWidth={sw} />
      {holdings.map((h, i) => {
        const segLen = (h.pct / 100) * circumference - GAP;
        const dashoffset = circumference - (c / 100) * circumference;
        c += h.pct;
        return (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={h.color} strokeWidth={sw}
            strokeDasharray={`${Math.max(0, segLen)} ${circumference}`}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90, ${cx}, ${cy})`}
          />
        );
      })}
    </svg>
  );
}

/* ─── Big Donut with floating labels ────────────────────────── */
function BigDonut({ holdings, perf }: { holdings: Holding[]; perf: string }) {
  const SIZE = 300;
  const PAD = 90; // padding for labels
  const TOTAL = SIZE + PAD * 2;
  const cx = TOTAL / 2, cy = TOTAL / 2;
  const r = SIZE * 0.31;
  const sw = SIZE * 0.085;
  const circumference = 2 * Math.PI * r;
  const GAP = 4;
  const labelR = r + sw / 2 + 44;

  let c = 0;
  const segs = holdings.map(h => { const s = { ...h, start: c }; c += h.pct; return s; });

  const toAngle = (pct: number) => (pct / 100) * 2 * Math.PI - Math.PI / 2;

  return (
    <svg width={TOTAL} height={TOTAL} viewBox={`0 0 ${TOTAL} ${TOTAL}`} className="max-w-full">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#141517" strokeWidth={sw} />

      {/* Segments */}
      {segs.map((seg, i) => {
        const segLen = (seg.pct / 100) * circumference - GAP;
        const dashoffset = circumference - (seg.start / 100) * circumference;
        return (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${Math.max(0, segLen)} ${circumference}`}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90, ${cx}, ${cy})`}
          />
        );
      })}

      {/* Center text */}
      <text x={cx} y={cy - 6} textAnchor="middle"
        style={{ fontSize: 28, fontWeight: 900, fill: '#4ade80', fontFamily: 'system-ui' }}>
        +{perf}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle"
        style={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)', fontWeight: 700, fontFamily: 'system-ui', letterSpacing: '0.05em' }}>
        PERFORMANCE
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle"
        style={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)', fontFamily: 'system-ui' }}>
        1 an
      </text>

      {/* Labels */}
      {segs.map((seg, i) => {
        const midAngle = toAngle(seg.start + seg.pct / 2);
        const lx = cx + labelR * Math.cos(midAngle);
        const ly = cy + labelR * Math.sin(midAngle);

        if (seg.isOther) {
          // "Autres" label inside the ring track
          const inR = r - sw / 2 - 18;
          const ox = cx + inR * Math.cos(midAngle);
          const oy = cy + inR * Math.sin(midAngle);
          return (
            <g key={i}>
              <circle cx={ox} cy={oy} r={22} fill="#0f1117" stroke="#1f2937" strokeWidth={1} />
              <text x={ox} y={oy - 4} textAnchor="middle"
                style={{ fontSize: 8, fill: 'rgba(255,255,255,0.4)', fontWeight: 700, fontFamily: 'system-ui' }}>
                Autres
              </text>
              <text x={ox} y={oy + 8} textAnchor="middle"
                style={{ fontSize: 12, fill: 'white', fontWeight: 900, fontFamily: 'system-ui' }}>
                {seg.pct}%
              </text>
            </g>
          );
        }

        // Connector line
        const lineStart = {
          x: cx + (r + sw / 2 + 5) * Math.cos(midAngle),
          y: cy + (r + sw / 2 + 5) * Math.sin(midAngle),
        };
        const lineEnd = {
          x: cx + (labelR - 26) * Math.cos(midAngle),
          y: cy + (labelR - 26) * Math.sin(midAngle),
        };

        const BW = 70, BH = 30;
        const bx = lx - BW / 2, by = ly - BH / 2;
        const logoR = 11;
        const logoX = bx + 16, logoY = ly;

        return (
          <g key={i}>
            {/* Connector */}
            <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y}
              stroke={seg.color} strokeWidth={1.5} opacity={0.5} />

            {/* Badge pill */}
            <rect x={bx} y={by} width={BW} height={BH} rx={15} fill="#161618" />
            <rect x={bx} y={by} width={BW} height={BH} rx={15} fill="none"
              stroke={seg.color} strokeWidth={1} opacity={0.4} />

            {/* Logo circle */}
            <circle cx={logoX} cy={logoY} r={logoR} fill={seg.bg} />

            {seg.flag ? (
              /* Flag emoji */
              <text x={logoX} y={logoY + 4} textAnchor="middle"
                style={{ fontSize: 11, fontFamily: 'system-ui' }}>
                {seg.flag}
              </text>
            ) : (
              /* Ticker letters */
              <text x={logoX} y={logoY + 3} textAnchor="middle"
                style={{ fontSize: seg.label.length > 4 ? 5 : 6.5, fontWeight: 900, fill: 'white', fontFamily: 'system-ui' }}>
                {seg.code.slice(0, 4)}
              </text>
            )}

            {/* Percentage */}
            <text x={bx + 44} y={ly + 4} textAnchor="middle"
              style={{ fontSize: 12, fontWeight: 800, fill: 'white', fontFamily: 'system-ui' }}>
              {seg.pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CopyInvestmentPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const manager = MANAGERS[activeIdx];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#bef264]/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/investir" className="inline-flex items-center gap-2 text-white/40 text-xs font-black mb-10 hover:text-white/70 transition-colors tracking-widest uppercase">
            ← Investissements
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: info */}
            <div>
              <span className="text-[10px] font-black text-[#bef264] tracking-[0.3em] uppercase mb-5 block">Copy Investment</span>
              <h1 className="font-black text-5xl md:text-6xl tracking-tighter leading-[0.9] mb-6 text-white">
                Répliquez les<br />
                <span className="text-[#bef264]">meilleurs AM</span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                Chaque ordre d'un gestionnaire expert est automatiquement reproduit dans votre portefeuille.
              </p>

              {/* AM selector tabs */}
              <div className="flex flex-col gap-3">
                {MANAGERS.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      'flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all text-left',
                      activeIdx === i
                        ? 'bg-white/8 border-white/20'
                        : 'border-white/5 hover:border-white/10 hover:bg-white/3'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0', m.avatarColor)}>
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-white text-sm truncate">{m.name}</div>
                      <div className="text-white/30 text-xs">{m.specialite}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-green-400 text-sm">{m.perf1an}</div>
                      <div className="text-white/30 text-xs">{m.copiants.toLocaleString('fr')} copiants</div>
                    </div>
                    {activeIdx === i && (
                      <div className="w-1.5 h-8 rounded-full bg-[#bef264] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: big donut */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <BigDonut holdings={manager.holdings} perf={String(manager.perf1anNum)} />
              <p className="text-white/30 text-xs font-bold mt-2 tracking-widest uppercase">
                Allocation — {manager.name}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MANAGER CARDS ────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="font-black text-3xl md:text-4xl text-[#0a0a0a] tracking-tighter">Choisissez votre gestionnaire</h2>
            <p className="text-gray-500 font-bold mt-2 text-sm">Classés par performance · Données vérifiées NKAP INVEST</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MANAGERS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  'bg-white rounded-[2rem] p-8 border cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all',
                  activeIdx === i ? 'border-[#0a0a0a] shadow-lg' : 'border-black/5'
                )}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg', m.avatarColor)}>
                      {m.avatar}
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-[#0a0a0a]">{m.name}</h3>
                      <p className="text-xs text-gray-400 font-bold">{m.titre} · {m.societe}</p>
                    </div>
                  </div>
                  <span className={cn('text-[10px] font-black px-3 py-1 rounded-full', m.badgeColor)}>{m.badge}</span>
                </div>

                {/* Stats + Mini donut */}
                <div className="flex items-center gap-5 mb-6">
                  <MiniDonut holdings={m.holdings} />
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="text-center bg-[#f4f4f0] rounded-2xl p-3">
                      <p className="text-[9px] text-gray-400 font-black uppercase mb-1">1 an</p>
                      <p className="font-black text-emerald-600 text-base">{m.perf1an}</p>
                    </div>
                    <div className="text-center bg-[#f4f4f0] rounded-2xl p-3">
                      <p className="text-[9px] text-gray-400 font-black uppercase mb-1">3 ans</p>
                      <p className="font-black text-emerald-600 text-base">{m.perf3ans}</p>
                    </div>
                    <div className="text-center bg-[#f4f4f0] rounded-2xl p-3">
                      <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Copiants</p>
                      <p className="font-black text-[#0a0a0a] text-base">{m.copiants.toLocaleString('fr')}</p>
                    </div>
                  </div>
                </div>

                {/* Holdings legend */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {m.holdings.filter(h => !h.isOther).map((h, j) => (
                    <div key={j} className="flex items-center gap-1.5 px-3 py-1 bg-[#f4f4f0] rounded-full">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] shrink-0"
                        style={{ backgroundColor: h.bg }}>
                        {h.flag ? h.flag : <span className="font-black text-white" style={{ fontSize: 6 }}>{h.code.slice(0, 3)}</span>}
                      </div>
                      <span className="text-[10px] font-black text-gray-600">{h.label}</span>
                      <span className="text-[10px] font-bold text-gray-400">{h.pct}%</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-black">
                      <Star className="w-4 h-4 fill-yellow-400" /> {m.note}
                    </div>
                    <span className="text-gray-200 text-sm">·</span>
                    <span className="text-xs font-black text-gray-400">{m.risque}</span>
                    <span className="text-gray-200 text-sm">·</span>
                    <span className="text-xs font-black text-gray-400">{m.specialite}</span>
                  </div>
                </div>

                <Link
                  to="/inscription"
                  onClick={e => e.stopPropagation()}
                  className="mt-5 w-full py-3.5 bg-[#0a0a0a] text-white rounded-xl font-black text-sm hover:bg-[#bef264] hover:text-[#0a0a0a] transition-colors flex items-center justify-center gap-2"
                >
                  Copier cet AM <Copy className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#f4f4f0]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2rem] p-8 border border-black/5 flex items-start gap-6">
            <div className="w-10 h-10 bg-[#bef264]/20 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#1b5e4c]" />
            </div>
            <div>
              <h3 className="font-black text-lg text-[#0a0a0a] mb-2">Conformité & Réglementation</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                Toutes les opérations sont exécutées via des Sociétés de Bourse agréées <strong className="text-[#0a0a0a]">COSUMAF</strong>.
                Les allocations affichées sont à titre indicatif et varient selon la stratégie de l'AM.
                Les performances passées ne préjugent pas des performances futures.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
