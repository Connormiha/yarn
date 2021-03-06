/* @flow */

import {NoopReporter} from 'reporters/index.js';
import {Install} from 'cli/commands/install.js';
import Lockfile from 'lockfile';
import Config from 'config.js';

const path = require('path');

const fixturesLoc = path.join(__dirname, '..', '..', 'fixtures', 'install');

test.concurrent('flat arg is inherited from root manifest', async (): Promise<void> => {
  const cwd = path.join(fixturesLoc, 'top-level-flat-parameter');
  const reporter = new NoopReporter();
  const config = await Config.create({cwd});
  const install = new Install({}, config, reporter, new Lockfile());
  return install.fetchRequestFromCwd().then(function({manifest}) {
    expect(manifest.flat).toEqual(true);
    expect(install.flags.flat).toEqual(true);
  });
});
