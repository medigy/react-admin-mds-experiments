import React from 'react';
import Tabs from '@salesforce/design-system-react/components/tabs';

const DSTabs = props => {
    return <Tabs {...props}>{props.children}</Tabs>;
};

export default DSTabs;
