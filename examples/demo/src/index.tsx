import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'proxy-polyfill';
import * as React from 'react';
import ReactDOM from 'react-dom';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';
import App from './App';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import standardSprite from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';

/**
 * This demo can work with either a fake REST server, or a fake GraphQL server.
 *
 * To avoid bundling both libraries, the dataProvider and fake server factories
 * use the import() function, so they are asynchronous.
 */
const prepareDataProvider = async () => {
    const restoreFetch = await fakeServerFactory(
        process.env.REACT_APP_DATA_PROVIDER || ''
    );
    const dataProvider = await dataProviderFactory(
        process.env.REACT_APP_DATA_PROVIDER || ''
    );
    return { dataProvider, restoreFetch };
};

prepareDataProvider().then(({ dataProvider, restoreFetch }) => {
    ReactDOM.render(
        <IconSettings standardSprite={standardSprite}>
            <App dataProvider={dataProvider} onUnmount={restoreFetch} />
        </IconSettings>,
        document.getElementById('root')
    );
});
