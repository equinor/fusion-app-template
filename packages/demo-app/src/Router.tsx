import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { useRouter } from '@equinor/fusion-framework-react-app/navigation';

import { AppContainer } from './components/AppContainer';
import { ContextRoute } from './components/ContextRoute';
import { ContextInfo } from './components/ContextInfo';

import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';

// create application routes
export const routes = createRoutesFromElements(
    <Route path="/" element={<AppContainer />}>
        <Route id="home" element={<HomePage />} index />
        <Route id="user" path="user" element={<UserPage />} />
        <Route
            id="context"
            path=":contextId"
            element={<ContextRoute fallbackElement={<p>Invalid context provided</p>} />}
        >
            <Route index element={<ContextInfo />} />
        </Route>
        <Route id="explore-context" path="explore-context/:contextId" element={<ContextInfo />} />
    </Route>,
);

// create the application router
export const Router = () => {
    const router = useRouter(routes);
    return <RouterProvider router={router} fallbackElement={<p>:(</p>} />;
};
