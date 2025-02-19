export const userDocs = {
    "/users/{token}": {
        post: {
            summary: "Accept Group Invitation",
            description: "Allows a user to join a group via an invitation token. Requires authentication.",
            tags: ["User"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "token",
                    required: true,
                    schema: {
                        type: "string",
                        description: "Invitation token used to join the group.",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                },
            ],
            responses: {
                201: {
                    description: "Successfully joined the group.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    message: { type: "string", example: "Group joined successfully" },
                                    group: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "uuid" },
                                            name: { type: "string", example: "Developers Hub" },
                                            isPublic: { type: "boolean", example: true },
                                            members: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        id: { type: "string", example: "uuid" },
                                                        email: { type: "string", example: "user@example.com" },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: "Invalid request or user already in the group.",
                },
                401: {
                    description: "Unauthorized - Missing or invalid token.",
                },
                404: {
                    description: "Group or user not found.",
                },
            },
        },
    },
};