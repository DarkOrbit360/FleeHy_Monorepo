
import * as repo from '../repositories/trips.repo.js';

export async function search(destination) {
  return repo.findMany({ destination });
}

export async function create(input) {
  // Business rules can go here
  return repo.insert(input);
}
