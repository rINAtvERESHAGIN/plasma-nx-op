import { memo } from 'react';
import { Position, type NodeProps } from 'reactflow';
import { Divider } from '@mui/material';
import {
  LineContainer,
  KeyName,
  StyledCard,
  StyledHandle,
  CardTitle,
  CardContent,
  CardContentTitle
} from './ui.styled';
import { typeToColorMap } from './constants';
import renderParsedPresets from '../../features/result-flow-parsed-presets-form/ui';

const DragHandleNode = ({ data }: NodeProps) => {
  const backgroundColor = typeToColorMap[data.type] || 'grey';

  const renderAdditionalInputs = (additionalInputs) => {
    return Object.entries(additionalInputs).map(([key, value]) => (
      <LineContainer key={key}>
        <KeyName>{key}</KeyName>: <span>{JSON.stringify(value)}</span>
      </LineContainer>
    ));
  };

  const renderOtherDetails = (data) => {
    const { additional_inputs, parsed_presets, label, input, ...others } = data;
    return Object.entries(others).map(([key, value]) => (
      <LineContainer key={key}>
        <KeyName>{key}</KeyName>:<span> {typeof value === 'object' ? JSON.stringify(value) : value}</span>
      </LineContainer>
    ));
  };

  return (
    <StyledCard backgroundColor={backgroundColor}>
      <StyledHandle type="target" position={Position.Top} />
      <CardTitle backgroundColor={backgroundColor}>{data.label}</CardTitle>

      <div className="custom-drag-handle">
        <Divider />
        <CardContentTitle>Additional Inputs</CardContentTitle>
        <CardContent>{data.additional_inputs && renderAdditionalInputs(data.additional_inputs)}</CardContent>

        <Divider />
        <CardContentTitle>Parsed Presets</CardContentTitle>
        <CardContent>{data.parsed_presets && renderParsedPresets(data.parsed_presets)}</CardContent>
        <Divider />
        <CardContentTitle>Other Info</CardContentTitle>
        <CardContent>{renderOtherDetails(data)}</CardContent>
      </div>
      <StyledHandle type="source" position={Position.Bottom} />
    </StyledCard>
  );
};

export default memo(DragHandleNode);
