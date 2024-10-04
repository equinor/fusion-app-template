import { defineAppConfig } from '@equinor/fusion-framework-cli';

export default defineAppConfig(() => {
    return {
        endpoints: {
            myApi: {
                url: 'http://bar.baz',
            },
        },
    };
});
