/** @format */

const Name = require('./Name')
const FirstName = require('./FirstName')
const LastName = require('./LastName')
const EmailAddress = require('./EmailAddress')
const PhoneNumber = require('./PhoneNumber')
const PostalCode = require('./PostalCode')
const URL = require('./URL')
const DateTime = require('./DateTime')

const NonPositiveInt = require('./NonPositiveInt')
const PositiveInt = require('./PositiveInt')
const NonNegativeInt = require('./NonNegativeInt')
const NegativeInt = require('./NegativeInt')
const NonPositiveFloat = require('./NonPositiveFloat')
const PositiveFloat = require('./PositiveFloat')
const NonNegativeFloat = require('./NonNegativeFloat')
const NegativeFloat = require('./NegativeFloat')

const RegularExpression = require('./RegularExpression')

module.exports = {
  Name,
  FirstName,
  LastName,
  EmailAddress,
  URL,
  PhoneNumber,
  PostalCode,
  DateTime,
  RegularExpression,

  NonPositiveInt,
  PositiveInt,
  NonNegativeInt,
  UnsignedInt: NonNegativeInt,
  NegativeInt,
  NonPositiveFloat,
  PositiveFloat,
  NonNegativeFloat,
  UnsignedFloat: NonNegativeFloat,
  NegativeFloat
}
