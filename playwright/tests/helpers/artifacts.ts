import fs from 'fs';
import path from 'path';

const artifactsDir = path.join(process.cwd(), 'e2e-report', 'artifacts');

export function artifactPath(filename: string) {
  fs.mkdirSync(artifactsDir, { recursive: true });
  return path.join(artifactsDir, filename);
}

