import ts from 'typescript'
import { ZodTypeAny } from 'zod'
import { GetType, GetTypeFunction } from './types'

const { factory: f } = ts

export const maybeIdentifierToTypeReference = (identifier: ts.Identifier | ts.TypeNode) => {
  if (ts.isIdentifier(identifier)) {
    return f.createTypeReferenceNode(identifier)
  }

  return identifier
}

export const createTypeReferenceFromString = (identifier: string) =>
  f.createTypeReferenceNode(f.createIdentifier(identifier))

export const createUnknownKeywordNode = () => f.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
export const createTypeAlias = (node: ts.TypeNode, identifier: string) => {
  return f.createTypeAliasDeclaration(
    undefined,
    undefined,
    f.createIdentifier(identifier),
    undefined,
    node,
  )
}

export const printNode = (node: ts.Node, printerOptions?: ts.PrinterOptions) => {
  const sourceFile = ts.createSourceFile('print.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
  const printer = ts.createPrinter(printerOptions)
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
}

export const withGetType = <T extends ZodTypeAny & GetType>(schema: T, getType: GetTypeFunction): T => {
  schema.getType = getType
  return schema
}

export const isUnionTypeNode = (node: ts.TypeNode): node is ts.UnionTypeNode => node.kind === ts.SyntaxKind.UnionType
