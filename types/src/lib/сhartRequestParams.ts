import { type Region } from './Region';

export interface IChartRequestParams {
    region: { 
        data?: Region | undefined;
        default?: Region | undefined;
     };
    lab: { 
        data: number;
        default: number;
     }; 
    parameter: { 
        data: number;
        default: number;
     };
    minAge: number;
    maxAge: number;
    humanSex: string | undefined;
}