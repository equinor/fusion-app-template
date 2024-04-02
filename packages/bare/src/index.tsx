import { createRoot } from 'react-dom/client';

import { makeComponent, ComponentRenderArgs } from '@equinor/fusion-framework-react-app';

import { configure } from './config';
import { App } from './App';

// bootstrap the app
// wrap the app in the component render function
const createApp = (args: ComponentRenderArgs) => makeComponent(<App />, args, configure);

export default function (el: HTMLElement, args: ComponentRenderArgs) {
    // create a React root for the app
    const root = createRoot(el);

    // create the app
    // pass the portal render args to the app
    const App = createApp(args);

    // render the app on the React root
    root.render(<App />);

    // return a cleanup function
    return () => root.unmount();
}
