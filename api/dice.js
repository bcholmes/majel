/**
 * Copyright 2019-2025 John H. Nguyen
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

module.exports = {
  globalComplication: 20,

  /**
   * Rolls a number of challenge dice (d6) equal to numDice. The results
   * will be formated and sent back into chat.
   * @param numDice The number of dice.
   * @returns Formatted result as a string/
   */
  rollD6(numDice, game) {
    let rawResult = ''
    let rawResultValues = ''
    let numericResult = 0
    let fxResult = 0
    let maxDice = Math.min(numDice, 36)
    maxDice = Math.max(maxDice, 1)
    for (let i = 0; i < maxDice; ++i) {
      let roll = Math.floor(Math.random() * 6) + 1

      if (roll < 3) {
        numericResult += roll
      } else if (roll < 5) {
      } else {
        ++numericResult
        ++fxResult
      }

      const d6Emojis = game.images['d6-emojis']

      rawResult += d6Emojis[roll - 1]
      if (rawResultValues) {
        rawResultValues += ', '
      }

      rawResultValues += roll
    }

    return {
      rawResult,
      numericResult,
      fxResult,
      rawResultValues
    }
  },

  rollD20(numDice, args, game) {
    let rawResult = ''
    let renderedResult = ''
    let critRange = 1
    let compRange = this.globalComplication
    let target = compRange - 1 // everything under a complication can be a success
    let success = 0
    let complication = 0
    let difficulty = 0

    if (args.length > 0) {
      target = parseInt(args[0])
    }

    if (args.length > 1) {
      critRange = parseInt(args[1])
    }

    if (args.length > 2) {
      compRange = parseInt(args[2])
    }

    if (args.length > 3) {
      difficulty = parseInt(args[3])
    }

    for (let i = 0; i < numDice; ++i) {
      if (rawResult !== '') {
        rawResult += ', '
      }

      let roll = Math.floor(Math.random() * 20) + 1
      // renderedResult += '🔳'
      
      if (roll >= compRange) {
        ++complication
        // renderedResult = renderedResult.slice(0, renderedResult.length - 1)
        if (renderedResult !== '') {
          renderedResult += ' '
        }
        renderedResult += game.images['d20-emojis'].complication
      }

      if (roll <= target) {
        ++success

        // renderedResult = renderedResult.slice(0, renderedResult.length - 1)
        if (renderedResult !== '') {
          renderedResult += ' '
        }

        if (roll <= critRange) {
          ++success
          renderedResult += game.images['d20-emojis'].critical
        } else {
          renderedResult += game.images['d20-emojis'].success
        }
      }

      rawResult += roll
    }

    return {
      target,
      critRange,
      compRange,
      rawResult,
      renderedResult,
      success,
      complication,
      difficulty
    }
  },
}
