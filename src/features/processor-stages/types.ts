export interface StepPipeline {
  step1: 'complete' | 'in-progress';
  step2: 'complete' | 'in-progress';
  step3: 'complete' | 'in-progress';
}

export type IsProcessing = 'not-started' | 'in-progress' | 'complete' | undefined;
