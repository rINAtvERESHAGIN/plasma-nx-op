
const t = [
  /* 0 */[0, 1, 2, 3, 4, 5, '*', 7, undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 1 */[0, 1, 2, 3, 4, '*', 6, 7, undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 2 */['*', 1, '*', 3, '*', '*', '*', '*', '*', '*', 10, 11, 12, '*', 14, 15, '*', '*', 18],
  /* 3 */['*', 1, 2, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 17, 18],
  /* 4 */['*', 1, '*', 3, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 17, '*'],
  /* 5 */[0, 1, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', 18],
  /* 6 */[0, 1, '*', '*', '*', '*', '*', '*', '*', '*', 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 7 */[0, 1, 2, 3, 4, '*', '*', '*', undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* undefined */[0, 1, 2, '*', 4, '*', '*', '*', undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 9 */[0, 1, 2, 3, '*', '*', '*', '*', undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 10 */[0, 1, 2, 3, 4, '*', '*', '*', undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 11 */[0, 1, 2, 3, 4, 5, 6, '*', undefined, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
];

t.map((rowArr) => rowArr.map((rowCell) => {
  if (typeof rowCell === 'number') {
    return undefined;
  } return rowCell;
}));

const preReadyGrid = [
  [undefined, undefined, undefined, undefined, undefined, undefined, '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ['*', undefined, '*', undefined, '*', '*', '*', '*', '*', '*', undefined, undefined, undefined, '*', undefined, undefined, '*', '*', undefined],
  ['*', undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined, undefined],
  ['*', undefined, '*', undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined, '*'],
  [undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined],
  [undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, '*', undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, '*', '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
];
const preReadyGridWithName = [
  [{ name: 'Санкт-Петербург и область', shortName: 'Спб' }, undefined, undefined, undefined, undefined, undefined, { name: 'Мурманская область', shortName: 'Мур' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [{ name: 'Москва и Московская обл', shortName: 'Мск' }, undefined, undefined, undefined, undefined, { name: 'Карелия', shortName: 'Кар' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ['*', undefined, '*', undefined, '*', '*', '*', '*', '*', '*', undefined, undefined, undefined, '*', undefined, undefined, '*', '*', undefined],
  ['*', undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined, undefined],
  ['*', undefined, '*', undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined, '*'],
  [undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', undefined],
  [undefined, undefined, '*', '*', '*', '*', '*', '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, '*', undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, '*', '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, '*', '*', '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, '*', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
];
const color1Hex = '#feafaf';
const color2Hex = '#a4dff5';
const color3Hex = '#fcd99c';
const color4Hex = '#b1dc94';
const color5Hex = '#d7bcf6';
type HexColor = '#feafaf' | '#a4dff5' | '#fcd99c' | '#b1dc94' | '#d7bcf6'

export interface Region {
  name: string
  shortName: string
  marker: HexColor
}

const getRegion = (name: string, shortName: string, marker: HexColor): Region => ({ marker, name, shortName });

const numberMatrix = [
  /* 0 */[{ name: 'Санкт-Петербург и область', shortName: 'Спб', marker: color1Hex }, 1, 2, 3, { name: 'Мурманская область', shortName: 'Мур', marker: color2Hex }, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, { shortName: 'Чук', marker: color3Hex, name: 'Чукотский АО' }, { shortName: 'Кам', marker: color3Hex, name: 'Камчатский край' }, 18],
  /* 1 */[{ name: 'Москва и Московская обл', shortName: 'Мск', marker: color1Hex }, 1, 2, getRegion('Республика Карелия', 'Кар', color2Hex), 4, 5, 6, 7, 8, getRegion('Ненецкий АО', 'Нен', color2Hex), getRegion('Ямало-Ненецкий АО', 'Ямал', color5Hex), 11, 12, getRegion('Красноярский край', 'Крас', color1Hex), 14, getRegion('Сахалинская область', 'Сах', color3Hex), getRegion('Магаданская область', 'Маг', color3Hex), 17, 18],
  /* 2 */[0, 1, getRegion('Ленинградская область', 'Лен', color2Hex), getRegion('Новгородская область', 'Новг', color2Hex), getRegion('Волгоградская область', 'Вол', color2Hex), 5, 6, 7, getRegion('Архангельская область', 'Арх', color2Hex), getRegion('Республика Коми', 'Коми', color2Hex), getRegion('Ханты-Мансийский АО — Югра', 'Хан', color5Hex), getRegion('Тюменская область', 'Тюм', color5Hex), getRegion('Томская область', 'Томс', color1Hex), getRegion('Кемеровская область — Кузбасс', 'Кем', color1Hex), getRegion('Иркутская область', 'Ирк', color1Hex), getRegion('Амурская область', 'Амур', color3Hex), getRegion('Хабаровский край', 'Хаб', color3Hex), 17, getRegion('Сахалинская область', 'Схлн', color3Hex)],
  /* 3 */[getRegion('Калининградская область', 'Кали', color2Hex), 1, getRegion('Псковская область', 'Пск', color2Hex), getRegion('Тверская область', 'Твер', color1Hex), getRegion('Ярославская область', 'Яро', color1Hex), getRegion('Ивановская область', 'Ива', color1Hex), getRegion('Костромская область', 'Кос', color1Hex), getRegion('Республика Марий Эл', 'Мари', color3Hex), getRegion('Кировская область', 'Кир', color3Hex), getRegion('Пермский край', 'Пер', color3Hex), getRegion('Свердловская область', 'Свер', color5Hex), getRegion('Курганская область', 'Кург', color5Hex), getRegion('Новосибирская область', 'Ново', color1Hex), getRegion('Республика Хакасия', 'Хак', color1Hex), getRegion('Республика Бурятия', 'Бур', color1Hex), getRegion('Еврейская АО', 'Евр', color3Hex), 16, 17, 18],
  /* 4 */[0, 1, getRegion('Смоленская область', 'Смол', color1Hex), getRegion('Калужская область', 'Калу', color1Hex), getRegion('Московская область', 'Мос', color1Hex), getRegion('Владимирская область', 'Вла', color1Hex), getRegion('Нижегородская область', 'Ниж', color3Hex), getRegion('Чувашская Республика — Чувашия', 'Чув', color3Hex), getRegion('Республика Татарстан', 'Тат', color3Hex), getRegion('Удмуртская Республика', 'Удм', color3Hex), getRegion('Челябинская область', 'Чел', color5Hex), getRegion('Омская область', 'Омск', color1Hex), getRegion('Алтайский край', 'Ал.К', color1Hex), getRegion('Республика Тыва', 'Тыва', color1Hex), getRegion('Забайкальский край', 'Заб', color1Hex), 15, getRegion('Приморский край', 'При', color1Hex), 17, 18],
  /* 5 */[0, 1, getRegion('Брянская область', 'Бря', color1Hex), getRegion('Орловская область', 'Орел', color1Hex), getRegion('Тульская область', 'Тул', color1Hex), getRegion('Рязанская область', 'Ряз', color1Hex), getRegion('Республика Мордовия', 'Мор', color3Hex), getRegion('Ульяновская область', 'Уль', color3Hex), getRegion('Самарская область', 'Сам', color3Hex), getRegion('Республика Башкортостан', 'Бшк', color3Hex), 10, 11, getRegion('Алтайский край', 'Алт', color1Hex), 13, 14, 15, 16, 17, 18],
  /* 6 */[0, 1, getRegion('Курская область', 'Курск', color1Hex), getRegion('Липецкая область', 'Лип', color1Hex), getRegion('Тамбовская область', 'Там', color1Hex), getRegion('Пензенская область', 'Пен', color3Hex), getRegion('Саратовская область', 'Сар', color3Hex), getRegion('Оренбургская область', 'Орен', color3Hex), 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 7 */[0, 1, 2, 3, getRegion('Белгородская область', 'Бел', color1Hex), getRegion('Воронежская область', 'Вор', color1Hex), getRegion('Волгоградская область', 'Волг', color4Hex), 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 8 */[0, 1, getRegion('Республика Крым', 'Крым', color4Hex), getRegion('Республика Адыгея', 'Адыг', color4Hex), getRegion('Краснодарский край', 'Крдр', color4Hex), getRegion('Ростовская область', 'Рос', color4Hex), getRegion('Республика Калмыкия', 'Калм', color4Hex), getRegion('Астраханская область', 'Аст', color4Hex), 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 9 */[0, 1, 2, 3, getRegion('Карачаево-Черкесская Республика', 'Кара', color5Hex), getRegion('Ставропольский край', 'Став', color5Hex), getRegion('Чеченская Республика', 'Чеч', color5Hex), getRegion('Республика Дагестан', 'Даг', color5Hex), 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  /* 10 */[0, 1, 2, 3, getRegion('Кабардино-Балкарская Республика', 'Каб', color5Hex), getRegion('Республика Северная Осетия', 'Осет', color5Hex), getRegion('Республика Ингушетия', 'Инг', color5Hex), 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
];

export const plateMapRussionRegion = [
  [
    { name: 'Санкт-Петербург и область', shortName: 'Спб', marker: '#feafaf' },
    undefined, undefined, undefined,
    { name: 'Мурманская область', shortName: 'Мур', marker: '#a4dff5' },
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    { shortName: 'Чук', marker: '#fcd99c', name: 'Чукотский АО' },
    { shortName: 'Кам', marker: '#fcd99c', name: 'Камчатский край' }, undefined
  ],
  // - - - - - - - - - - - - -
  [
    { name: 'Москва и Московская обл', shortName: 'Мск', marker: '#feafaf' }, undefined, undefined,
    { marker: '#a4dff5', name: 'Республика Карелия', shortName: 'Кар' },
    undefined, undefined, undefined, undefined, undefined,
    { marker: '#a4dff5', name: 'Ненецкий АО', shortName: 'Нен' },
    { marker: '#d7bcf6', name: 'Ямало-Ненецкий АО', shortName: 'Ямал' }, undefined, undefined,
    { marker: '#feafaf', name: 'Красноярский край', shortName: 'Крас' }, undefined,
    { marker: '#fcd99c', name: 'Сахалинская область', shortName: 'Сах' },
    { marker: '#fcd99c', name: 'Магаданская область', shortName: 'Маг' }, undefined, undefined
  ],
  // - - - - - - - - - - - -
  [
    undefined, undefined,
    { marker: '#a4dff5', name: 'Ленинградская область', shortName: 'Лен' },
    { marker: '#a4dff5', name: 'Новгородская область', shortName: 'Новг' },
    { marker: '#a4dff5', name: 'Волгоградская область', shortName: 'Вол' }, undefined, undefined, undefined,
    { marker: '#a4dff5', name: 'Архангельская область', shortName: 'Арх' },
    { marker: '#a4dff5', name: 'Республика Коми', shortName: 'Коми' },
    { marker: '#d7bcf6', name: 'Ханты-Мансийский АО — Югра', shortName: 'Хан' },
    { marker: '#d7bcf6', name: 'Тюменская область', shortName: 'Тюм' },
    { marker: '#feafaf', name: 'Томская область', shortName: 'Томс' },
    { marker: '#feafaf', name: 'Кемеровская область — Кузбасс', shortName: 'Кем' },
    { marker: '#feafaf', name: 'Иркутская область', shortName: 'Ирк' },
    { marker: '#fcd99c', name: 'Амурская область', shortName: 'Амур' },
    { marker: '#fcd99c', name: 'Хабаровский край', shortName: 'Хаб' }, undefined,
    { marker: '#fcd99c', name: 'Сахалинская область', shortName: 'Схлн' }
  ],
  // - - - - - - - - - - - -
  [
    { marker: '#a4dff5', name: 'Калининградская область', shortName: 'Кали' },
    undefined, { marker: '#a4dff5', name: 'Псковская область', shortName: 'Пск' },
    { marker: '#feafaf', name: 'Тверская область', shortName: 'Твер' },
    { marker: '#feafaf', name: 'Ярославская область', shortName: 'Яро' },
    { marker: '#feafaf', name: 'Ивановская область', shortName: 'Ива' },
    { marker: '#feafaf', name: 'Костромская область', shortName: 'Кос' },
    { marker: '#fcd99c', name: 'Республика Марий Эл', shortName: 'Мари' },
    { marker: '#fcd99c', name: 'Кировская область', shortName: 'Кир' },
    { marker: '#fcd99c', name: 'Пермский край', shortName: 'Пер' },
    { marker: '#d7bcf6', name: 'Свердловская область', shortName: 'Свер' },
    { marker: '#d7bcf6', name: 'Курганская область', shortName: 'Кург' },
    { marker: '#feafaf', name: 'Новосибирская область', shortName: 'Ново' },
    { marker: '#feafaf', name: 'Республика Хакасия', shortName: 'Хак' },
    { marker: '#feafaf', name: 'Республика Бурятия', shortName: 'Бур' },
    { marker: '#fcd99c', name: 'Еврейская АО', shortName: 'Евр' }, undefined, undefined, undefined
  ],
  // - - - - - - - - - - -
  [undefined, undefined, { marker: '#feafaf', name: 'Смоленская область', shortName: 'Смол' },
    { marker: '#feafaf', name: 'Калужская область', shortName: 'Калу' },
    { marker: '#feafaf', name: 'Московская область', shortName: 'Мос' },
    { marker: '#feafaf', name: 'Владимирская область', shortName: 'Вла' },
    { marker: '#fcd99c', name: 'Нижегородская область', shortName: 'Ниж' },
    { marker: '#fcd99c', name: 'Чувашская Республика — Чувашия', shortName: 'Чув' },
    { marker: '#fcd99c', name: 'Республика Татарстан', shortName: 'Тат' },
    { marker: '#fcd99c', name: 'Удмуртская Республика', shortName: 'Удм' },
    { marker: '#d7bcf6', name: 'Челябинская область', shortName: 'Чел' },
    { marker: '#feafaf', name: 'Омская область', shortName: 'Омск' },
    { marker: '#feafaf', name: 'Алтайский край', shortName: 'Ал.К' },
    { marker: '#feafaf', name: 'Республика Тыва', shortName: 'Тыва' },
    { marker: '#feafaf', name: 'Забайкальский край', shortName: 'Заб' },
    undefined, { marker: '#feafaf', name: 'Приморский край', shortName: 'При' }, undefined, undefined
  ],
  // - - - - - - - - - - -
  [undefined, undefined, { marker: '#feafaf', name: 'Брянская область', shortName: 'Бря' }, { marker: '#feafaf', name: 'Орловская область', shortName: 'Орел' }, { marker: '#feafaf', name: 'Тульская область', shortName: 'Тул' }, { marker: '#feafaf', name: 'Рязанская область', shortName: 'Ряз' }, { marker: '#fcd99c', name: 'Республика Мордовия', shortName: 'Мор' }, { marker: '#fcd99c', name: 'Ульяновская область', shortName: 'Уль' }, { marker: '#fcd99c', name: 'Самарская область', shortName: 'Сам' }, { marker: '#fcd99c', name: 'Республика Башкортостан', shortName: 'Бшк' }, undefined, undefined, { marker: '#feafaf', name: 'Алтайский край', shortName: 'Алт' }, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, { marker: '#feafaf', name: 'Курская область', shortName: 'Курск' }, { marker: '#feafaf', name: 'Липецкая область', shortName: 'Лип' }, { marker: '#feafaf', name: 'Тамбовская область', shortName: 'Там' }, { marker: '#fcd99c', name: 'Пензенская область', shortName: 'Пен' }, { marker: '#fcd99c', name: 'Саратовская область', shortName: 'Сар' }, { marker: '#fcd99c', name: 'Оренбургская область', shortName: 'Орен' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, { marker: '#feafaf', name: 'Белгородская область', shortName: 'Бел' }, { marker: '#feafaf', name: 'Воронежская область', shortName: 'Вор' }, { marker: '#b1dc94', name: 'Волгоградская область', shortName: 'Волг' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, { marker: '#b1dc94', name: 'Республика Крым', shortName: 'Крым' }, { marker: '#b1dc94', name: 'Республика Адыгея', shortName: 'Адыг' }, { marker: '#b1dc94', name: 'Краснодарский край', shortName: 'Крдр' }, { marker: '#b1dc94', name: 'Ростовская область', shortName: 'Рос' }, { marker: '#b1dc94', name: 'Республика Калмыкия', shortName: 'Калм' }, { marker: '#b1dc94', name: 'Астраханская область', shortName: 'Аст' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, { marker: '#d7bcf6', name: 'Карачаево-Черкесская Республика', shortName: 'Кара' }, { marker: '#d7bcf6', name: 'Ставропольский край', shortName: 'Став' }, { marker: '#d7bcf6', name: 'Чеченская Республика', shortName: 'Чеч' }, { marker: '#d7bcf6', name: 'Республика Дагестан', shortName: 'Даг' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, { marker: '#d7bcf6', name: 'Кабардино-Балкарская Республика', shortName: 'Каб' }, { marker: '#d7bcf6', name: 'Республика Северная Осетия', shortName: 'Осет' }, { marker: '#d7bcf6', name: 'Республика Ингушетия', shortName: 'Инг' }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]];

/* составить объект который будет совподать по ключам с данными которые приходят */

export const plateMapRussionRegionAsCodeName = [
  [
    'RU-SPE',
    null,
    null,
    null,
    'RU-MUR',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'RU-CHU',
    'RU-KAM',
    null
  ],
  [
    'RU-MOW',
    null,
    null,
    'RU-KR',
    null,
    null,
    null,
    null,
    null,
    'RU-NEN',
    'RU-YAN',
    null,
    null,
    'RU-KYA',
    null,
    'RU-SAK',
    'RU-MAG',
    null,
    null
  ],
  [
    null,
    null,
    'RU-LEN',
    'RU-NGR',
    'RU-VGG',
    null,
    null,
    null,
    'RU-ARK',
    'RU-KO',
    'RU-KHM',
    'RU-TYU',
    'RU-TOM',
    'RU-KEM',
    'RU-IRK',
    'RU-AMU',
    'RU-KHA',
    null,
    'RU-SAK'
  ],
  [
    'RU-KGD',
    null,
    'RU-PSK',
    'RU-TVE',
    'RU-YAR',
    'RU-IVA',
    'RU-KOS',
    'RU-ME',
    'RU-KIR',
    'RU-PER',
    'RU-SVE',
    'RU-KGN',
    'RU-NVS',
    'RU-KK',
    'RU-BU',
    'RU-YEV',
    null,
    null,
    null
  ],
  [
    null,
    null,
    'RU-SMO',
    'RU-KLU',
    'RU-MOS',
    'RU-VLA',
    'RU-NIZ',
    'RU-CU',
    'RU-TA',
    'RU-UD',
    'RU-CHE',
    'RU-OMS',
    'RU-ALT',
    'RU-TY',
    'RU-ZAB',
    null,
    'RU-PRI',
    null,
    null
  ],
  [
    null,
    null,
    'RU-BRY',
    'RU-ORL',
    'RU-TUL',
    'RU-RYA',
    'RU-MO',
    'RU-ULY',
    'RU-SAM',
    'RU-BA',
    null,
    null,
    'RU-ALT',
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    'RU-KRS',
    'RU-LIP',
    'RU-TAM',
    'RU-PNZ',
    'RU-SAR',
    'RU-ORE',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    'RU-BEL',
    'RU-VOR',
    'RU-VGG',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    'UA-43',
    'RU-AD',
    'RU-KDA',
    'RU-ROS',
    'RU-KL',
    'RU-AST',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    'RU-KC',
    'RU-STA',
    'RU-CE',
    'RU-DA',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    'RU-KB',
    'RU-SE',
    'RU-IN',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]
];
export const wikiReg = ['Республика Адыгея', 'Республика Алтай', 'Республика Башкортостан', 'Республика Бурятия', 'Республика Дагестан', 'Республика Ингушетия', 'Кабардино-Балкарская Республика', 'Республика Калмыкия', 'Карачаево-Черкесская Республика', 'Республика Карелия', 'Республика Коми', 'Республика Крым', 'Республика Марий Эл', 'Республика Мордовия', 'Республика Саха (Якутия)', 'Республика Северная Осетия — Алания', 'Республика Татарстан', 'Республика Тыва', 'Удмуртская Республика', 'Республика Хакасия', 'Чеченская Республика', 'Чувашская Республика — Чувашия', 'Края', 'Алтайский край', 'Забайкальский край', 'Камчатский край', 'Краснодарский край', 'Красноярский край', 'Пермский край', 'Приморский край', 'Ставропольский край', 'Хабаровский край', 'Области', 'Амурская область', 'Архангельская область', 'Астраханская область', 'Белгородская область', 'Брянская область', 'Владимирская область', 'Волгоградская область', 'Вологодская область', 'Воронежская область', 'Ивановская область', 'Иркутская область', 'Калининградская область', 'Калужская область', 'Кемеровская область — Кузбасс[6]', 'Кировская область', 'Костромская область', 'Курганская область', 'Курская область', 'Ленинградская область', 'Липецкая область', 'Магаданская область', 'Московская область', 'Мурманская область', 'Нижегородская область', 'Новгородская область', 'Новосибирская область', 'Омская область', 'Оренбургская область', 'Орловская область', 'Пензенская область', 'Псковская область', 'Ростовская область', 'Рязанская область', 'Самарская область', 'Саратовская область', 'Сахалинская область', 'Свердловская область', 'Смоленская область', 'Тамбовская область', 'Тверская область', 'Томская область', 'Тульская область', 'Тюменская область', 'Ульяновская область', 'Челябинская область', 'Ярославская область', 'Города федерального значения', 'Москва', 'Санкт-Петербург', 'Севастополь[2]', 'Автономная область', 'Еврейская АО', 'Автономные округа', 'Ненецкий АО', 'Ханты-Мансийский АО — Югра[9]', 'Чукотский АО', 'Ямало-Ненецкий АО', 'Российская Федерация[11]'];

const chunkArray = (arr: any[], cnt: number) => arr.reduce((prev, cur, i, a) => (!(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev), []);

/* пустая матрица; */
const emptyGridTemplate = Array.from(Array(12).fill(undefined), () => new Array(19).fill(undefined));

/* карта заполненных значений */
const arr = [
  []
];
