import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { Typography, Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { useContextProvider, type ContextItem } from '@equinor/fusion-framework-react-app/context';

// TODO: export from @equinor/fusion-observable
import { Subject } from 'rxjs';

import { ContextCard } from './ContextCard';
import { ContextSideSheet } from './ContextSideSheet';

import { useContext, useRelatedContext } from '../hooks';

const Styled = {
    // root container of the component
    Root: styled.div({
        display: 'flex',
        flexFlow: 'column',
        gap: tokens.spacings.comfortable.medium,
    }),
    // container for the related context
    RelatedContext: styled.div({
        display: 'flex',
        flexFlow: 'column',
        gap: tokens.spacings.comfortable.medium,
    }),
};

/**
 * Renders the ContextInfo component.
 * This component displays the selected context and related contexts.
 * It also provides functionality to show context details and set a context as current.
 *
 * @component
 */
export const ContextInfo = () => {
    // get the contextId from the route
    const { contextId } = useParams();

    // get context by context id
    const { data: context } = useContext(contextId);

    // get related context by context id
    const { data: relatedContext } = useRelatedContext(contextId);

    // create a stream to show context details
    // when a new context is added to the stream
    // the side sheet will be shown
    const [subject] = useState(new Subject<ContextItem | null>());

    // get the navigate function from the router
    const navigate = useNavigate();

    // get the current context provider
    const provider = useContextProvider();

    // if no context is found return null
    if (!context) {
        return null;
    }

    return (
        <Styled.Root>
            <Typography variant="h2">Selected Context:</Typography>
            <ContextCard context={context}>
                <Button variant="outlined" onClick={() => subject.next(context)}>
                    Show context details
                </Button>
            </ContextCard>
            <Typography variant="h3">Realted Context:</Typography>
            <Styled.RelatedContext>
                {relatedContext ? (
                    relatedContext.map((item) => (
                        <ContextCard context={item} key={item.id}>
                            {
                                // check if the context item is allowed to be set as current
                                provider.validateContext(item) && (
                                    <Button onClick={() => navigate(`/${item.id}`)}>
                                        Set as current
                                    </Button>
                                )
                            }
                            <Button
                                variant="outlined"
                                onClick={() => navigate(`/explore-context/${item.id}`)}
                            >
                                Show context
                            </Button>
                            <Button variant="outlined" onClick={() => subject.next(item)}>
                                Show context details
                            </Button>
                        </ContextCard>
                    ))
                ) : (
                    <p>no related context</p>
                )}
            </Styled.RelatedContext>
            <ContextSideSheet context$={subject} />
        </Styled.Root>
    );
};
