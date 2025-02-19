export const groupDocs = {
    "/group": {
        post: {
            summary: "Create a Group",
            description: "Creates a new group. Requires authentication.",
            tags: ["Group"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "The name of the group.",
                                    example: "Dev Hub",
                                },
                                isPublic: {
                                    type: "boolean",
                                    description: "Whether the group is public or private.",
                                    example: true,
                                },
                            },
                            required: ["name", "isPublic"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Group created successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                        description: "The ID of the created group.",
                                        example: "uuid",
                                    },
                                    name: {
                                        type: "string",
                                        description: "The name of the created group.",
                                        example: "Dev Hub",
                                    },
                                    isPublic: {
                                        type: "boolean",
                                        description: "Visibility status of the group.",
                                        example: true,
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid request data." },
                401: { description: "Unauthorized - Missing or invalid token." },
            },
        },
    },
    "/group/{id}": {
        post: {
            summary: "Join a Public Group",
            description: "Allows a user to join a public group. Requires authentication.",
            tags: ["Group"],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                        description: "The ID of the group to join.",
                        example: "uuid",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Successfully joined the group.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    message: { type: "string", example: "Joined group successfully" },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid request or group is private." },
                401: { description: "Unauthorized - Missing or invalid token." },
                404: { description: "Group not found." },
            },
        },
    },
    "/group/all": {
        get: {
            summary: "Get All Groups",
            description: "Retrieves a list of all available groups. Requires authentication.",
            tags: ["Group"],
            security: [{ BearerAuth: [] }],
            responses: {
                200: {
                    description: "List of groups retrieved successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "string", example: "uuid" },
                                        name: { type: "string", example: "Developers Hub" },
                                        isPublic: { type: "boolean", example: true },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: "Unauthorized - Missing or invalid token." },
            },
        },
    },
};
