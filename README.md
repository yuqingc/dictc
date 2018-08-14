# dictc

Dictc generates a documentation website for your *React* Component library.

*Typescript* supported only at present

## Get started

### Installation

```
$ yarn add dictc --dev
```
or
```
$ npm install dectc --save-dev
```

### Configuration

1. Create a folder named `.dictc` in the root directory of your project

2. Create a file named `dictc.config.js` in `dictc`.

3. Config your app.

```
# source tree
.
├── .dictc
│   └── dictc.config.js
└── src
    ├── components
    │   ├── Button
    │   │   ├── Button.tsx
    │   │   ├── index.md
    │   │   └── index.tsx
    │   └── Icon
    │       ├── index.md
    │       └── index.tsx
    └── index.ts

```

```js
// .dictc/dictc.config.js

module.exports = {
  // Default to "Documentation"
  title: 'Title',
  footerText: 'Copyright Company 2018 - Project',
  // Dictc import components used in the documentation from the context directory
  context: 'src', 
  // Define your pages and contents
  sections: [
    {
      // This shows in the side menu
      name: 'Get Started',
      // Single markdown file, use "contentPath"
      contentPath: 'README.md'
    },
    {
      name: 'Components',
      // dictc automatically resolve components in this path
      // dictc searches for "index.md"
      resolvePath: 'src/components/'
    }
  ]
};
```

  4. Run `yarn run dictc`. You can also add this command to your `package.json`

## Caveats

dictc is still at development. Feel free to contribute to this project.
