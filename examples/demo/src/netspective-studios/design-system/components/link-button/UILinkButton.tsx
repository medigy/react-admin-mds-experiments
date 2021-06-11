import React from 'react';
import Button from '@salesforce/design-system-react/components/button';
import { withRouter } from 'react-router-dom';

const UIButton = (props: any) => {
    const { history } = props;

    const onClickHandler = () => {
        if (props.to) {
            history.push(props.to);
        } else if (props.href) {
            window.open(props.href, '_self');
        }
    };

    return (
        <Button {...props} onClick={onClickHandler}>
            {props.children}
        </Button>
    );
};

export default withRouter(UIButton);
