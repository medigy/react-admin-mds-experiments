import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Button from '../foundation/ui/ui-button/Button';
import Card from '../netspective-studios/design-system/components/card/Card';
import { useTranslate, useLocale, useSetLocale, Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { changeTheme } from './actions';
import { AppState } from '../types';

const useStyles = makeStyles({
    label: { width: '10em', display: 'inline-block' },
    cardBody: {
        marginTop: 0,
    },
    button: { margin: '1em' },
});

const Configuration = () => {
    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    const theme = useSelector((state: AppState) => state.theme);
    const dispatch = useDispatch();
    return (
        <Card hasNoHeader bodyClassName={classes.cardBody}>
            <Title title={translate('pos.configuration')} />
            <CardContent>
                <div className={classes.label}>
                    {translate('pos.theme.name')}
                </div>
                <Button
                    variant="brand"
                    className={classes.button}
                    // color={theme === 'light' ? 'primary' : 'default'}
                    onClick={() => dispatch(changeTheme('light'))}
                >
                    {translate('pos.theme.light')}
                </Button>
                <Button
                    variant="brand"
                    className={classes.button}
                    // color={theme === 'dark' ? 'primary' : 'default'}
                    onClick={() => dispatch(changeTheme('dark'))}
                >
                    {translate('pos.theme.dark')}
                </Button>
            </CardContent>
            <CardContent>
                <div className={classes.label}>{translate('pos.language')}</div>
                <Button
                    variant="brand"
                    className={classes.button}
                    // color={locale === 'en' ? 'primary' : 'default'}
                    onClick={() => setLocale('en')}
                >
                    en
                </Button>
                <Button
                    variant="brand"
                    className={classes.button}
                    // color={locale === 'fr' ? 'primary' : 'default'}
                    onClick={() => setLocale('fr')}
                >
                    fr
                </Button>
            </CardContent>
        </Card>
    );
};

export default Configuration;
