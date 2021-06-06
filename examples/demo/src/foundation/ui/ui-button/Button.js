import React from 'react';
import Button from '@salesforce/design-system-react/components/button';

const UIButton = props => {
    return <Button {...props}>{props.children}</Button>;
};

export default UIButton;
