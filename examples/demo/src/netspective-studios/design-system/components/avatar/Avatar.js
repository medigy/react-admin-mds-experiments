import React from 'react';
import Avatar from '@salesforce/design-system-react/components/avatar';

const DSAvatar = props => {
    return <Avatar {...props} imgSrc={props.src} />;
};

export default DSAvatar;
