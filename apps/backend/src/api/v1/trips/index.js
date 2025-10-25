
import { Router } from 'express';
import * as trips from '../../../services/trips.service.js';

const r = Router();

r.get('/', async (req, res, next) => {
  try {
    const data = await trips.search(req.query.destination || '');
    res.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.json(data);
  } catch (e) { next(e); }
});

r.post('/', async (req, res, next) => {
  try {
    const created = await trips.create(req.body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

export default r;
