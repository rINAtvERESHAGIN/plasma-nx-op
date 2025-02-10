// Литеральные типы для возможных значений полей
export type ParamName = 'Лимфоциты(%)' | 'Лейкоциты, 10^9/л';
export type RegionName = 'Ростовская область' | 'Новосибирская область' | 'Москва';
export type LabName = 'Инвитро';
export type Seasonality = '' | 'Не выражена';
export type TechnicalArtifact = '' | 'Вероятно';

// Основной тип данных
export interface AnomalyTableData {
  param_name: string; // Параметр, например, "Лимфоциты(%)" или "Лейкоциты, 10^9/л"
  region_name: string; // Название региона, например, "Ростовская область", "Новосибирская область", "Москва"
  lab_name: string; // Название лаборатории, например, "Инвитро"
  base_start_date: string; // Начало базового периода, формат "YYYY-MM-DD"
  base_end_date: string; // Конец базового периода, формат "YYYY-MM-DD"
  test_start_date: string; // Начало тестового периода, формат "YYYY-MM-DD"
  test_end_date: string; // Конец тестового периода, формат "YYYY-MM-DD"
  other_distribution: string; // Другое распределение, значение от 0 до 1
  mean_change: string; // Среднее изменение, строка представляющая число
  other_distribution_pvalue: number; // p-значение для вероятности отличия, например, 0.04
  mean_change_pvalue: number; // p-значение для среднего изменения, например, 0.095
  seasonality: Seasonality; // Сезонность, может быть пустой строкой или "Не выражена"
  technical_artifact: TechnicalArtifact; // Технический артефакт, может быть пустой строкой или "Вероятно"
}
