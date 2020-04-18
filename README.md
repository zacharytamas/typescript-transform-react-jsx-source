# typescript-transform-react-jsx-source

This is a TypeScript AST Transformer plugin for [ttypescript](https://github.com/cevek/ttypescript) that adds source file and line number to JSX elements, similar to [babel-plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source). This is a fork of [ts-transform-react-jsx-source](https://github.com/dropbox/ts-transform-react-jsx-source) with some alterations.

## Usage

Update `tsconfig.json` to include the `plugins` section like so:

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "typescript-transform-react-jsx-source" }
    ],
  }
}
```

Update Jest configuration:

```js
{
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  }
}
```

With that configuration, when running `jest`, React errors should look something like this (notice `at File.tsx:NN`):

```text
Warning: An update to null inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
    in Unknown (at edit/index.tsx:43)
    in ErrorBoundaryInternal (at ErrorBoundary.tsx:43)
    in Unknown
    in div (created by Context.Consumer)
    in div (created by Context.Consumer)
    in Card (created by Styled(Card))
    in Styled(Card) (at Card.tsx:94)
    in Unknown (at edit/index.tsx:27)
    in EditFeatureView (at EditFeatureView.test.tsx:28)
    in Provider (at EditFeatureView.test.tsx:19)
    in Router (created by MemoryRouter)
    in MemoryRouter (at EditFeatureView.test.tsx:17)
```
