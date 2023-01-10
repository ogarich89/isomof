import type { FastifyReply, FastifyRequest } from 'fastify';

interface Request extends FastifyRequest {
  body: {
    lng: string;
  };
}

interface Handler {
  (request: Request, reply: FastifyReply): Promise<void>;
}

export const language: Handler = async (request, reply) => {
  const {
    body: { lng },
  } = request;
  request.session.set('lng', lng);
  reply.send({ message: 'Language is changed' });
};
