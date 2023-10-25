import { createRequire } from 'node:module';
const requireModule = createRequire(import.meta.url);

export const loadJSONFromFile = (path: string) => {
  try {
    return requireModule(path);
  } catch (error) {
    console.error(
      `Error loading JSON file at ${path}: ${(error as Error).message}`
    );
    return null;
  }
};
