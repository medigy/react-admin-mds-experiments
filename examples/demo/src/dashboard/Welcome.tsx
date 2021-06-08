import * as React from 'react';
import { FC } from 'react';
import { Box, CardActions, Typography } from '@material-ui/core';
import Card from '../netspective-studios/design-system/components/card/Card';
import Button from '../netspective-studios/design-system/components/link-button/UILinkButton';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';

const useStyles = makeStyles(theme => ({
    root: {
        background:
            theme.palette.type === 'dark'
                ? '#535353'
                : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

        color: '#fff',
        padding: 20,
        marginTop: theme.spacing(2),
        marginBottom: '1em',
    },
    cardBody: {
        margin: 0,
        padding: 0,
    },
    media: {
        background: `url(${publishArticleImage}) top right / cover`,
        marginLeft: 'auto',
    },
    actions: {
        [theme.breakpoints.down('md')]: {
            padding: 0,
            flexWrap: 'wrap',
            '& a': {
                marginTop: '1em',
                marginLeft: '0!important',
                marginRight: '1em',
            },
        },
    },
}));

const Welcome: FC = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Card
            className={classes.root}
            hasNoHeader
            bodyClassName={classes.cardBody}
        >
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.dashboard.welcome.title')}
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                            {translate('pos.dashboard.welcome.subtitle')}
                        </Typography>
                    </Box>
                    <CardActions className={classes.actions}>
                        <Button href="https://marmelab.com/react-admin">
                            <HomeIcon style={{ marginRight: 5 }} />
                            {translate(
                                'pos.dashboard.welcome.ra_button'
                            ).toUpperCase()}
                        </Button>
                        <Button href="https://github.com/marmelab/react-admin/tree/master/examples/demo">
                            <CodeIcon style={{ marginRight: 5 }} />
                            {translate('pos.dashboard.welcome.demo_button')}
                        </Button>
                    </CardActions>
                </Box>

                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    className={classes.media}
                    width="16em"
                    height="9em"
                    overflow="hidden"
                />
            </Box>
        </Card>
    );
};

export default Welcome;
