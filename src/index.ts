/**
 * This plugin works the same way as
 * https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source
 * which inject __source={{ fileName, lineNumber }} into
 * every React Element so React can debug
 * Ref: https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/shared/describeComponentFrame.js#L35
 */
import * as ts from 'typescript';

export default function Plugin(_program: ts.Program) {
  return {
    before(context: ts.TransformationContext) {
      return (sourceFile: ts.SourceFile) => {
        function visitor(node: ts.Node): ts.Node {
          if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
            // Create fileName attr
            const fileNameAttr = ts.createPropertyAssignment('fileName', ts.createStringLiteral(sourceFile.fileName));

            // Create lineNumber attr
            const lineNumberAttr = ts.createPropertyAssignment(
              'lineNumber',
              ts.createNumericLiteral(`${sourceFile.getLineAndCharacterOfPosition(node.pos).line + 1}`),
            );

            // Create __source={{fileName, lineNumber}} JSX Attribute
            const sourceJsxAttr = ts.createJsxAttribute(
              ts.createIdentifier('__source'),
              ts.createJsxExpression(undefined, ts.createObjectLiteral([fileNameAttr, lineNumberAttr])),
            );

            const clone = ts.getMutableClone(node);
            clone.attributes = ts.createJsxAttributes([...node.attributes.properties, sourceJsxAttr]);

            return clone;
          }

          return ts.visitEachChild(node, visitor, context);
        }

        return ts.visitEachChild(sourceFile, visitor, context);
      };
    },
  };
}
