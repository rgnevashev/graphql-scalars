/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')
const { parseNumber, formatNumber } = require('libphonenumber-js')

const PHONE_NUMBER_REGEX = new RegExp(/^\+\d{11,15}$/)

module.exports = new GraphQLScalarType({
  name: 'PhoneNumber',

  description:
    'A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.',

  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`)
    }

    const v = formatNumber(parseNumber(value, 'US'), 'E.164')

    if (!PHONE_NUMBER_REGEX.test(v)) {
      throw new TypeError(`Value is not a valid phone number: ${value}`)
    }

    return v
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`)
    }

    const v = formatNumber(parseNumber(value, 'US'), 'E.164')

    if (!PHONE_NUMBER_REGEX.test(v)) {
      throw new TypeError(`Value is not a valid phone number: ${value}`)
    }

    return v
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as phone numbers but got a: ${ast.kind}`)
    }

    if (!PHONE_NUMBER_REGEX.test(ast.value)) {
      throw new TypeError(`Value is not a valid phone number: ${ast.value}`)
    }

    return ast.value
  }
})
