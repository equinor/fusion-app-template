import { defineAppConfig } from '@equinor/fusion-framework-cli';

export default defineAppConfig(() => {
    return {
        environment: {},
        endpoints: {
            myapi: {
                url: 'http://bar.baz',
                scopes: [],
            },
        },
    };
});
