export const adminDocs = {
    '/admin': {
        get: {
            summary: 'Get All Users',
            description: 'Retrieves a list of all users. Requires authentication.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'List of users retrieved successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string', example: 'uuid-1234' },
                                        email: { type: 'string', example: 'johndoe@example.com' },
                                        role: { type: 'string', example: 'user' },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/admin/{id}': {
        get: {
            summary: 'Get User by ID',
            description: 'Retrieves details of a specific user by their ID. Requires admin role.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'The UUID of the user to retrieve.',
                    example: 'uuid-1234',
                },
            ],
            responses: {
                200: {
                    description: 'User details retrieved successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: 'uuid-1234' },
                                    email: { type: 'string', example: 'johndoe@example.com' },
                                    role: { type: 'string', example: 'user' },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
                404: { description: 'User not found.' },
            },
        },
        '/admin/{id}': {
            delete: {
                summary: 'Delete User',
                description: 'Deletes a specific user by their ID. Requires admin role.',
                tags: ['Admin'],
                security: [{ BearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                        description: 'The UUID of the user to delete.',
                        example: 'uuid-1234',
                    },
                ],
                responses: {
                    200: { description: 'User deleted successfully.' },
                    401: { description: 'Unauthorized - Missing or invalid token.' },
                    403: { description: 'Forbidden - Only admins can delete users.' },
                    404: { description: 'User not found.' },
                },
            },
        }
    },
    '/admin/analytics': {
        get: {
            summary: 'Get Group Analytics',
            description: 'Retrieves statistics about users and groups. Requires admin role.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: 'Successfully retrieved analytics.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    totalUsers: { type: 'number', example: 100 },
                                    totalGroups: { type: 'number', example: 20 },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/admin/invite': {
        post: {
            summary: 'Generate Group Invitation Link',
            description: 'Generates an invitation link for a group. Requires admin role.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                groupId: { type: 'string', example: 'group-uuid' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Invitation link generated successfully.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
                403: { description: 'Forbidden - Only admins can generate invites.' },
            },
        },
    },
};
