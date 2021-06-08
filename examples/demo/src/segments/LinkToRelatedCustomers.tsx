import * as React from 'react';
import { FC } from 'react';
import UILinkButton from '../netspective-studios/design-system/components/link-button/UILinkButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import { stringify } from 'query-string';

import visitors from '../visitors';

const useStyles = makeStyles({
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
});

const LinkToRelatedCustomers: FC<{ segment: string }> = ({ segment }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <UILinkButton
            size="small"
            color="primary"
            variant="base"
            to={{
                pathname: '/customers',
                search: stringify({
                    filter: JSON.stringify({ groups: segment }),
                }),
            }}
            className={classes.link}
        >
            <visitors.icon className={classes.icon} />
            {translate('resources.segments.fields.customers')}
        </UILinkButton>
    );
};

export default LinkToRelatedCustomers;
