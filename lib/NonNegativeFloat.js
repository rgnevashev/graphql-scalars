/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const { processValue, VALIDATIONS } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'NonNegativeFloat',

  description: 'Floats that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonNegativeFloat)
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonNegativeFloat)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT) {
      throw new GraphQLError(`Can only validate floating point numbers as non-negative floating point numbers but got a: ${ast.kind}`)
    }

    return processValue(ast.value, VALIDATIONS.NonNegativeFloat)
  }
})
