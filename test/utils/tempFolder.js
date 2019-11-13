import execa from 'execa';
import path from 'path';
import fs from 'fs-extra';
import tmp from 'tmp';

const cwd = process.cwd();

export default () => {
  const tempFolder = fs.realpathSync(tmp.dirSync({ unsafeCleanup: true }).name);

  const symLinkNodeModules = () => {
    const fromNodeModulesDir = path.join(cwd, 'node_modules');
    const toNodeModulesDir = path.join(tempFolder, 'node_modules');

    const moduleNames = fs.readdirSync(fromNodeModulesDir);

    moduleNames.forEach(moduleName => {
      const fromNodeModuleDir = path.join(fromNodeModulesDir, moduleName);
      const toNodeModuleDir = path.join(toNodeModulesDir, moduleName);

      fs.createSymlinkSync(fromNodeModuleDir, toNodeModuleDir);
    });
  };

  const exe = command => execa.command(command, { cwd: tempFolder });

  const writeFile = (fileName, content) => {
    const outputPath = path.join(tempFolder, fileName);
    fs.outputFileSync(outputPath, content);
  };

  return {
    symLinkNodeModules,
    exe,
    writeFile,
  };
};
