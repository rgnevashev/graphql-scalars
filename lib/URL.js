/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const { isNullable } = require('./utilities')

const URL_REGEX = new RegExp(
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
)

module.exports = new GraphQLScalarType({
  name: 'URL',

  description: 'A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.',

  serialize(value) {
    if (isNullable(value)) {
      return null
    }
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`)
    }
    if (!value.startsWith('http')) {
      value = `https://${value}`
    }
    if (!URL_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid URL: ${value}`)
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
    if (!value.startsWith('http')) {
      value = `https://${value}`
    }
    if (!URL_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid URL: ${value}`)
    }
    return value
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as URLs but got a: ${ast.kind}`)
    }
    if (!URL_REGEX.test(ast.value)) {
      throw new TypeError(`Value is not a valid URL: ${ast.value}`)
    }
    return ast.value
  }
})
