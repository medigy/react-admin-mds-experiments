import React from 'react';
import TabsPanel from '@salesforce/design-system-react/components/tabs/panel';

const DSTabsPanel = props => {
    return <TabsPanel {...props}>{props.children}</TabsPanel>;
};

export default DSTabsPanel;
