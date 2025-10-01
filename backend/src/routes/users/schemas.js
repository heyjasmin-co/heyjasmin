export const getUserMeSchema = {
  tags: ['users'],
  description: 'Get current authenticated user',
  security: [{ BearerAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            clerkUserId: { type: 'string' },
            email: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            imageUrl: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
          }
        }
      }
    }
  }
};

export const getUserByIdSchema = {
  tags: ['users'],
  description: 'Get user by ID',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'MongoDB ObjectId' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: { type: 'object' }
      }
    }
  }
};

export const getAllUsersSchema = {
  tags: ['users'],
  description: 'Get all users with pagination',
  security: [{ BearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        users: { type: 'array' },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            pages: { type: 'integer' }
          }
        }
      }
    }
  }
};