const years = [2010, 2012, 2013, 2014, 2017, 2018, 2019, 2020, 2021];
const targetDates = ['2016-01-04'];

// Функция для нахождения ближайшей даты к заданному году
export function findClosestDate(year: number, dates: string[]): string {
  // Преобразовываем год в дату, чтобы можно было сравнивать
  const yearDate = new Date(year, 0, 1);
  let closestDate = dates[0];
  let smallestDiff = Math.abs(new Date(closestDate).getTime() - yearDate.getTime());

  for (let i = 1; i < dates.length; i++) {
    const diff = Math.abs(new Date(dates[i]).getTime() - yearDate.getTime());
    if (diff < smallestDiff) {
      closestDate = dates[i];
      smallestDiff = diff;
    }
  }

  return closestDate;
}

// Функция для преобразования списка годов в список дат
export function transformYearsToDates(years: number[], targetDates: string[]): string[] {
  return years.map((year) => findClosestDate(year, targetDates));
}

// Пример использования
const transformedDates = transformYearsToDates(years, targetDates);
