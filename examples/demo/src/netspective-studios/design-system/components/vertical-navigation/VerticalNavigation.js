import React from 'react';
import { withRouter } from 'react-router-dom';
import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';

const Navigation = props => {
    console.log(props.history.location);

    return (
        <VerticalNavigation
            selectedId={props.history.location.pathname}
            onSelect={(e, data) => {
                console.log(data);
                props.history.push(data.item.to);
            }}
            {...props}
        />
    );
};

export default withRouter(Navigation);
