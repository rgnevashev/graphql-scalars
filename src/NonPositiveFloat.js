/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const { processValue, VALIDATIONS } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'NonPositiveFloat',

  description: 'Floats that will have a value of 0 or less.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonPositiveFloat)
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonPositiveFloat)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only validate floating point numbers as non-positive floating point numbers but got a: ${ast.kind}`)
    }

    return processValue(ast.value, VALIDATIONS.NonPositiveFloat)
  }
})
