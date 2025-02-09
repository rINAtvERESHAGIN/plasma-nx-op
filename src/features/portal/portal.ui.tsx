import React from 'react';
import { Content, ExpandArea } from './portal.styled';
import { type ExpandState } from './type';
import ProcessorStages from '@features/processor-stages/processor-stages.ui';
import { type SpecificationFormValue } from 'blocknote/src/entities/custom-block/block-render';

interface IProps {
  initialData?: SpecificationFormValue;
  chartUrl: string;
  customBloknoteSetContent?: (content: object) => void;
  customBlocknoteSetResultUuid?: (resultUuid: string) => void;
  expandState?: ExpandState;
}

const PortalRoot: React.FunctionComponent<IProps> = ({
  chartUrl,
  initialData,
  expandState = 'full',
  customBloknoteSetContent,
  customBlocknoteSetResultUuid
}) => {
  return (
    <Content width="100%" contentEditable={false}>
      {expandState === 'full' ? (
        <ExpandArea
          summaryContent={null}
          expandContent={
            <React.Fragment>
              <ProcessorStages
                initialData={initialData}
                chartUrl={chartUrl}
                customBloknoteSetContent={customBloknoteSetContent}
                customBlocknoteSetResultUuid={customBlocknoteSetResultUuid}
                expandState={expandState}
              />
            </React.Fragment>
          }
        />
      ) : expandState === 'none' ? (
        <Content width="100%" paddingBottom="8px">
          <ProcessorStages
            initialData={initialData}
            chartUrl={chartUrl}
            customBloknoteSetContent={customBloknoteSetContent}
            customBlocknoteSetResultUuid={customBlocknoteSetResultUuid}
            expandState={expandState}
          />
        </Content>
      ) : null}
    </Content>
  );
};

export const Portal = PortalRoot;
