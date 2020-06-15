# Markdown Metadata

[![Build Status](https://travis-ci.org/cmdlucas/markdown-metadata.svg?branch=master)](https://travis-ci.org/cmdlucas/markdown-metadata)

Markdown metadata extractor. Extract metadata from a markdown document.

## Installation

Install the latest version with npm or Yarn:

```bash
$ npm install @cmdlucas/markdown-metadata
```

```bash
$ yarn add @cmdlucas/markdown-metadata
```

## Usage

In order to be parsed, metadata must be placed at the beginning of the markdown document between two triple dashes. Example:

    ---
    title: Lorem ipsum dolor sit amet
    author: Marcus Antonius
    keywords: latin, ipsum
    ---

    Vestibulum tortor quam, *feugiat vitae*, ultricies eget, tempor sit amet, ante.

Here's how to parse the metadata:

```js
const metadataParser = require('@cmdlucas/markdown-metadata');

// Assuming source is a string containing the markdown document
const source = '--- title: Lorem...';

// Parse source. Result is a two-property object
const result = metadataParser(source);

// The first property, 'metadata', is the object of parsed metadata. Example:
//
// {
//     'title': 'Lorem ipsum dolor sit amet',
//     'author': 'Marcus Antonius',
//     'keywords': 'latin, ipsum'
// };
result.metadata;

// The second property, 'content', is the document source without metadata. Example:
//
// Vestibulum tortor quam, *feugiat vitae*, ultricies eget, tempor sit amet, ante.
result.content;
```

## Parse Support
Currently, only `yaml` is supported. Future versions intend to support `toml` and other popular file configuration formats.

## License

Markdown Metadata extractor is licensed under the MIT License. See the `LICENSE` file for details.