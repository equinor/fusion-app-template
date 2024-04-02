import { type AppModuleInitiator } from '@equinor/fusion-framework-react-app';

import { enableContext } from '@equinor/fusion-framework-react-module-context';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

// The configure function is an async function that is called when the app is initialized
export const configure: AppModuleInitiator = async (configurator, { env }) => {
    // Enable the context module with the orgchart context type
    enableContext(configurator, async (builder) => {
        builder.setContextType(['orgchart']);
    });

    // Specify that the app should use the navigation module
    enableNavigation(configurator, env.basename);

    // Use the framework service clients for the context and people services
    configurator.useFrameworkServiceClient('context');
    configurator.useFrameworkServiceClient('people');
};

export default configure;
