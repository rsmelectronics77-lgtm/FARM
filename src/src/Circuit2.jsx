const T = ({ x, y, children, a = "middle", b }) => <text x={x} y={y} textAnchor={a} fontWeight={b ? 700 : 400}>{children}</text>;
const Dot = ({ x, y }) => <circle cx={x} cy={y} r="4" className="dot" />;
const Box = ({ x, y, w, h, l, s }) => (<g><rect x={x} y={y} width={w} height={h} rx="6" className="box" /><T x={x + w / 2} y={y + h / 2 - 2} b>{l}</T>{s && <T x={x + w / 2} y={y + h / 2 + 14}>{s}</T>}</g>);
export default function Circuit2() {
  return (
    <svg viewBox="0 0 760 520" role="img" aria-label="Kontaktorla üçfazalı mühərrikin idarə edilməsi: güc və idarəetmə dövrəsi" className="circuit">
      <T x={140} y={20} b>GÜC DÖVRƏSİ (3~ 400 V)</T>
      <T x={560} y={20} b>İDARƏETMƏ DÖVRƏSİ (24 V DC)</T>
      <g className="wire">
        <path d="M80 40V70M140 40V70M200 40V70M80 120V170M140 120V170M200 120V170M80 230V280M140 230V280M200 230V280M80 330V390M140 330V390M200 330V390" />
        <path d="M380 40H740M380 480H740" />
        <path d="M430 40V70M430 120V140M430 190V245H490M490 205V285M490 205H520M600 205H640M490 285H520M600 285H640M640 205V285M640 245H690V265M690 315V480" />
      </g>
      <T x={80} y={36}>L1</T><T x={140} y={36}>L2</T><T x={200} y={36}>L3</T>
      <Box x={55} y={70} w={170} h={50} l="Q1" s="3P qoruyucu avtomat" />
      <Box x={55} y={170} w={170} h={60} l="K1" s="əsas kontaktlar" />
      <T x={72} y={186} a="end">1</T><T x={132} y={186} a="end">3</T><T x={192} y={186} a="end">5</T>
      <T x={72} y={222} a="end">2</T><T x={132} y={222} a="end">4</T><T x={192} y={222} a="end">6</T>
      <Box x={55} y={280} w={170} h={50} l="F2" s="termik rele" />
      <Box x={55} y={390} w={170} h={70} l="M1  3~" s="üçfazalı mühərrik" />
      <T x={72} y={406} a="end">U</T><T x={132} y={406} a="end">V</T><T x={192} y={406} a="end">W</T>
      <T x={140} y={490}>PE (torpaqlama) mühərrikin gövdəsinə qoşulur</T>
      <T x={386} y={34} a="start" b>+24 V</T><T x={386} y={500} a="start" b>0 V</T>
      <Box x={405} y={70} w={50} h={50} l="S1" s="STOP NC" />
      <T x={466} y={90} a="start">1</T><T x={466} y={112} a="start">2</T>
      <Box x={405} y={140} w={50} h={50} l="F2" s="95–96 NC" />
      <Box x={520} y={187} w={80} h={36} l="S2" s="START NO" />
      <Box x={520} y={267} w={80} h={36} l="K1" s="13 – 14" />
      <Box x={660} y={265} w={60} h={50} l="K1" s="bobin" />
      <T x={702} y={262} a="start">A1</T><T x={702} y={330} a="start">A2</T>
      <Dot x={430} y={245} /><Dot x={640} y={245} />
      <T x={430} y={238} b>A</T><T x={640} y={238} b>B</T>
      <T x={560} y={340}>K1 bobini çəkəndə güc dövrəsindəki</T>
      <T x={560} y={358}>K1 əsas kontaktları (1-2, 3-4, 5-6) qapanır</T>
      <T x={560} y={400}>F2 95–96 NC termik relenin köməkçi</T>
      <T x={560} y={418}>kontaktıdır, F2 işləsə dövrə açılır</T>
    </svg>
  );
}
