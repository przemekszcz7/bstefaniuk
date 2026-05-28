/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Offer } from './types';

export const OFFERS: Offer[] = [
  {
    id: 'mieszkanie-chomiczowka',
    category: 'mieszkanie',
    categoryLabel: 'MIESZKANIE',
    tag: 'NOWOŚĆ',
    image: 'https://i.ibb.co/zWR58Q5w/655956716-122100479780949442-4520250554536345060-n.jpg',
    title: 'Mieszkanie 3-pokojowe po remoncie — Chomiczówka, Warszawa',
    shortDescription: 'W pełni wyposażone mieszkanie po remoncie z nowoczesnymi instalacjami. Idealne dla rodziny lub jako inwestycja z potencjałem wynajmu 5 000 PLN/mies.',
    fullDescription: 'Zapraszam do zapoznania się z ofertą wyjątkowego, 3-pokojowego mieszkania zlokalizowanego na warszawskiej Chomiczówce. Lokal przeszedł generalny remont obejmujący wymianę instalacji elektrycznej oraz hydraulicznej, wyrównanie tynków oraz montaż nowej stolarki drzwiowej. \n\nMieszkanie zostało wykończone z dbałością o każdy szczegół, z użyciem materiałów najwyższej jakości. Kuchnia została w pełni wyposażona w nowoczesny sprzęt AGD w zabudowie meblowej robionej na zamówienie. Przestronny salon zapewnia komfortowy odpoczynek, a dwie oddzielne sypialnie idealnie sprawdzą się jako pokoje dziecięce lub gabinet do pracy zdalnej. \n\nLokalizacja zapewnia doskonałą komunikację z każdą częścią Warszawy – w pobliżu przystanki autobusowe i tramwajowe oraz dogodny dojazd do stacji Metro Młociny. Okolica charakteryzuje się bogatą infrastrukturą handlowo-usługową, bliskością szkół, przedszkoli oraz urokliwych terenów rekreacyjnych i parków.',
    pills: ['3 pokoje', 'Po remoncie', 'Metro Młociny', 'Wyposażone'],
    price: 'Zapytaj o cenę',
    location: 'Warszawa, Chomiczówka (woj. mazowieckie)',
    features: [
      { label: 'Metraż', value: '58 m²' },
      { label: 'Liczba pokoi', value: '3 pokoje' },
      { label: 'Piętro', value: '3 z 10 (z windą)' },
      { label: 'Stan wykończenia', value: 'Po remoncie generalnym' },
      { label: 'Czynsz administracyjny', value: '720 PLN' },
      { label: 'Forma własności', value: 'Własność z KW' }
    ],
    dateLabel: 'Nowa oferta'
  },
  {
    id: 'dzialka-szczytno',
    category: 'dzialka',
    categoryLabel: 'DZIAŁKA INWESTYCYJNA',
    tag: 'PREMIUM',
    image: 'https://i.ibb.co/Xx0wNFB6/656794178-122099652500949442-7744523306428760816-n.jpg',
    title: 'Teren inwestycyjny 7,12 ha nad jeziorem — Szczytno, Warmia i Mazury',
    shortDescription: '71 248 m² nad jeziorem Domowym Dużym. Bezpośrednia linia brzegowa, MPZP (U/UT/US), dostęp do mediów. Scenariusze: hotel, resort, domki inwestycyjne. 3 km do centrum.',
    fullDescription: 'Wyjątkowy teren inwestycyjny o łącznej powierzchni 7,12 ha (71 248 m²), malowniczo usytuowany bezpośrednio nad jeziorem Domowym Dużym w Szczytnie, na Warmii i Mazurach. To jedna z nielicznych tak spektakularnych nieruchomości z bezpośrednią linią brzegową – gwarantująca najwyższy prestiż i unikalność inwestycji.\n\nDla oferowanego obszaru obowiązuje Miejscowy Plan Zagospodarowania Przestrzennego (MPZP) oznaczony symbolami U/UT/US, który zezwala na realizację usług turystycznych, rekreacyjnych, obiektów hotelowych, usług sportowych, a także ekskluzywnych osiedli domków inwestycyjnych czy rezydencjonalnych.\n\nTeren posiada pełny dostęp do niezbędnych mediów (prąd, woda, kanalizacja, gaz w drodze). Doskonały dojazd drogami asfaltowymi oraz zaledwie 3-kilometrowa odległość do urokliwego centrum Szczytna czynią to miejsce idealnym na budowę luksusowego hotelu, resortu SPA lub prestiżowej osady wakacyjnej o wysokiej stopie zwrotu (ROI).',
    pills: ['7,12 ha', 'Nad jeziorem', 'MPZP', 'Warmia i Mazury', 'ROI'],
    price: 'Cena na zapytanie',
    location: 'Szczytno, woj. warmińsko-mazurskie',
    features: [
      { label: 'Powierzchnia', value: '71 248 m² (7,12 ha)' },
      { label: 'Długość linii brzegowej', value: 'ok. 320 metrów' },
      { label: 'Przeznaczenie w MPZP', value: 'Turystyka, hotelarstwo, usługi sportu (U/UT/US)' },
      { label: 'Infrastruktura', value: 'Dojazd asfaltowy, media przy granicy' },
      { label: 'Ukształtowanie terenu', value: 'Lekko faliste, zalesione w części' },
      { label: 'Odległość', value: '3 km od centrum Szczytna, 15 km od lotniska Olsztyn-Mazury' }
    ],
    dateLabel: 'Oferta Premium'
  },
  {
    id: 'dom-stasi-las',
    category: 'dom',
    categoryLabel: 'DOM',
    tag: 'POLECANE',
    image: 'https://i.ibb.co/G4G7jPgT/655802110-122099648582949442-7169247095601942994-n.jpg',
    title: 'Dom wolnostojący 207 m² z basenem — Stasi Las, Zalew Zegrzyński',
    shortDescription: 'Nowoczesny dom z 2017 roku — 5 pokoi, przestronny salon z wyjściem na taras, własny basen, ogród 800 m². Szybki dojazd do Warszawy.',
    fullDescription: 'Przedstawiamy Państwu luksusowy, wolnostojący dom o powierzchni użytkowej 207 m², zlokalizowany w malowniczej i spokojnej miejscowości Stasi Las, tuż obok Zalewu Zegrzyńskiego (gmina Serock). Dom został wybudowany w 2017 roku przy użyciu zaawansowanych technologicznie i ekologicznych materiałów konstrukcyjnych.\n\nSercem domu jest imponujący, świetnie doświetlony salon połączony z jadalnią oraz w pełni wyposażoną, luksusową kuchnią z wyspą kuchenną. Bezpośrednie wyjście z salonu prowadzi na przestronny, zadaszony taras oraz znakomicie utrzymany ogród o powierzchni 800 m², na którym znajduje się wbudowany basen z nowoczesnym systemem filtracji i podgrzewania wody.\n\nNa piętrze zlokalizowano strefę prywatną: trzy duże, klimatyzowane sypialnie (w tym master bedroom z własną garderobą i pokojem kąpielowym) oraz dodatkową łazienkę. Nad bezpieczeństwem mieszkańców czuwa nowoczesny monitoring oraz instalacja alarmowa. Garaż dwustanowiskowy w bryle budynku stanowi dodatkowy atut.',
    pills: ['207 m²', '5 pokoi', 'Basen', 'Ogród 800m²', 'Rok 2017'],
    price: 'Zapytaj o cenę',
    location: 'Stasi Las, gmina Serock (woj. mazowieckie)',
    features: [
      { label: 'Powierzchnia użytkowa', value: '207 m²' },
      { label: 'Powierzchnia działki', value: '800 m²' },
      { label: 'Liczba pokoi', value: '5 pokoi (w tym 4 sypialnie)' },
      { label: 'Rok budowy', value: '2017 r.' },
      { label: 'Garaż', value: 'Dwustanowiskowy w bryle budynku' },
      { label: 'Udogodnienia', value: 'Własny basen, klimatyzacja, rekuperacja, pompa ciepła' }
    ],
    dateLabel: 'Oferta Polecana'
  }
];

