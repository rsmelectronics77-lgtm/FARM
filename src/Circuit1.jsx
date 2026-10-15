const T = ({ x, y, children, a = "middle", b }) => <text x={x} y={y} textAnchor={a} fontWeight={b ? 700 : 400}>{children}</text>;
const Dot = ({ x, y }) => <circle cx={x} cy={y} r="4" className="dot" />;
const Box = ({ x, y, w, h, l, s }) => (<g><rect x={x} y={y} width={w} height={h} rx="6" className="box" /><T x={x + w / 2} y={y + h / 2 - 2} b>{l}</T><T x={x + w / 2} y={y + h / 2 + 14}>{s}</T></g>);
export default function Circuit1() {
  return (
    <svg viewBox="0 0 660 360" role="img" aria-label="24 V DC START/STOP kontaktor idarəetmə sxemi" className="circuit">
      <g className="wire">
        <line x1="30" y1="40" x2="630" y2="40" className="p" /><line x1="30" y1="320" x2="630" y2="320" className="n" />
        <path d="M80 40V80M80 130V200H140M140 170V230M140 170H175M245 170H300M140 230H175M245 230H300M300 170V230M300 200H460M460 200V220M460 270V320M460 200H560M560 200V225M560 255V320" />
      </g>
      <T x="36" y="30" a="start" b>+24 V</T><T x="36" y="340" a="start" b>0 V</T>
      <Box x={55} y={80} w={50} h={50} l="S1" s="STOP NC" />
      <T x={116} y={100} a="start">1</T><T x={116} y={122} a="start">2</T>
      <Box x={175} y={152} w={70} h={36} l="S2" s="START NO" />
      <Box x={175} y={212} w={70} h={36} l="K1" s="13 – 14" />
      <Box x={430} y={220} w={60} h={50} l="K1" s="bobin" />
      <T x={474} y={216} a="start">A1</T><T x={474} y={286} a="start">A2</T>
      <circle cx="560" cy="240" r="15" className="box" /><T x="560" y="244" b>H1</T>
      <Dot x={140} y={200} /><Dot x={300} y={200} /><Dot x={460} y={200} />
      <T x={140} y={192} b>A</T><T x={300} y={192} b>B</T>
      <T x={210} y={270}>K1 kontaktı START-a PARALELDİR</T>
    </svg>
  );
}
