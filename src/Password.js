/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

module.exports = (name, min = 1, max, alphabet, complexity) => {
  const coerceType = value => {
    if (typeof value !== 'string') {
      throw new TypeError(`${name} cannot represent a non string value: [${String(value)}]`)
    }
    if (value.length < min) {
      throw new TypeError(`${name} not long enough`)
    }
    if (max && value.length > max) {
      throw new TypeError(`${name} too long`)
    }
    if (alphabet) {
      for (let char of value) {
        if (alphabet.indexOf(char) < 0) {
          throw new TypeError(`${name} has a not allowed character`)
        }
      }
    }
    if (complexity) {
      const alphaNumericRe = /^(?=.*[0-9])(?=.*[a-zA-Z])(.+)$/
      const mixedCaseRe = /^(?=.*[a-z])(?=.*[A-Z])(.+)$/
      const specialCharsRe = /^(?=.*[^a-zA-Z0-9])(.+)$/
      if (complexity.alphaNumeric && !alphaNumericRe.test(value)) {
        throw new TypeError(`${name} must contain at least one number and one letter`)
      }
      if (complexity.mixedCase && !mixedCaseRe.test(value)) {
        throw new TypeError(`${name} must contain at least one upper and one lower case letter`)
      }
      if (complexity.specialChars && !specialCharsRe.test(value)) {
        throw new TypeError(`${name} must contain at least one special character`)
      }
    }

    return value
  }

  return new GraphQLScalarType({
    name,
    description: 'A password string.',
    serialize: coerceType,
    parseValue: coerceType,
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(`Can only validate strings as password but got a: ${ast.kind}`)
      }
      return coerceType(ast.value)
    }
  })
}