export const OFFICE_STATS = [
  {
    number: '12+',
    label: 'Lat doświadczenia',
    description: 'Rzetelności, popartej setkami udanych transakcji na rynku.'
  },
  {
    number: '100%',
    label: 'Bezpieczeństwa',
    description: 'Indywidualna weryfikacja stanu prawnego każdej nieruchomości.'
  },
  {
    number: 'Ogólnopolski',
    label: 'Zasięg działania',
    description: 'Szczególne skupienie na Warszawie, Mazowszu oraz Warmii i Mazurach.'
  }
];

export const LOCATIONS = [
  {
    id: 1,
    title: 'Warszawa i Mazowsze',
    subtitle: 'Chomiczówka, Stasi Las, Zegrze i okolice',
    desc: 'Wyszukiwanie prestiżowych apartamentów miejskich, komfortowych domów jednorodzinnych wokół aglomeracji warszawskiej oraz willi nad Zalewem Zegrzyńskim.',
    slug: 'warszawa-mazowsze'
  },
  {
    id: 2,
    title: 'Warmia i Mazury',
    subtitle: 'Szczytno, Mazury — tereny nad jeziorami',
    desc: 'Unikalne grunty z linią brzegową, działki rekreacyjne, pensjonaty i tereny komercyjne dedykowane relaksowi i ekskluzywnym konceptom turystycznym.',
    slug: 'warmia-mazury'
  },
  {
    id: 3,
    title: 'Cała Polska',
    subtitle: 'Oferty inwestycyjne w atrakcyjnych lokalizacjach',
    desc: 'Dostęp do gruntów inwestycyjnych pod hotele, deweloperkę mieszkaniową i parki logistyczne na terenie całego kraju na zamówienie indywidualne klientów.',
    slug: 'polska'
  }
];
