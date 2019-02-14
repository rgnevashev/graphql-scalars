/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const format = require('date-fns/format')
const { isNullable } = require('./utilities')

module.exports = new GraphQLScalarType({
  name: 'DateTime',

  description: 'Use JavaScript Date object for date/time fields.',

  serialize(value) {
    if (isNullable(value)) {
      return null
    }
    let result = value
    if (!(value instanceof Date) && typeof value !== 'string' && typeof value !== 'number') {
      throw new TypeError(`Value is not an instance of Date or Date string or timestamp: ${value}`)
    }
    if (typeof value === 'string') {
      result = new Date()
      result.setTime(Date.parse(value))
    }
    if (typeof value === 'number') {
      result = new Date()
      result.setTime(value * 1000)
    }
    if (Number.isNaN(result.getTime())) {
      throw new TypeError(`Date can't represent non-date value: ${value}`)
    }
    result = format(result, 'YYYY-MM-DDTHH:mm:ss')
    return result
  },

  parseValue(value) {
    if (isNullable(value)) {
      return null
    }
    let result = value
    result = new Date(typeof value === 'number' ? value * 1000 : value)
    if (Number.isNaN(result.getTime())) {
      throw new TypeError(`Date can't represent non-date value: ${value}`)
    }
    return result
  },

  parseLiteral(ast) {
    let result = null
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT) {
      result = new Date(ast.value * 1000)
    } else {
      // if (ast.kind === Kind.STRING)
      result = new Date(ast.value)
    }
    if (Number.isNaN(result.getTime())) {
      throw new GraphQLError(`Expected date value but got: ${ast.value}`)
    }
    /*
    if (new Date(ast.value).getTime() !== result.getTime()) {
      throw new GraphQLError(`Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${ast.value}`)
    }
    */
    return result
  }
})
