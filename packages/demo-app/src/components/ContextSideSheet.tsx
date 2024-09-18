import { useEffect, useState } from 'react';

import { SideSheet } from '@equinor/fusion-react-side-sheet';

import { ContextItem } from '@equinor/fusion-framework-react-module-context';

import { Observable } from '@equinor/fusion-observable';

interface ContextSideSheetProps {
    // An observable that emits the current context item
    readonly context$: Observable<ContextItem | null>;
}

/**
 * Represents a side sheet component that displays contextual information.
 * Displays the current context item in a side sheet.
 *
 * @component
 * @param {ContextSideSheetProps} props - The props for the ContextSideSheet component.
 * @returns {JSX.Element | null} The rendered ContextSideSheet component.
 */
export const ContextSideSheet = (props: ContextSideSheetProps) => {
    const { context$ } = props;

    // state to hold the current context item
    const [context, setContext] = useState<ContextItem | null>(null);

    // clear the context when the side sheet is closed
    const onClose = () => setContext(null);

    // subscribe to the context observable
    useEffect(() => {
        // create a subscription to the context observable
        const subscription = context$.subscribe((context) => setContext(context));
        // cancel the subscription when the component is unmounted
        return () => subscription.unsubscribe();
    }, [context$]);

    // if no context is found return null
    if (!context) return null;

    return (
        <SideSheet isOpen={!!context} onClose={onClose}>
            <SideSheet.Title title={context.title ?? context.id} />
            <SideSheet.SubTitle subTitle={context.type.id} />
            <SideSheet.Content>
                <pre>{JSON.stringify(context, null, 2)}</pre>
            </SideSheet.Content>
        </SideSheet>
    );
};
