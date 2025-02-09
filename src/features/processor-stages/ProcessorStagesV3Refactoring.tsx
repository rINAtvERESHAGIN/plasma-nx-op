import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { isNil, isEqual } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Box, Stepper, Step, StepLabel, StepContent, CircularProgress, LinearProgress, Fade } from '@mui/material'
import { getItemFromDb, setItemToStoreDb } from '@app/index'
import { Content, CustomPlotContainer } from '@features/portal/portal.styled'
import { DatasetSpecificationForms } from 'dataset-specification-form/features/DatasetSpecificationForms'
import { ProcessorSpecificationForms } from 'processor-specification/features/processor-specification-forms'
import { ResultRepresentation } from 'result-representation/features/result-representation.ui'
import { StepperNavigation } from './stepper-navigation'
import { initializer, fetchNewResult, getThirdStepLabel, getOptionSign } from './tools'
import { steps } from './constants'
import { ProgressContainer, StepperContainer } from './ui.styled'
import { type IsProcessing, type StepPipeline } from './types'
import { FinisStepNavigation } from './FinisStepNavigation'
import React from 'react'
import { SpecificationFormValue } from 'blocknote/entities/custom-block/render'


interface ProcessorStagesProps {
  customBloknoteSetContent?: (content: object) => void
  updateBlock: (content: object) => void
  customBlocknoteSetResultUuid?: (resultUuid: string) => void
  initialData?: SpecificationFormValue
  chartUrl: string
}

type ProcessingState = {
  dataset?: object[]
  processor?: object[]
  condition?: 'new' | 'finished'
  isProcessing?: IsProcessing
  stepPipeline?: StepPipeline
}

