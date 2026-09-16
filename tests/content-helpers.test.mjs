import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { transpileModule, ModuleKind, ScriptTarget } from "typescript";

// Test standalone TypeScript helpers without another test-runner dependency.
async function loadHelper(name) {
  const source = readFileSync(new URL(`../src/app/lib/${name}.ts`, import.meta.url), "utf8");
  const { outputText } = transpileModule(source, {
    compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

test("study registration safely handles changed or missing source markup", async () => {
  const { studyRegistrationUrl } = await loadHelper("study");
  assert.equal(studyRegistrationUrl(undefined), null);
  assert.equal(studyRegistrationUrl("no registration link"), null);
  assert.equal(studyRegistrationUrl('<a href="javascript:alert(1)">Register</a>'), null);
  assert.equal(studyRegistrationUrl('<a href="https://forms.cloud.microsoft.evil.test/">Register</a>'), null);
  assert.equal(studyRegistrationUrl("<a href='https://forms.cloud.microsoft/pages/test?a=1&amp;b=2'>Register</a>"), "https://forms.cloud.microsoft/pages/test?a=1&b=2");
});

test("imported links and redirects share source destinations", async () => {
  const { sourceDestination } = await loadHelper("source-routes");
  assert.equal(sourceDestination("digital-phenotyping", new Set()), "/research/digital-phenotyping");
  assert.equal(sourceDestination("masters-students", new Set()), "/opportunities");
  assert.equal(sourceDestination("37-plex", new Set(["37-plex"])), "/research/37-plex");
  assert.equal(sourceDestination("unknown", new Set()), undefined);
});
