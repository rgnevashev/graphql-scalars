/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const { processValue, VALIDATIONS } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'NonNegativeInt',

  description: 'Integers that will have a value of 0 or more.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NonNegativeInt)
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NonNegativeInt)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as non-negative integers but got a: ${ast.kind}`)
    }

    return processValue(ast.value, VALIDATIONS.NonNegativeInt)
  }
})
