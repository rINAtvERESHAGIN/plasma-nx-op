type InfoLabel = 'Параметры' | 'Лаборатория' | 'Регионы' | 'Регион' | 'Возраст' | 'Дата' | 'Разрешение' | 'Пол';
export type InfoId = 'settings' | 'laboratory' | 'regions' | 'age-from' | 'date' | 'permission' | 'humanSex';
export interface InfoData {
    id: InfoId;
    label: InfoLabel;
    data: React.ReactNode | string | number;
}
export type SexMapping = Record<'0' | '1' | '2', 'жен.' | 'муж.' | 'любой'>;

export type DatasetSpecificationInfoType = Record<InfoId, InfoData>;
