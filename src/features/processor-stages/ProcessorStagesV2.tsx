import { IProps } from './processor-stages.ui';
import { getItemFromDb, setItemToStoreDb } from '@app/index';
import { Content, CustomPlotContainer } from '../../portal/portal.styled';
import { Box, Stepper, Step, StepLabel, StepContent, CircularProgress, LinearProgress, Fade } from '@mui/material';
import { type SpecificationFormValue } from 'blocknote/src/entities/custom-block/block-render';
import { DatasetSpecificationForms } from 'dataset-specification-form/features/DatasetSpecificationForms';
import { isNil, isEqual } from 'lodash';
import { ProcessorSpecificationForms } from 'processor-specification/features/processor-specification-forms';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { ResultRepresentation } from 'result-representation/features/result-representation.ui';
import { v4 as uuidv4 } from 'uuid';
import { StepperNavigation } from './stepper-navigation';
import { initializer, fetchNewResult, getThirdStepLabel, getOptionSign } from './tools';
import { steps } from './constants';
import { ProgressContainer, StepperContainer } from './ui.styled';
import { type IsProcessing, type StepPipeline } from './types';
import { FinisStepNavigation } from './FinisStepNavigation';


export const ProcessorStagesV2 = ({ initialData, updateBlock }: IProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = (): void => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const datasetFormRef = useRef(null);
    const processorFormsRef = useRef(null);
  
    const [result, setResult] = useState<string | undefined>(undefined);
    const [uuidResult, setUuidResult] = useState<undefined | string>(undefined);
  
    const [dataset, setDataset] = useState<object[] | undefined>(undefined);
    const [processor, setProcessor] = useState<object[] | undefined>(undefined);
    const [condition, setCondition] = useState<'new' | 'finished' | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState<IsProcessing>(undefined);
    const [stepPipeline, setStepPipeline] = useState<StepPipeline | undefined>(undefined);
  
    // useEffect(() => {
    //   if (isNil(dataset) || isNil(processor) || isNil(condition) || isNil(isProcessing) || isNil(stepPipeline))
    //     initializer(
    //       initialData,
    //       setDataset,
    //       setProcessor,
    //       setCondition,
    //       setUuidResult,
    //       setStepPipeline,
    //       setIsProcessing,
    //       setActiveStep
    //     );
    // }, [condition, dataset, initialData, isProcessing, processor, stepPipeline]);
  
    // useEffect(() => {
    //   const fullBlockConfig = {
    //     condition,
    //     isProcessing,
    //     stepPipeline,
    //     localUuidResult: uuidResult,
    //     datasetSpecificationFormValues: {
    //       dataset,
    //       processor
    //     }
    //   };
  
    //   updateBlock(fullBlockConfig);
    // }, [condition, dataset, isProcessing, processor, stepPipeline, updateBlock, uuidResult]);
  
    const handleStepPipeline = (stepId: 'step1' | 'step2', complete: boolean): void => {
      setStepPipeline((prev) => {
        return { ...prev, [stepId]: complete ? 'complete' : 'in-progress' };
      });
    };
  
    const continueDatasetSpecificationForm = (): void => {
      const formData = datasetFormRef.current.continueSubmitFormHandler();
      if (formData.length !== dataset.length) {
        setUuidResult(undefined);
      } else {
        if (!isEqual(formData, dataset)) {
          setUuidResult(undefined);
        }
      }
  
      setDataset([...formData]);
      handleStepPipeline('step1', true);
      handleNext();
    };
  
    const continueProcessSpecificationForm = (): void => {
      const formData = processorFormsRef.current.continueSubmitFormHandler();
  
      if (!isEqual(formData, processor)) {
        setUuidResult(undefined);
      }
      setProcessor([...formData]);
      handleStepPipeline('step2', true);
      handleNext();
    };
  
    const continueResult = useCallback<() => void>(() => {
      handleNext();
      handleStepPipeline('step3', true);
    }, []);
  
    const handleBack = (activeStep: number): void => {
      handleStepPipeline(`step${activeStep}`, false);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const restoreResultFromDB = useCallback(async (uuidResult: string): Promise<void> => {
      const prevResultCache = await getItemFromDb(uuidResult);
      setResult(prevResultCache);
    }, []);
  
    const loadResultFromServer = useCallback(async ({ dataset, processor }): Promise<void> => {
      console.log('loadResultFromServer');
      const newResultFetched = await fetchNewResult({
        dataset,
        processor
      });
      const newUuidResult = uuidv4();
      setResult(newResultFetched);
      await setItemToStoreDb(newUuidResult, newResultFetched);
      setUuidResult(newUuidResult);
    }, []);
  
    const processingResult = async (dataset: object[], processor: object[]): Promise<object> => {
      setIsProcessing('in-progress');
      return await new Promise((resolve, reject) => {
        if (dataset.length > 0 && processor.length > 0) {
          resolve({ dataset, processor });
          setActiveStep(steps.resultRepresentation);
        } else {
          reject(new Error('Both dataset and processor must have at least one element.'));
        }
      });
    };
  
    // useEffect(() => {
    //   if (
    //     !isNil(stepPipeline) &&
    //     stepPipeline.step1 === 'complete' &&
    //     stepPipeline.step2 === 'complete' &&
    //     isNil(result)
    //   ) {
    //     processingResult(dataset, processor)
    //       .then(async ({ dataset, processor }) => {
    //          await loadResultFromServer({ dataset, processor });
    //       })
    //       .finally(() => {
    //         setIsProcessing('complete');
    //         continueResult();
    //       })
    //       .catch((e) => {
    //         setIsProcessing('complete');
    //         console.error(e);
    //       });
    //   }
    // }, [continueResult, dataset, loadResultFromServer, processor, restoreResultFromDB, stepPipeline, uuidResult]);
  
    const [faded, setFaded] = useState(true);
  
    const isInitialized = useMemo(() => {
      let result = 0;
      result = result + (!isNil(dataset) ? 25 : 0);
      result = result + (!isNil(processor) ? 25 : 0);
      result = result + (!isNil(stepPipeline) ? 25 : 0);
      result = result + (!isNil(isProcessing) ? 25 : 0);
      return result;
    }, [dataset, isProcessing, processor, stepPipeline]);
  
    const fullReset = (): void => {
      handleStepPipeline(`step${2}`, false);
      handleStepPipeline(`step${3}`, false);
      setIsProcessing('not-started');
      setCondition('new');
      setActiveStep(1);
      setResult(undefined);
    };
  
    if (isNil(initialData) || isInitialized !== 100)
      return (
        <ProgressContainer>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={isInitialized} />
          </Box>
        </ProgressContainer>
      );
  
    if (!isNil(stepPipeline))
      return (
        <Content id="content-container" width="100%" contentEditable={false}>
          <Box id="processor-stages-container" sx={{ width: '100%' }} contentEditable={false}>
            <Fade
              in={!(stepPipeline.step3 === 'complete')}
              addEndListener={() => {
                setFaded(!(stepPipeline.step3 === 'complete'));
              }}
            >
              <StepperContainer isDisplay={faded}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  <Step>
                    <StepLabel>Укажите набор данных</StepLabel>
                    <StepContent>
                      <DatasetSpecificationForms ref={datasetFormRef} initialValue={dataset} />
                      <StepperNavigation
                        activeStep={0}
                        handleNext={continueDatasetSpecificationForm}
                        handleBack={handleBack}
                        handleReset={() => {}}
                      />
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel>Укажите представление для данных</StepLabel>
                    <StepContent>
                      <ProcessorSpecificationForms ref={processorFormsRef} initialValue={processor} />
                      <StepperNavigation
                        activeStep={1}
                        handleNext={continueProcessSpecificationForm}
                        handleBack={handleBack}
                        handleReset={() => {}}
                      />
                    </StepContent>
                  </Step>
                  <Step>
                    <StepLabel sx={{ alignContent: 'baseline' }} optional={getOptionSign(isProcessing)}>
                      {getThirdStepLabel(isProcessing)}
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ display: 'flex', padding: '16px', justifyContent: 'flex-start' }}>
                        <CircularProgress />
                      </Box>
                    </StepContent>
                  </Step>
                </Stepper>
              </StepperContainer>
            </Fade>
            {stepPipeline.step3 === 'complete' ? (
              <Box>
                <CustomPlotContainer id="custom-plot-container">
                  <ResultRepresentation data={result} />
                </CustomPlotContainer>
                <FinisStepNavigation activeStep={2} handleBack={fullReset} />
              </Box>
            ) : null}
          </Box>
        </Content>
      );
};



