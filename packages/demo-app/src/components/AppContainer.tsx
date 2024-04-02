import { Link, Outlet, matchRoutes, useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { Paper, SideBar } from '@equinor/eds-core-react';
import { home, person } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';
import { validateContextId } from '../utils/validate-context-id';

import { routes } from '../Router';

const Styled = {
    Root: styled.div({
        display: 'flex',
        height: '100%',
    }),
    AppContainer: styled(Paper)({
        padding: tokens.spacings.comfortable.medium,
        width: '100%',
        overflow: 'auto',
    }),
};

/**
 * The main application container component.
 * This component includes a sidebar and the main content area.
 *
 * @component
 */
export const AppContainer = () => {
    // get the current app location
    const location = useLocation();

    // get the matched route, skip the root route
    const matchedRoute = (matchRoutes(routes, location.pathname) ?? [])[1];

    // get the current context
    const { currentContext } = useCurrentContext();

    return (
        <Styled.Root>
            <SideBar open>
                <SideBar.Content>
                    <SideBar.Toggle />
                    <SideBar.Link
                        icon={home}
                        label="Home"
                        to={'/'}
                        as={Link}
                        active={matchedRoute?.route.id === 'home'}
                    />
                    {
                        // only show sidebar items if there is a current context
                        currentContext && (
                            <SideBar.Accordion icon={home} label="Context">
                                <SideBar.AccordionItem
                                    label="current"
                                    to={`/${currentContext.id}`}
                                    as={Link}
                                    active={
                                        matchedRoute?.route.id === 'context' &&
                                        validateContextId(matchedRoute.params.contextId ?? '')
                                    }
                                />
                                <SideBar.AccordionItem
                                    label="explore"
                                    to={`/explore-context/${currentContext.id}`}
                                    as={Link}
                                    active={matchedRoute?.route.id === 'explore-context'}
                                />
                            </SideBar.Accordion>
                        )
                    }
                    <SideBar.Link
                        icon={person}
                        label="User"
                        to="/user"
                        as={Link}
                        active={matchedRoute?.route.id === 'user'}
                    />
                </SideBar.Content>
            </SideBar>
            <Styled.AppContainer>
                <Outlet />
            </Styled.AppContainer>
        </Styled.Root>
    );
};
