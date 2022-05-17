import { Application, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT-AUTH-TS',
      description:
        'Implementation of JWT in an auth system using TypeScript for the JOBarcelona Hackathon ',
      version: '1.0.0',
      contact: {
        name: 'Ibai Alberdi',
        url: 'https://www.linkedin.com/in/ibaialberdi/'
      }
    }
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.ts', './index.ts']
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Application, port: Number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
