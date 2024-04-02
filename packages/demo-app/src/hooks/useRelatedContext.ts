import { UseQueryResult, useQuery } from 'react-query';

import {
    useHttpClient,
    type HttpJsonResponseError,
} from '@equinor/fusion-framework-react-app/http';

import { ContextItem } from '@equinor/fusion-framework-react-module-context';

/**
 * Custom hook to fetch related context items.
 *
 * @param id_or_item - The ID or the context item to fetch related items for.
 * @returns The query result containing the related context items or an error.
 */
export const useRelatedContext = (
    id_or_item?: string | ContextItem,
): UseQueryResult<ContextItem[] | undefined, HttpJsonResponseError> => {
    const id = typeof id_or_item === 'string' ? id_or_item : id_or_item?.id;
    const httpClient = useHttpClient('context');
    return useQuery(['relatedContexts', id], {
        queryFn: () => httpClient.json(`/contexts/${id}/relations`),
        enabled: !!id,
    });
};

export default useRelatedContext;
