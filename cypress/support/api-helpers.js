// Example: api-helpers.js

const getAuthorizationHeader = () => ({
    'Authorization': `Bearer ${Cypress.env('API_TOKEN')}`
});

// Generic function for making API requests
const apiRequest = (method, resource, resourceId = '', body = null) => {
    return cy.request({
        method,
        url: `/api/${resource}${resourceId ? `/${resourceId}` : ''}`,
        headers: getAuthorizationHeader(),
        body: body ? body : undefined // Only include body if provided
    });
};

// Specific methods that utilize the generic apiRequest
export const createResource = (resource, data) => {
    return apiRequest('POST', resource, '', data);
};

export const getResource = (resource, resourceId) => {
    return apiRequest('GET', resource, resourceId);
};

export const updateResource = (resource, resourceId, updatedData) => {
    return apiRequest('PUT', resource, resourceId, updatedData);
};

export const deleteResource = (resource, resourceId) => {
    return apiRequest('DELETE', resource, resourceId);
};
