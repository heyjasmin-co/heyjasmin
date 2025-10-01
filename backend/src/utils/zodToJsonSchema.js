import { zodToJsonSchema } from 'zod-to-json-schema';

export function convertZodToJsonSchema(zodSchema) {
  return zodToJsonSchema(zodSchema, { target: 'openApi3' });
}

export function createValidationMiddleware(zodSchema) {
  return async (request, reply) => {
    try {
      const validated = zodSchema.parse(request.body);
      request.body = validated;
    } catch (error) {
      reply.code(400).send({
        statusCode: 400,
        error: 'Validation Error',
        message: 'Request validation failed',
        details: error.errors
      });
    }
  };
}