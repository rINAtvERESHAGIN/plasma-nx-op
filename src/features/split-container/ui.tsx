import * as React from 'react';
import ControlledElementCls from './ControlledElementCls';

const ControlledElement = React.forwardRef((props, ref) => <ControlledElementCls innerRef={ref} {...props} />);

export default ControlledElement;
