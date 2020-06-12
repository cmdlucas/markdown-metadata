const parser = require('../lib/parser');
const source = require('./__fixtures__/documents');

/**
 * Mock js-yaml.
 * safeLoad: return empty object by default.
 */
let yamlParser;

beforeAll(() => {
  yamlParser = {
    safeLoad: jest.fn().mockImplementation(() => ({}))
  };
});

it('parses metadata in a syntactically correct markdown document', () => {
  yamlParser.safeLoad.mockImplementationOnce(() => source.metadata01);
  expect(parser(yamlParser)(source.document01)).toMatchSnapshot();
});

it('parses metadata in a syntactically correct markdown document with no content', () => {
  yamlParser.safeLoad.mockImplementationOnce(() => source.metadata02);
  expect(parser(yamlParser)(source.document02)).toMatchSnapshot();
});

it('returns no metadata in a document without the ending triple dashes', () => {
  expect(parser(yamlParser)(source.document03)).toMatchSnapshot();
});

it('returns no metadata in a document without the opening triple dashes', () => {
  expect(parser(yamlParser)(source.document04)).toMatchSnapshot();
});

it('returns no metadata in a document with empty metadata', () => {
  expect(parser(yamlParser)(source.document05)).toMatchSnapshot();
});

it('returns no metadata in a document with metadata placed at the end', () => {
  expect(parser(yamlParser)(source.document06)).toMatchSnapshot();
});

it('returns no metadata in a document without metadata', () => {
  expect(parser(yamlParser)(source.document07)).toMatchSnapshot();
});

it("throws TypeError if it doesn't receive a String for src parameter", () => {
  function parseNumber() {
    parser(yamlParser)(123);
  }

  expect(parseNumber).toThrowError(
    TypeError('Source parameter (src) must be a string.')
  );
});

it("throws TypeError if it receives an empty configuration", () => {
  function parseNumber() {
    parser(yamlParser)("123", {});
  }

  expect(parseNumber).toThrowError(
    TypeError('Configuration can\'t be empty.')
  );
});

it("throws TypeError if it doesn't receive a boolean as windows configuration", () => {
  function parseNumber() {
    parser(yamlParser)("123", { windows: "true" });
  }

  expect(parseNumber).toThrowError(
    TypeError('Configuration property (windows) must be a boolean.')
  );
});

it('throws Error if metadata are syntactically incorrect', () => {
  yamlParser.safeLoad.mockImplementationOnce(() => {
    throw new Error();
  });

  function parseSyntacticallyIncorrectYAML() {
    parser(yamlParser)(source.document08);
  }

  expect(parseSyntacticallyIncorrectYAML).toThrow();
});
