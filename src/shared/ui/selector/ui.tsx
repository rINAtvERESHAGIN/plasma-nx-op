import React from 'react';
import { type SelectProps, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { StyledSelect, StyledMenuItem } from './styles';

export interface ISelectorDate {
    value: number | string;
    label: string;
    description?: string;
}
interface IProps<DataType extends ISelectorDate> extends SelectProps {
    data?: DataType[];
}

function Selector<DataType extends ISelectorDate>({ data, ...other }: IProps<DataType>): React.ReactNode {
  return (
    <StyledSelect {...other}>
      {data != null &&
                data.map((item, index) => (
                  <StyledMenuItem key={`_${index}_${item.value}`} value={item.value}>
                    {item.label}
                    {item.description && (
                      <Tooltip placement="right-start" title={item.description}>
                        <IconButton>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </StyledMenuItem>
                ))}
    </StyledSelect>
  );
}

export default Selector;
