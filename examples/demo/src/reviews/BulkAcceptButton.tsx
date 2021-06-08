import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import ThumbUp from '@material-ui/icons/ThumbUp';

import {
    useUpdateMany,
    useNotify,
    useRefresh,
    useUnselectAll,
    CRUD_UPDATE_MANY,
    BulkActionProps,
    Identifier,
    useTranslate,
} from 'react-admin';
import Button from '../netspective-studios/design-system/components/button/Button';

const noSelection: Identifier[] = [];

const BulkAcceptButton: FC<BulkActionProps> = ({
    selectedIds = noSelection,
}) => {
    const translate = useTranslate();
    const notify = useNotify();
    const refresh = useRefresh();
    const unselectAll = useUnselectAll('reviews');

    const [approve, { loading }] = useUpdateMany(
        'reviews',
        selectedIds,
        { status: 'accepted' },
        {
            action: CRUD_UPDATE_MANY,
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.reviews.notification.approved_success',
                    'info',
                    {},
                    true
                );
                refresh();
                unselectAll();
            },
            onFailure: () => {
                notify(
                    'resources.reviews.notification.approved_error',
                    'warning'
                );
            },
        }
    );

    return (
        <Button onClick={approve} disabled={loading} variant={'base'}>
            <ThumbUp style={{ marginRight: 5 }} />
            {translate('resources.reviews.action.accept')}
        </Button>
    );
};

BulkAcceptButton.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BulkAcceptButton;
