import { ContextItem } from '@equinor/fusion-framework-react-app/context';

import { Card, Typography } from '@equinor/eds-core-react';

interface ContextCardProps {
    context: ContextItem;
}

/**
 * Renders a context card component.
 *
 * @component
 * @example
 * ```tsx
 * <ContextCard context={myContext}>
 *   <Button>Click me</Button>
 * </ContextCard>
 * ```
 */
export const ContextCard = (props: React.PropsWithChildren<ContextCardProps>) => {
    const { context, children } = props;
    return (
        <Card elevation="raised">
            <Card.Header>
                <Card.HeaderTitle>
                    <Typography variant="h5">{context.title}</Typography>
                    <Typography variant="caption">{context.type.id}</Typography>
                </Card.HeaderTitle>
            </Card.Header>
            <Card.Actions alignRight>{children}</Card.Actions>
        </Card>
    );
};
