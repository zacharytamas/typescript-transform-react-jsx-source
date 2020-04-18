import { resolve } from 'path';
import { expect } from 'chai';
import { readFile } from 'fs-extra';

describe('transformer', function() {
  this.timeout(5000);

  it('should hoist el with primitive attributes', async () => {
    const content = await readFile(resolve(__dirname, 'fixture/El.js'), 'utf8');
    expect(content).to.contain('test/fixture/El.tsx", lineNumber: 6 }');
    expect(content).to.contain('test/fixture/El.tsx", lineNumber: 8 }');
    expect(content).to.contain('test/fixture/El.tsx", lineNumber: 9 }');
  });
});
