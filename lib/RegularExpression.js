/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const { isNullable } = require('./utilities')

function RegularExpression(name, regex) {
  const REGEX = new RegExp(regex)

  return new GraphQLScalarType({
    name,

    description: `A field whose value matches the provided regular expression ${regex}.`,

    serialize(value) {
      if (isNullable(value)) {
        return null
      }
      if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`)
      }
      if (!REGEX.test(value)) {
        throw new TypeError(`Value does not match the regular expression ${regex}: ${value}`)
      }
      return value
    },

    parseValue(value) {
      if (isNullable(value)) {
        return null
      }
      if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`)
      }
      if (!REGEX.test(value)) {
        throw new TypeError(`Value does not match the regular expression ${regex}: ${value}`)
      }
      return value
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Can only validate strings as regular expressions but got a: ${ast.kind}`)
      }
      if (!REGEX.test(ast.value)) {
        throw new TypeError(`Value does not match the regular expression ${regex}: ${ast.value}`)
      }
      return ast.value
    }
  })
}

module.exports = RegularExpression
