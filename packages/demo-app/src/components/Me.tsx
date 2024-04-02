import { useQuery } from 'react-query';

import { useHttpClient } from '@equinor/fusion-framework-react-app/http';

import { Typography } from '@equinor/eds-core-react';

/**
 * Represents a component that displays information about the current user.
 *
 * @component
 */
export const Me = () => {
    // create a http client for the people service
    const httpClient = useHttpClient('people');

    // setups a query to get the current user
    const { data: personData } = useQuery(['persons', 'me'], () => {
        return httpClient.json(`/persons/me?api-version=3.0&$expand=roles,positions`);
    });

    return (
        <section>
            <Typography variant="h3">Current user :</Typography>
            <pre>{JSON.stringify(personData, null, 2)}</pre>
        </section>
    );
};

export default Me;
