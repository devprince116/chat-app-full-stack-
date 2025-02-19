export const chatDocs = {
    "/chat": {
        post: {
            summary: "Send a Personal Chat Message",
            description: "Sends a message to another user. Requires authentication.",
            tags: ["Chat"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                receiverId: {
                                    type: "string",
                                    description: "The ID of the recipient user.",
                                    example: "123e4567-e89b-12d3-a456-426614174000",
                                },
                                message: {
                                    type: "string",
                                    description: "The message content.",
                                    example: "Hello, how are you?",
                                },
                            },
                            required: ["receiverId", "message"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Message sent successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    message: { type: "string", example: "Message sent successfully" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "uuid" },
                                            senderId: { type: "string", example: "uuid" },
                                            receiverId: { type: "string", example: "uuid" },
                                            content: { type: "string", example: "Hello, how are you?" },
                                            timestamp: { type: "string", example: "2025-02-19T12:34:56Z" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: "Invalid request data." },
                401: { description: "Unauthorized - Missing or invalid token." },
                404: { description: "User not found." },
            },
        },
    },
    "/chat/grp-chat": {
        post: {
            summary: "Send a Group Chat Message",
            description: "Sends a message in a group chat. Requires authentication.",
            tags: ["Chat"],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                groupId: {
                                    type: "string",
                                    description: "The ID of the group where the message is sent.",
                                    example: "456e7890-e12d-34c5-b678-567890abcdef",
                                },
                                message: {
                                    type: "string",
                                    description: "The message content.",
                                    example: "Hey team, let's discuss the next steps!",
                                },
                            },
                            required: ["groupId", "message"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Message sent successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: { type: "boolean", example: true },
                                    message: { type: "string", example: "Message sent successfully" },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", example: "uuid" },
                                            senderId: { type: "string", example: "uuid" },
                                            groupId: { type: "string", example: "uuid" },
                                            content: { type: "string", example: "Hey team, let's discuss the next steps!" },
                                            timestamp: { type: "string", example: "2025-02-19T12:34:56Z" },
                                            members: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        id: { type: "string", example: "uuid" },
                                                        email: { type: "string", example: "user@example.com" },
                                                        role: { type: "string", example: "user" },
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
                400: { description: "Invalid request data." },
                401: { description: "Unauthorized - Missing or invalid token." },
                403: { description: "User is not a member of this group." },
                404: { description: "Group not found." },
            },
        },
    },
};
