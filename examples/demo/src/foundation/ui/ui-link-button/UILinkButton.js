import React from 'react';
import Button from '@salesforce/design-system-react/components/button';
import { withRouter } from 'react-router-dom';

const UIButton = props => {
    const { history } = props;

    const onClickHandler = () => {
        history.push({
            ...props.to,
        });
    };

    return (
        <Button {...props} onClick={onClickHandler}>
            {props.children}
        </Button>
    );
};

export default withRouter(UIButton);
