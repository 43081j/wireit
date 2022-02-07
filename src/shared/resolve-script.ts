import * as pathlib from 'path';
import {KnownError} from './known-error.js';

export const resolveScript = (
  packageJsonPath: string,
  scriptName: string
): {packageJsonPath: string; scriptName: string} => {
  // TODO(aomarks) Can a script actually start with "."? In that case, maybe we
  // require the syntax ":.foo". And if there is a script called ":.foo", then
  // we require "::.foo".
  if (scriptName.startsWith('.')) {
    const match = scriptName.match(/([^:]+):(.+)$/);
    if (match == undefined) {
      throw new KnownError(
        'script-not-found',
        `Invalid script name: ${scriptName}`
      );
    }
    const relativePath = match[1];
    scriptName = match[2];
    packageJsonPath = pathlib.resolve(
      pathlib.dirname(packageJsonPath),
      relativePath,
      'package.json'
    );
  }
  return {packageJsonPath, scriptName};
};
