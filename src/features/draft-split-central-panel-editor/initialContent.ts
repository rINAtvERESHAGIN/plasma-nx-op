export const initialContent = [
  {
    id: 'block1',
    type: 'heading', // Указывается тип, либо заголовок, либо блок. В данном случае заголовок
    props: {
      level: 2, // Аналогично "H2". Если тип заголовок, то можно указать его степень (H1,H2 и H3)
      textAlignment: 'right' // Выравнивание текста вправо
    },
    content: [
      {
        type: 'text',
        text: 'ФБУН НИИ СБМ Роспотребнадзора',
        styles: {
          textColor: 'gray' // Цвет текста
        }
      }
    ]
  },
  {
    id: 'block2',
    type: 'heading',
    props: {
      level: 3, // Аналогично "H3"
      textAlignment: 'center' // Выравнивание текста по центру
    },
    content: [
      {
        type: 'text',
        text: 'Отчет о популяционной динамике лабораторных показателей.',
        styles: {
          textColor: 'gray'
        }
      }
    ]
  },
  {
    id: 'block3',
    type: 'heading',
    props: {
      level: 2,
      textAlignment: 'center'
    },
    content: [
      {
        type: 'text',
        text: '25.08.2023',
        styles: {
          textColor: 'gray'
        }
      }
    ]
  },
  {
    id: 'block4',
    type: 'paragraph', // Блочный текст типа "paragraph"
    content: [
      {
        type: 'text',
        text: 'Отчет составлен на основе выгрузки данных из  клинико-диагностических лабораторий ' +
                    '“Центра молекулярной диагностики” (данные по 20 июля)  и  Инвитро (данные по 30 августа). ',
        styles: {
          bold: true // Жирный шрифт
        }
      }
    ]
  },
  {
    id: 'block5',
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Результаты ',
        styles: {
          bold: true
        }
      }
    ]
  },
  {
    id: 'block6',
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Динамика С-реактивного белка по лаборатории Инвитро',
        styles: {
          textColor: 'blue',
          bold: true
        }
      }
    ]
  }
];
