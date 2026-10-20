import assert from "node:assert/strict";
import test from "node:test";
import {
  compactMetadataDescription,
  compactMetadataTitle,
} from "./seo-metadata.ts";

test("keeps concise metadata unchanged", () => {
  assert.equal(compactMetadataTitle("Manda — Product Builder IA"), "Manda — Product Builder IA");
});

test("truncates long titles on a word boundary", () => {
  const title = compactMetadataTitle(
    "Consultant en ranking SEO et GEO pour améliorer la visibilité dans les moteurs IA",
  );

  assert.ok(title.length <= 60);
  assert.match(title, /…$/u);
  assert.doesNotMatch(title, /\s…$/u);
});

test("normalizes markdown and whitespace in descriptions", () => {
  const description = compactMetadataDescription(
    "Une **application métier** avec [des preuves](/projects) et\n\nune livraison documentée.",
  );

  assert.equal(
    description,
    "Une application métier avec des preuves et une livraison documentée.",
  );
});

test("bounds very long descriptions", () => {
  const description = compactMetadataDescription("mot ".repeat(100));

  assert.ok(description.length <= 155);
  assert.match(description, /…$/u);
});
