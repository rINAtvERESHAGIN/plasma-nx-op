import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@app/store';
import { type DatasetSpecification } from '@shared/api/model/Comparison';
import {
  CardHeader,
  ContentContainer,
  CustomBackdrop,
  InitAddBthComparison,
  PlotContainer,
  RootContainer,
  CenteredElement,
  ScrollableContainer
} from '@pages/traces/ui/ui.styled';
import { CardHeaderAction, StackedCard, StackedCardsContainer } from '@shared/ui/animation-card/ui';
import DatasetSpecificationsUploadButton from '@entities/trace-upload-button/ui';
import { IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DatasetSpecificationClearAllBth from '@entities/trace-clear-all-btn/ui';
import { useSnackbar } from 'notistack';
import ThreeDotLoadingStatus from '@shared/ui/three-dots-loading-status/ui';
import CustomAlert from '@shared/ui/custom-alert/ui';
import { setComparisonChart } from '../model';
import WidgetDrawer from '@widgets/drawer/ui';
import SubHeaderRoot from '@widgets/sub-header/ui';
import ComparisonAddBtn from '@entities/trace-add-btn/ui';
import { showSubHeader } from '@widgets/sub-header/model';
import DatasetSpecificationChart from '@entities/dataset-specification-chart/ui';
import DatasetSpecificationInfo from '@entities/comparison-selected-status/ui';
import DatasetSpecificationUpdatePlot from '@entities/trace-update-plot/ui';
import DatasetSpecificationsService from '@shared/api/services/DatasetSpecificationsService';
import { DatasetSpecificationForm } from 'dataset-specification-form/entities/dataset-specification-form.ui';
import { type DatasetSpecificationStatus } from '../../../../packages/dataset-specification-form/src/shared/types/DatasetSpecificationStatus';

const DatasetSpecifications = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const plot = useAppSelector((state) => state.comparison.chart);

  const prevDatasetSpecificationValue = useRef<null | DatasetSpecification[]>(null);

  const [traces, setDatasetSpecifications] = useState<DatasetSpecification[] | undefined>(undefined);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [plotIsLoading, setPlotIsLoading] = React.useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [traceStatus, setDatasetSpecificationStatus] = useState<DatasetSpecificationStatus>(undefined);

  const [updatableDatasetSpecification, setUpdatableDatasetSpecification] = useState<
    { trace: DatasetSpecification; traceIndex: number } | undefined
  >(undefined);

  useEffect(() => {
    dispatch(showSubHeader());
  }, [dispatch]);

  const handleOnClickInitAddBtn = useCallback(() => {
    setOpenDrawer(true);
    setDatasetSpecificationStatus('adding');
  }, []);

  const handleOnClickAddNewDatasetSpecification = useCallback(() => {
    setDatasetSpecificationStatus('adding');
    setOpenDrawer(true);
  }, [traces]);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, [traces]);

  const submitAdding = useCallback((values) => {
    if (values) {
      setDatasetSpecifications((prev) => {
        if (prev !== undefined) {
          return [...prev, values];
        }

        return [values];
      });
    }
    onCloseDrawer();
  }, []);

  const handleToggle = useCallback(() => {
    setIsClosed((prevIsClosed) => !prevIsClosed);
  }, []);

  const handleOnEditDatasetSpecification = useCallback<
    (event: React.MouseEvent<HTMLButtonElement>, trace: DatasetSpecification, traceIndex: number) => void
  >((event, trace, traceIndex) => {
    event.preventDefault();
    event.stopPropagation();
    setDatasetSpecificationStatus('editing');
    setOpenDrawer(true);
    setUpdatableDatasetSpecification({ trace, traceIndex });
  }, []);

  const submitEditing = useCallback(
    (values) => {
      if (values && traces != null && updatableDatasetSpecification != null) {
        const updatedDatasetSpecifications = [...traces];
        updatedDatasetSpecifications.splice(updatableDatasetSpecification.traceIndex, 1, values);
        setDatasetSpecifications(updatedDatasetSpecifications);
        setUpdatableDatasetSpecification(undefined);
      }
      setDatasetSpecificationStatus(undefined);
      setOpenNotification(true);
      onCloseDrawer();
    },
    [traces, updatableDatasetSpecification]
  );

  const handleUploadDatasetSpecifications = useCallback(async () => {
    if (traces != null && traces.length > 0) {
      try {
        setPlotIsLoading((prev) => !prev);

        const data = await DatasetSpecificationsService.requestSendDatasetSpecifications(traces);
        dispatch(setComparisonChart(JSON.parse(data as unknown as string)));
        setPlotIsLoading((prev) => !prev);
      } catch (error) {
        setPlotIsLoading((prev) => !prev);
        enqueueSnackbar('Ошибка загрузки данных.', { autoHideDuration: 7000, variant: 'error' });
      }
    }
  }, [traces]);

  const handleOnDeleteDatasetSpecification = useCallback(
    (event: React.MouseEvent, indexToDelete: number) => {
      event.stopPropagation();

      let updatedDatasetSpecifications = traces?.filter((_, index) => index !== indexToDelete);
      if (updatedDatasetSpecifications?.length === 0) {
        updatedDatasetSpecifications = undefined;
        dispatch(setComparisonChart(undefined));
        setOpenNotification(false);
      }

      setDatasetSpecifications(updatedDatasetSpecifications);
    },
    [traces]
  );

  useEffect(() => {
    if (traces != null) {
      if (prevDatasetSpecificationValue.current !== null) {
        if (traces.length !== prevDatasetSpecificationValue.current.length && plot) {
          setOpenNotification(true);
        }
      }
      prevDatasetSpecificationValue.current = traces;
    }
  }, [traces]);

  const handleCloseNotification = useCallback(() => {
    setOpenNotification(false);
  }, []);

  const updatePlotWithNewDatasetSpecifications = async (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    await handleUploadDatasetSpecifications();
    setOpenNotification(false);
  };

  const handleClose = useCallback((event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  }, []);

  const cleanDatasetSpecificationInfo = useCallback(() => {
    setDatasetSpecifications(undefined);
    dispatch(setComparisonChart(undefined));
    prevDatasetSpecificationValue.current = null;
  }, []);

  return (
    <RootContainer>
      <Snackbar
        open={openNotification}
        autoHideDuration={null}
        onClose={handleClose}
        message="Данные изменились, обновить данные ?"
        action={
          <DatasetSpecificationUpdatePlot
            isLoading={plotIsLoading}
            onAction={updatePlotWithNewDatasetSpecifications}
            onClose={handleCloseNotification}
          />
        }
      />
      <SubHeaderRoot>
        {traces != null && plot ? <DatasetSpecificationClearAllBth onClick={cleanDatasetSpecificationInfo} /> : null}
        {traces != null ? <ComparisonAddBtn onClick={handleOnClickAddNewDatasetSpecification} /> : null}
        <WidgetDrawer open={openDrawer} anchor="right" onClose={onCloseDrawer}>
          <DatasetSpecificationForm
            externalSubmit={submitAdding}
            externalSubmitEditing={submitEditing}
            traceStatus={traceStatus}
            initialValue={updatableDatasetSpecification}
          />
        </WidgetDrawer>
      </SubHeaderRoot>
      {openNotification ? <CustomAlert severity="warning">График построен по устаревшим данным.</CustomAlert> : null}

      <ContentContainer>
        {traces == null ? (
          <InitAddBthComparison>
            <ComparisonAddBtn onClick={handleOnClickInitAddBtn} />
          </InitAddBthComparison>
        ) : (
          <>
            <ScrollableContainer>
              <StackedCardsContainer className={`fileList ${isClosed ? 'closed' : 'showing'}`}>
                {traces && traces.length > 0 && traces.length > 0
                  ? traces.map((trace, index, arr) => (
                      <StackedCard
                        key={index}
                        onClick={handleToggle}
                        index={index + 1}
                        scope={arr.length}
                        className="fileInput"
                      >
                        <CardHeader>
                          <CardHeaderAction>
                            <IconButton
                              size="small"
                              onClick={(event) => {
                                handleOnEditDatasetSpecification(event, trace, index);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(event) => {
                                handleOnDeleteDatasetSpecification(event, index);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardHeaderAction>
                        </CardHeader>
                        <DatasetSpecificationInfo key={`_${trace.date}`} trace={trace} />
                      </StackedCard>
                    ))
                  : null}
              </StackedCardsContainer>
            </ScrollableContainer>

            <PlotContainer>
              {plotIsLoading ? (
                <CustomBackdrop open>
                  <ThreeDotLoadingStatus />
                </CustomBackdrop>
              ) : (
                <CenteredElement>
                  {plot ? (
                    <DatasetSpecificationChart plotData={plot} fullParentHeight={false} />
                  ) : (
                    <DatasetSpecificationsUploadButton
                      disabled={!traces && !(traces.length > 0)}
                      onClick={handleUploadDatasetSpecifications}
                    />
                  )}
                </CenteredElement>
              )}
            </PlotContainer>
          </>
        )}
      </ContentContainer>
    </RootContainer>
  );
};
export default DatasetSpecifications;
