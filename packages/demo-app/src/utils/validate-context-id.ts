/**
 * Validates a context ID.
 * @param contextId - The context ID to validate.
 * @returns A boolean indicating whether the context ID is valid.
 */
export const validateContextId = (contextId: string): boolean => {
    return (
        contextId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) !== null
    );
};
