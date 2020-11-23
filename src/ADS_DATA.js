const ADS_DATA = [
  // {
  //   id: 1,
  //   category: 'driver',
  //   title: 'Kierowca C+E',
  //   license: 'C/E',
  //   region: 'eu',
  //   system: '3/1',
  //   salary: '5000-6000',
  //   currency: 'PLN',
  //   info: 'Praca na terenie EU, nowy tabor, wysokie wynagrodznie',
  // },
  // {
  //   id: 2,
  //   category: 'driver',
  //   title: 'Kierowca C',
  //   license: 'C',
  //   region: 'Polska',
  //   system: 'dzienny',
  //   salary: '3000-3500',
  //   currency: 'PLN',
  //   info:
  //     'Szukamy kierowcy do pracy na terenie ślaska z dziennymi zjazdami na bazę w Chorzowie.',
  // },
  // {
  //   id: 3,
  //   category: 'forklift',
  //   title: 'Operator wózka widłowego',
  //   region: 'Katowice',
  //   system: '3 zmiany',
  //   salary: '3000',
  //   currency: 'PLN',
  //   info:
  //     'Praca na magazynie centralnym dużej sieci sklepów spożywczych. Wymagana książeczka sanepidowoska, uprawnienia do prowadzenia wózków widłowych, dobry stan zdrowia, dyspozycyjność również w weekendy',
  // },
  // {
  //   id: 4,
  //   category: 'forklift',
  //   title: 'Operator wózka',
  //   region: 'Chorzów',
  //   system: '6-14',
  //   salary: '2400',
  //   currency: 'PLN',
  //   info:
  //     'Praca na magazynie centralnym dużej sieci sklepów spożywczych. Wymagana książeczka sanepidowoska, uprawnienia do prowadzenia wózków widłowych, dobry stan zdrowia, dyspozycyjność również w weekendy',
  // },
  // {
  //   id: 5,
  //   category: 'forklift',
  //   title: 'Operator wózka widłowego',
  //   region: 'Sosnowiec',
  //   system: '2 zmiany',
  //   salary: '3200',
  //   currency: 'PLN',
  //   info:
  //     'Praca na magazynie centralnym dużej sieci sklepów spożywczych. Wymagana książeczka sanepidowoska, uprawnienia do prowadzenia wózków widłowych, dobry stan zdrowia, dyspozycyjność również w weekendy',
  // },
  // {
  //   id: 6,
  //   category: 'warehouse',
  //   title: 'Magazynier',
  //   region: 'Katowice',
  //   system: '3 zmiany',
  //   salary: '2850',
  //   currency: 'PLN',
  //   info:
  //     'Praca na magazynie centralnym dużej sieci sklepów spożywczych. Wymagana książeczka sanepidowoska, uprawnienia do prowadzenia wózków widłowych, dobry stan zdrowia, dyspozycyjność również w weekendy',
  // },
  // {
  //   id: 7,
  //   category: 'office',
  //   title: 'Samodzielny spedytor międzynarodowy',
  //   region: 'Mikołów',
  //   system: 'zdalnie',
  //   salary: '4000 - 11000',
  //   currency: 'PLN',
  //   info:
  //     'Poszukujemy spedytorów z doświadczeniem oraz własną bazą kontrahentów oraz przewoźników. Gwarantujemy wysoką prowizję!',
  // },
  // {
  //   id: 8,
  //   category: 'office',
  //   title: 'Kierownik działu spedycji',
  //   region: 'Mikołów',
  //   system: '8-16',
  //   salary: '',
  //   currency: 'PLN',
  //   info:
  //     'Wymagane doświadczenie na podobnym stanowisku minimum 3 lata, dobra organizajca pracy, umiejętność zarządzania zespołem. Oferujemy konkurencyjne wynagrodzenie, kartę Multisport, możliwość awansu, ciekawe projekty',
  // },
];

const categories = ['warehouse', 'office', 'driver', 'forklift'];

// for (let i = 0; i < 20; i++) {
//   let index = Math.floor(Math.random() * 4);
//   ADS_DATA.push({
//     id: i,
//     category: categories[index],
//     title: categories[index],
//     region: 'Mikołów',
//     system: '8-16',
//     salary: {
//       fixed: null,
//       from: 2500,
//       to: 3100,
//       currency: 'PLN',
//     },

//     info: 'Praca na terenie EU, nowy tabor, wysokie wynagrodznie',
//     addedAt: new Date(1605872489563 - i * 2500000),
//   });
// }

// for (let i = 0; i < 30; i++) {
//   let index = Math.floor(Math.random() * 4);
//   ADS_DATA.push({
//     id: i,
//     category: categories[index],
//     title: categories[index],
//     region: 'Warszawa',
//     system: '8-16',
//     salary: {
//       fixed: 4500,
//       from: null,
//       to: null,
//       currency: 'PLN',
//     },

//     info:
//       'Poszukujemy spedytorów z doświadczeniem oraz własną bazą kontrahentów oraz przewoźników. Gwarantujemy wysoką prowizję!',
//     addedAt: new Date(1605872489563 - i * 3200000),
//   });
// }

for (let i = 0; i < 50; i++) {
  let index = Math.floor(Math.random() * 4);
  ADS_DATA.push({
    id: i,
    addedAt: new Date(1605872489563 - i * 7000000),
    addedBy: {
      id: '',
      displayName: '',
      email: '',
      phone: 12345678,
    },
    category: categories[index],
    title: categories[index],
    highlights: {
      region: 'EU',
      system: '3/1',
      contract: 'UoP',
      license: 'C/E',
    },
    salary: {
      fixed: null,
      from: 5600,
      to: 8500,
      currency: 'PLN',
    },
    adSections: {
      info:
        'Szukamy kierowcy do pracy na terenie ślaska z dziennymi zjazdami na bazę w Chorzowie.',
      requirements: 'requirements',
      offer: 'offer',
      benefits: 'benefits',
      aboutEmployer: 'aboutEmployer',
    },
  });
}

const ad = {
  id: 1,
  addedAt: new Date(),
  addedBy: {
    id: '',
    displayName: '',
    email: '',
    phone: 12345678,
  },
  category: 'driver',
  title: 'Kierowca C+E',
  highlights: {
    region: 'eu',
    system: '3/1',
    contract: 'UoP',
    license: 'C/E',
  },
  salary: {
    fixed: null,
    from: null,
    to: null,
    currency: 'PLN',
  },
  adSections: {
    info: 'Praca na terenie EU, nowy tabor, wysokie wynagrodznie',
    requirements: '',
    offer: '',
    benefits: '',
    aboutEmployer: '',
  },
};

export default ADS_DATA;
