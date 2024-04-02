import { UseQueryResult, useQuery } from 'react-query';

import { ContextItem } from '@equinor/fusion-framework-react-app/context';

import {
    useHttpClient,
    type HttpJsonResponseError,
} from '@equinor/fusion-framework-react-app/http';

/**
 * Custom hook for fetching a context item from the server.
 *
 * @param id - The ID of the context item to fetch, when not provided the query will be disabled.
 * @returns The result of the query, containing the context item data and error information.
 */
export const useContext = (id?: string): UseQueryResult<ContextItem, HttpJsonResponseError> => {
    const httpClient = useHttpClient('context');
    return useQuery(['context', id], {
        queryFn: () => httpClient.json(`/contexts/${id}`),
        enabled: !!id,
    });
};

export default useContext;
