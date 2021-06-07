import * as React from 'react';
import { FC } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import Avatar from '../netspective-studios/design-system/components/avatar/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import UILinkButton from '../foundation/ui/ui-link-button/UILinkButton';

import CardWithIcon from './CardWithIcon';
import StarRatingField from '../reviews/StarRatingField';
import { Customer, Review } from '../types';

interface Props {
    reviews?: Review[];
    customers?: { [key: string]: Customer };
    nb?: number;
}

const PendingReviews: FC<Props> = ({ reviews = [], customers = {}, nb }) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/reviews"
            icon={CommentIcon}
            title={translate('pos.dashboard.pending_reviews')}
            subtitle={nb}
        >
            <List>
                {reviews.map((record: Review) => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/reviews/${record.id}`}
                        alignItems="flex-start"
                    >
                        <ListItemAvatar>
                            {customers[record.customer_id] ? (
                                <Avatar
                                    src={`${
                                        customers[record.customer_id].avatar
                                    }?size=32x32`}
                                    size="medium"
                                    variant="user"
                                    className={classes.avatar}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>

                        <ListItemText
                            primary={<StarRatingField record={record} />}
                            secondary={record.comment}
                            className={classes.listItemText}
                            style={{ paddingRight: 0 }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box flexGrow="1">&nbsp;</Box>
            <UILinkButton className={classes.link} to="/reviews" variant="base">
                <Box p={1} className={classes.linkContent}>
                    {translate('pos.dashboard.all_reviews')}
                </Box>
            </UILinkButton>
        </CardWithIcon>
    );
};

const useStyles = makeStyles(theme => ({
    avatar: {
        background: theme.palette.background.paper,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '5em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    link: {
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    linkContent: {
        color: theme.palette.primary.main,
    },
}));

export default PendingReviews;
