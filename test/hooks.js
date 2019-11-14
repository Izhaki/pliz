import execa from 'execa';
import { Before } from 'cucumber';
import tempFolder from './utils/tempFolder';

Before(async function() {
  await execa.command(`yarn link`);
  const { symLinkNodeModules, writeFile, exe } = tempFolder();
  symLinkNodeModules();

  await exe(`yarn link pliz`);
  this.exe = exe;
  this.writeFile = writeFile;
});
