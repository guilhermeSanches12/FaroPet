// Seed de vacinas do cenario brasileiro
// Execute com: npx ts-node src/database/seeds/vaccines.seed.ts
// Ou integre a um script de seed no package.json

export const VACCINE_SEEDS = [
  // Caes
  {
    name: 'Vacina Polivalente V10',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra Cinomose, Parvovirose, Coronavirose, Adenovirose, Hepatite Infecciosa, Parainfluenza e 4 tipos de Leptospirose. Essencial para caes.',
  },
  {
    name: 'Vacina Polivalente V8',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra Cinomose, Parvovirose, Coronavirose, Adenovirose, Hepatite Infecciosa, Parainfluenza e 2 tipos de Leptospirose.',
  },
  {
    name: 'Vacina Antirrábica (Caes)',
    manufacturer: 'Disponivel no Mercado',
    description: 'Protege contra a Raiva. Obrigatoria anualmente em todo o territorio nacional.',
  },
  {
    name: 'Gripe Canina (Tosse dos Canis)',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra a Traqueobronquite Infecciosa Canina causada pela bacteria Bordetella bronchiseptica e virus da Parainfluenza.',
  },
  {
    name: 'Vacina contra Giardíase',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra a infeccao pelo protozoario Giardia lamblia, que causa fortes diarreias.',
  },
  {
    name: 'Vacina contra Leishmaniose',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Indicada para caes em regioes endemicas do Brasil para prevencao da Leishmaniose Visceral Canina.',
  },
  // Gatos
  {
    name: 'Vacina Quádrupla Felina (V4)',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra Panleucopenia, Calicivirose, Rinotraqueite e Clamidiose. Essencial para gatos.',
  },
  {
    name: 'Vacina Quíntupla Felina (V5)',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra Panleucopenia, Calicivirose, Rinotraqueite, Clamidiose e FeLV (Leucemia Felina).',
  },
  {
    name: 'Vacina Tríplice Felina (V3)',
    manufacturer: 'Disponivel no Mercado',
    description:
      'Protege contra as principais doencas virais felinas: Panleucopenia, Calicivirose e Rinotraqueite.',
  },
  {
    name: 'Vacina Antirrábica (Gatos)',
    manufacturer: 'Disponivel no Mercado',
    description: 'Protege os felinos contra a Raiva. Obrigatoria anualmente.',
  },
  {
    name: 'Outra Vacina',
    manufacturer: 'Nao Especificado',
    description: 'Registro de vacina personalizada ou nao listada no catalogo padrao.',
  },
] as const;
