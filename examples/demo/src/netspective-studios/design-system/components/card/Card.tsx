import React from 'react';
import Card from '@salesforce/design-system-react/components/card';

const DSCard = (props: any) => {
    return <Card {...props} heading={props.heading || false} />;
};

export default DSCard;
