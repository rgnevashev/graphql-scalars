/** @format */

const { GraphQLScalarType } = require('graphql')
const { GraphQLError } = require('graphql/error')
const { Kind } = require('graphql/language')

//const EMAIL_ADDRESS_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

module.exports = new GraphQLScalarType({
  name: 'EmailAddress',

  description: 'A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.',

  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`)
    }

    if (!EMAIL_ADDRESS_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`)
    }

    return value.toLowerCase()
  },

  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string')
    }

    if (!EMAIL_ADDRESS_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`)
    }

    return value.toLowerCase()
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`)
    }

    if (!EMAIL_ADDRESS_REGEX.test(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`)
    }

    return ast.value.toLowerCase()
  }
})
