import React, { type PropsWithChildren } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface WidgetTabsProps {
  tabs: Array<{ label: string; content: JSX.Element }>;
}

const WidgetTabs = ({ tabs, children }: PropsWithChildren<WidgetTabsProps>): React.ReactNode => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 2000,
          backgroundColor: 'white'
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          {tabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
        {children}
      </Box>
      {tabs.map((tab, index) => (
        <div key={tab.label} role="tabpanel" hidden={value !== index}>
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default WidgetTabs;