const Component: React.FC<ProcessorStagesProps> = ({
  initialData,
  updateBlock,
  customBloknoteSetContent,
  customBlocknoteSetResultUuid,
  chartUrl
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [result, setResult] = useState<string>()
  const [uuidResult, setUuidResult] = useState<string>()
  const [processingState, setProcessingState] = useState<ProcessingState>({})
  const [faded, setFaded] = useState(true)

  const datasetFormRef = useRef<{ continueSubmitFormHandler: () => object[] }>(null)
  const processorFormsRef = useRef<{ continueSubmitFormHandler: () => object[] }>(null)

  const isInitialized = useMemo(() => {
    const { dataset, processor, stepPipeline, isProcessing } = processingState
    return [dataset, processor, stepPipeline, isProcessing].filter(Boolean).length * 25
  }, [processingState])

  const initializeComponent = useCallback(async () => {
    if (initialData) {
      const state = await initializer(initialData)
      setProcessingState(state)
      setActiveStep(state.stepPipeline?.step1 === 'complete' ? 1 : 0)
    }
  }, [initialData])

  const updateBlockConfig = useCallback(() => {
    updateBlock({
      condition: processingState.condition,
      isProcessing: processingState.isProcessing,
      stepPipeline: processingState.stepPipeline,
      localUuidResult: uuidResult,
      datasetSpecificationFormValues: {
        dataset: processingState.dataset,
        processor: processingState.processor
      }
    })
  }, [processingState, uuidResult, updateBlock])

  const handleStepProgress = (stepId: keyof StepPipeline, complete: boolean) => {
    setProcessingState(prev => ({
      ...prev,
      stepPipeline: { ...prev.stepPipeline, [stepId]: complete ? 'complete' : 'in-progress' }
    }))
  }

  const handleNavigation = (direction: 'next' | 'prev') => {
    setActiveStep(prev => direction === 'next' ? prev + 1 : prev - 1)
  }

  const handleDatasetSubmit = () => {
    const formData = datasetFormRef.current?.continueSubmitFormHandler()
    if (!formData) return

    if (formData.length !== processingState.dataset?.length || !isEqual(formData, processingState.dataset)) {
      setUuidResult(undefined)
    }

    setProcessingState(prev => ({ ...prev, dataset: formData }))
    handleStepProgress('step1', true)
    handleNavigation('next')
  }

  const handleProcessorSubmit = () => {
    const formData = processorFormsRef.current?.continueSubmitFormHandler()
    if (!formData) return

    if (!isEqual(formData, processingState.processor)) {
      setUuidResult(undefined)
    }

    setProcessingState(prev => ({ ...prev, processor: formData }))
    handleStepProgress('step2', true)
    handleNavigation('next')
  }

  const processData = useCallback(async () => {
    try {
      const { dataset, processor } = processingState
      if (!dataset || !processor) return

      setProcessingState(prev => ({ ...prev, isProcessing: 'in-progress' }))

      if (uuidResult) {
        const cachedResult = await getItemFromDb(uuidResult)
        setResult(cachedResult)
      } else {
        const newResult = await fetchNewResult({ dataset, processor })
        const newUuid = uuidv4()
        await setItemToStoreDb(newUuid, newResult)
        setUuidResult(newUuid)
        setResult(newResult)
      }

      handleStepProgress('step3', true)
      handleNavigation('next')
    } catch (error) {
      console.error('Data processing failed:', error)
    } finally {
      setProcessingState(prev => ({ ...prev, isProcessing: 'complete' }))
    }
  }, [processingState.dataset, processingState.processor, uuidResult])

  useEffect(() => {
    initializeComponent()
  }, [initializeComponent])

  useEffect(() => {
    if (
      processingState.stepPipeline?.step1 === 'complete' &&
      processingState.stepPipeline?.step2 === 'complete' &&
      !result
    ) {
      processData()
    }
  }, [processingState.stepPipeline, result, processData])

  if (!initialData || isInitialized < 100) {
    return (
      <ProgressContainer>
        <Box width="100%">
          <LinearProgress variant="determinate" value={isInitialized} />
        </Box>
      </ProgressContainer>
    )
  }

  return (
    <Content id="content-container" width="100%" contentEditable={false}>
      <Box width="100%" contentEditable={false}>
        <Fade in={!processingState.stepPipeline?.step3}>
          <StepperContainer isDisplay={faded}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Укажите набор данных</StepLabel>
                <StepContent>
                  <DatasetSpecificationForms 
                    ref={datasetFormRef} 
                    initialValue={processingState.dataset} 
                  />
                  <StepperNavigation
                    activeStep={0}
                    onNext={handleDatasetSubmit}
                    onBack={() => handleNavigation('prev')}
                  />
                </StepContent>
              </Step>

              <Step>
                <StepLabel>Укажите представление для данных</StepLabel>
                <StepContent>
                  <ProcessorSpecificationForms 
                    ref={processorFormsRef} 
                    initialValue={processingState.processor} 
                  />
                  <StepperNavigation
                    activeStep={1}
                    onNext={handleProcessorSubmit}
                    onBack={() => handleNavigation('prev')}
                  />
                </StepContent>
              </Step>

              <Step>
                <StepLabel optional={getOptionSign(processingState.isProcessing)}>
                  {getThirdStepLabel(processingState.isProcessing)}
                </StepLabel>
                <StepContent>
                  <Box padding={2}>
                    <CircularProgress />
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </StepperContainer>
        </Fade>

        {processingState.stepPipeline?.step3 && (
          <Box>
            <CustomPlotContainer>
              <ResultRepresentation data={result} />
            </CustomPlotContainer>
            <FinisStepNavigation 
              onReset={() => {
                setProcessingState({})
                setActiveStep(0)
                setResult(undefined)
              }}
            />
          </Box>
        )}
      </Box>
    </Content>
  )
}

const arePropsEqual = (prevProps: ProcessorStagesProps, nextProps: ProcessorStagesProps) => 
  isEqual(prevProps, nextProps)

export const ProcessorStagesV3Refactoring =  React.memo(Component, arePropsEqual)
