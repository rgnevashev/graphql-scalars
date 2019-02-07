/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const { processValue, VALIDATIONS } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'NonPositiveInt',

  description: 'Integers that will have a value of 0 or less.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonPositiveInt)
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonPositiveInt)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as non-positive integers but got a: ${ast.kind}`)
    }

    return processValue(ast.value, VALIDATIONS.NonPositiveInt)
  }
})
