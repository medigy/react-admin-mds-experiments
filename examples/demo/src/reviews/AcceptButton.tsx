import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '../netspective-studios/design-system/components/button/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { useTranslate, useUpdate, useNotify, useRedirect } from 'react-admin';
import { Review } from './../types';

/**
 * This custom button demonstrate using useUpdate to update data
 */
const AcceptButton: FC<{ record: Review }> = ({ record }) => {
    const translate = useTranslate();
    const notify = useNotify();
    const redirectTo = useRedirect();

    const [approve, { loading }] = useUpdate(
        'reviews',
        record.id,
        { status: 'accepted' },
        record,
        {
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.reviews.notification.approved_success',
                    'info',
                    {},
                    true
                );
                redirectTo('/reviews');
            },
            onFailure: () => {
                notify(
                    'resources.reviews.notification.approved_error',
                    'warning'
                );
            },
        }
    );
    return record && record.status === 'pending' ? (
        <Button variant="outline-brand" onClick={approve} disabled={loading}>
            <ThumbUp
                color="primary"
                style={{ paddingRight: '0.5em', color: 'green' }}
            />
            {translate('resources.reviews.action.accept')}
        </Button>
    ) : (
        <span />
    );
};

AcceptButton.propTypes = {
    record: PropTypes.any,
};

export default AcceptButton;
