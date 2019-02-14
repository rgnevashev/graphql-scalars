/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const titleize = require('underscore.string/titleize')
const { isNullable } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'FirstName',

  description: 'A field First Name',

  serialize(value) {
    if (isNullable(value)) {
      return null
    }
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`)
    }
    return titleize(value.trim())
  },

  parseValue(value) {
    if (isNullable(value)) {
      return null
    }
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string')
    }
    return titleize(value.trim())
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`)
    }
    return titleize(ast.value.trim())
  }
})
