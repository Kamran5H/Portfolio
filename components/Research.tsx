const PAPERS = [
  { img: '/assets/images/research/03_Ce_Doped_NiCo_MOF_3D.png', title: 'Cerium modulation of NiCo-MOFs for ORR/OER', where: 'MPhil thesis · QAU · DFT + experiment', state: 'In progress' },
  { img: '/assets/images/research/04_ORR_OER_Reaction_Intermediates.png', title: 'Why the corner is empty: trade-offs in rechargeable Zn–air batteries', where: 'with Prof. Safeer Ahmed', state: 'Under review' },
  { img: '/assets/images/research/01_BDC_Linker_Structure.png', title: 'Grafting ethyl acetoacetate onto chitosan', where: 'FTIR + B3LYP evidence · Fe₃O₄ hydrogels', state: 'Manuscript' },
  { img: '/assets/images/research/02_Pristine_NiCo_MOF_2D_3D.png', title: 'Green CaO nanoparticles & a PANi urea biosensor', where: 'BS thesis · University of the Punjab', state: '2024' },
];

export default function Research() {
  return (
    <section id="research" className="border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-8 sm:py-32">
        <div className="reveal mb-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="display text-5xl sm:text-7xl">The day job</h2>
          <p className="max-w-sm text-paper-dim lg:justify-self-end">Electrocatalysts for zinc–air batteries, modelled in Quantum ESPRESSO and tested at the bench.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAPERS.map((p, i) => (
            <figure key={p.title} className="reveal group" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="aspect-square overflow-hidden rounded-2xl border border-line bg-[#f4f1ea]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              </div>
              <figcaption className="mt-4">
                <div className="meta text-signal">{p.state}</div>
                <div className="mt-2 leading-snug">{p.title}</div>
                <div className="mt-1 text-sm text-paper-faint">{p.where}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
