import * as React from 'react';
import { FC } from 'react';
import Button from '../netspective-studios/design-system/components/link-button/UILinkButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, FieldProps } from 'react-admin';
import { stringify } from 'query-string';

import products from '../products';
import { Category } from '../types';

const useStyles = makeStyles({
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
});

const LinkToRelatedProducts: FC<FieldProps<Category>> = ({ record }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return record ? (
        <Button
            size="small"
            variant="neutral"
            to={{
                pathname: '/products',
                search: stringify({
                    filter: JSON.stringify({ category_id: record.id }),
                }),
            }}
            className={classes.link}
        >
            <products.icon className={classes.icon} />
            {translate('resources.categories.fields.products')}
        </Button>
    ) : null;
};

export default LinkToRelatedProducts;
