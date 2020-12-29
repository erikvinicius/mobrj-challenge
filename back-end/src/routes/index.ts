import { Router } from 'express';
import Contact from '../models/Contact';

const routes = Router();

routes.post('/contact', async (request, response) => {
  const data = request.body;

  const contact = await Contact.create(data);

  return response.json(contact);
});

export default routes;
