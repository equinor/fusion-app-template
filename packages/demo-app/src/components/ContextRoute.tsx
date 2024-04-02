import { useEffect } from 'react';

import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { useContextProvider } from '@equinor/fusion-framework-react-app/context';

import { validateContextId } from '../utils/validate-context-id';

interface ContextRouteProps {
    fallbackElement?: React.ReactNode;
}

/**
 * Renders a route that is aware of the current context.
 * It extracts the `contextId` from the URL and uses it to set the current context.
 * If the `contextId` is invalid, it either renders a fallback component or displays an error message.
 * The component also subscribes to changes in the `contextId` and updates the current context accordingly.
 *
 * @component
 * @param props - The props for the `ContextRoute` component.
 * @returns The rendered `ContextRoute` component.
 */
export const ContextRoute = (props: ContextRouteProps) => {
    // extract the contextId from the URL
    const { contextId } = useParams();

    // get the navigate function from the router
    const navigate = useNavigate();

    // get the current context provider
    const contextProvider = useContextProvider();

    // get the current context id
    const currentContextId = contextProvider.currentContext?.id;

    // check if the contextId exists
    if (!contextId) {
        throw Error('Invalid contextId, make sure router has :contextId in path');
    }

    // check if the contextId is valid
    if (!validateContextId(contextId)) {
        // return the fallback component if the contextId is invalid or display an error message
        return props.fallbackElement || <p>Invalid context id</p>;
    }

    // execute the effect when the contextId changes
    useEffect(() => {
        // if the contextId is different from the current context id
        // set the current context by contextId
        if (contextProvider.currentContext?.id !== contextId) {
            // create a subscription to the current context
            const subscription = contextProvider.setCurrentContextById(contextId).subscribe(() => {
                navigate(`/${contextId}`, { replace: true });
            });
            // cancel the subscription when the component is unmounted
            return () => subscription.unsubscribe();
        }
    }, [currentContextId, contextId]);

    // render the nested routes
    return <Outlet />;
};
