import React from 'react';
import { test as ctBase, expect } from '@playwright/experimental-ct-react';
import { addCoverageReport } from 'monocart-reporter';

import App from '../src/App';

const test = ctBase.extend({
    autoTestFixture: [async ({ page }, use) => {

        // console.log('autoTestFixture setup...');
        // coverage API is chromium only
        if (test.info().project.name === 'chromium') {
            await Promise.all([
                page.coverage.startJSCoverage(),
                page.coverage.startCSSCoverage()
            ]);
        }

        await use('autoTestFixture');

        // console.log('autoTestFixture teardown...');
        if (test.info().project.name === 'chromium') {
            const [jsCoverage, cssCoverage] = await Promise.all([
                page.coverage.stopJSCoverage(),
                page.coverage.stopCSSCoverage()
            ]);
            const coverageList = [... jsCoverage, ... cssCoverage];
            await addCoverageReport(coverageList, test.info());
        }

    }, {
        scope: 'test',
        auto: true
    }]
});


test.use({
    viewport: {
        width: 500, height: 500
    }
});

test('should work', async ({ mount }) => {
    const component = await mount(<App />);
    await expect(component).toContainText('Learn React');
});
