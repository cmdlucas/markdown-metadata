import parser from '../src';
import yamlParser from 'js-yaml'
const source = require('./__fixtures__/documents');

beforeAll(() => {
  jest.spyOn(yamlParser, 'safeLoad').mockImplementation(() => ({}))
});

it('parses metadata in a syntactically correct markdown document', () => {
  jest.spyOn(yamlParser, 'safeLoad').mockImplementationOnce(() => source.metadata01)
  expect(parser(source.document01)).toMatchSnapshot();
});

it('parses metadata in a syntactically correct markdown document with no content', () => {
  jest.spyOn(yamlParser, 'safeLoad').mockImplementationOnce(() => source.metadata02)
  expect(parser(source.document02)).toMatchSnapshot();
});

it('returns no metadata in a document without the ending triple dashes', () => {
  expect(parser(source.document03)).toMatchSnapshot();
});

it('returns no metadata in a document without the opening triple dashes', () => {
  expect(parser(source.document04)).toMatchSnapshot();
});

it('returns no metadata in a document with empty metadata', () => {
  expect(parser(source.document05)).toMatchSnapshot();
});

it('returns no metadata in a document with metadata placed at the end', () => {
  expect(parser(source.document06)).toMatchSnapshot();
});

it('returns no metadata in a document without metadata', () => {
  expect(parser(source.document07)).toMatchSnapshot();
});

it("throws TypeError if it doesn't receive a String for src parameter", () => {
  function parseNumber() {
    parser(123);
  }

  expect(parseNumber).toThrowError(
    TypeError('Source parameter (src) must be a string.')
  );
});

it("throws TypeError if configuration is set but windows prop is not boolean", () => {
  function parseNumber() {
    parser("123", { windows: "true" });
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
    parser(source.document08);
  }

  expect(parseSyntacticallyIncorrectYAML).toThrow();
});
