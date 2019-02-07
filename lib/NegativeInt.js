/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

const { processValue, VALIDATIONS } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'NegativeInt',

  description: 'Integers that will have a value less than 0.',

  serialize(value) {
    return processValue(value, VALIDATIONS.NegativeInt)
  },

  parseValue(value) {
    return processValue(value, VALIDATIONS.NegativeInt)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only validate integers as negative integers but got a: ${ast.kind}`)
    }

    return processValue(ast.value, VALIDATIONS.NegativeInt)
  }
})
