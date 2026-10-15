const T = ({ x, y, children, a = "middle", b }) => <text x={x} y={y} textAnchor={a} fontWeight={b ? 700 : 400}>{children}</text>;
const Dot = ({ x, y }) => <circle cx={x} cy={y} r="4" className="dot" />;
const Box = ({ x, y, w, h, l, s }) => (<g><rect x={x} y={y} width={w} height={h} rx="6" className="box" /><T x={x + w / 2} y={y + h / 2 - 2} b>{l}</T>{s && <T x={x + w / 2} y={y + h / 2 + 14}>{s}</T>}</g>);
export default function Circuit2() {
  return (
    <svg viewBox="0 0 720 640" role="img" aria-label="Kontaktorla üçfazalı mühərrikin idarə edilməsi: güc və idarəetmə dövrəsi" className="circuit">
      <T x={140} y={20} b>GÜC DÖVRƏSİ</T>
      <T x={570} y={20} b>İDARƏETMƏ DÖVRƏSİ</T>
      <g className="wire">
        <path d="M90 48V70M140 48V70M190 48V70M90 110V250M140 110V250M190 110V250M90 310V370M140 310V370M190 310V370M90 420V537M140 420V505M190 420V537" />
        <path d="M500 48V80M500 130V160M500 210V255H585V270M585 330V345H500M500 255V270M500 330V380M500 430V470H640V48" />
        <path d="M500 345V345" />
      </g>
      <path d="M240 48V560H195" className="pe" />
      <circle cx="90" cy="48" r="4" className="dot" /><circle cx="140" cy="48" r="4" className="dot" /><circle cx="190" cy="48" r="4" className="dot" /><circle cx="240" cy="48" r="4" className="dot" />
      <T x={90} y={38}>L1</T><T x={140} y={38}>L2</T><T x={190} y={38}>L3</T><T x={240} y={38}>PE</T>
      {[90, 140, 190].map((x) => <rect key={x} x={x - 8} y={70} width={16} height={40} className="box" />)}
      <T x={50} y={95} b>F1</T>
      <T x={82} y={82} a="end">1</T><T x={132} y={82} a="end">3</T><T x={182} y={82} a="end">5</T>
      <T x={82} y={106} a="end">2</T><T x={132} y={106} a="end">4</T><T x={182} y={106} a="end">6</T>
      <Box x={65} y={250} w={150} h={60} l="KM1" s="əsas kontaktlar" />
      <T x={82} y={246} a="end">1</T><T x={132} y={246} a="end">3</T><T x={182} y={246} a="end">5</T>
      <T x={82} y={326} a="end">2</T><T x={132} y={326} a="end">4</T><T x={182} y={326} a="end">6</T>
      <Box x={65} y={370} w={150} h={50} l="F2" s="termik rele" />
      <T x={82} y={366} a="end">1</T><T x={132} y={366} a="end">3</T><T x={182} y={366} a="end">5</T>
      <T x={82} y={436} a="end">2</T><T x={132} y={436} a="end">4</T><T x={182} y={436} a="end">6</T>
      <circle cx="140" cy="560" r="55" className="box" />
      <T x={140} y={555} b>M1</T><T x={140} y={575}>3 ~</T>
      <T x={82} y={500} a="end">U1</T><T x={132} y={500} a="end">V1</T><T x={182} y={500} a="end">W1</T>
      <T x={50} y={625} a="start" className="muted">PE mühərrikin gövdəsinə qoşulur</T>
      <circle cx="500" cy="48" r="4" className="dot" /><circle cx="640" cy="48" r="4" className="dot" />
      <T x={500} y={36} b>+24 V</T><T x={640} y={36} b>0 V</T>
      <Box x={470} y={80} w={60} h={50} l="F2" s="NC" />
      <T x={540} y={96} a="start">95</T><T x={540} y={124} a="start">96</T>
      <Box x={470} y={160} w={60} h={50} l="S1" s="STOP NC" />
      <T x={540} y={176} a="start">11</T><T x={540} y={204} a="start">12</T>
      <Box x={470} y={270} w={60} h={60} l="S2" s="START NO" />
      <T x={462} y={286} a="end">13</T><T x={462} y={324} a="end">14</T>
      <Box x={560} y={270} w={60} h={60} l="KM1" s="NO" />
      <T x={552} y={286} a="end">13</T><T x={552} y={324} a="end">14</T>
      <Dot x={500} y={255} /><Dot x={500} y={345} />
      <Box x={470} y={380} w={60} h={50} l="KM1" s="bobin" />
      <T x={540} y={394} a="start">A1</T><T x={540} y={424} a="start">A2</T>
      <T x={570} y={500}>KM1 bobini çəkəndə güc dövrəsindəki</T>
      <T x={570} y={518}>KM1 əsas kontaktları (1-2, 3-4, 5-6) qapanır.</T>
      <T x={570} y={548}>F2 95–96 termik relenin köməkçi NC</T>
      <T x={570} y={566}>kontaktıdır, F2 işləsə dövrə açılır.</T>
    </svg>
  );
}
