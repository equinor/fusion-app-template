import { defineAppManifest } from '@equinor/fusion-framework-cli';

export default defineAppManifest(() => {
    return {
        appKey: 'fusion-core-demo-template-app', // if you need a custom appKey other than package.json.name (cli wil strip out domain from .name @equinor/demo-apps -> demo-apps)
    };
});
