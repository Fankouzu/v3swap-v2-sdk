import { Ether, Token, WETH9, CurrencyAmount } from '@uniswap/sdk-core'
import { Pair, Route } from './index'

const FACTORY_ADDRESS = '0x1111111111111111111111111111111111111111'
const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

describe('Route', () => {
  const ETHER = Ether.onChain(1)
  const token0 = new Token(1, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(1, '0x0000000000000000000000000000000000000002', 18, 't1')
  const weth = WETH9[1]
  const pair_0_1 = new Pair(
    FACTORY_ADDRESS,
    CurrencyAmount.fromRawAmount(token0, '100'),
    CurrencyAmount.fromRawAmount(token1, '200'),
    INIT_CODE_HASH
  )
  const pair_0_weth = new Pair(
    FACTORY_ADDRESS,
    CurrencyAmount.fromRawAmount(token0, '100'),
    CurrencyAmount.fromRawAmount(weth, '100'),
    INIT_CODE_HASH
  )
  const pair_1_weth = new Pair(
    FACTORY_ADDRESS,
    CurrencyAmount.fromRawAmount(token1, '175'),
    CurrencyAmount.fromRawAmount(weth, '100'),
    INIT_CODE_HASH
  )

  it('constructs a path from the tokens', () => {
    const route = new Route([pair_0_1], token0, token1)
    expect(route.pairs).toEqual([pair_0_1])
    expect(route.path).toEqual([token0, token1])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(token1)
    expect(route.chainId).toEqual(1)
  })

  it('can have a token as both input and output', () => {
    const route = new Route([pair_0_weth, pair_0_1, pair_1_weth], weth, weth)
    expect(route.pairs).toEqual([pair_0_weth, pair_0_1, pair_1_weth])
    expect(route.input).toEqual(weth)
    expect(route.output).toEqual(weth)
  })

  it('supports ether input', () => {
    const route = new Route([pair_0_weth], ETHER, token0)
    expect(route.pairs).toEqual([pair_0_weth])
    expect(route.input).toEqual(ETHER)
    expect(route.output).toEqual(token0)
  })

  it('supports ether output', () => {
    const route = new Route([pair_0_weth], token0, ETHER)
    expect(route.pairs).toEqual([pair_0_weth])
    expect(route.input).toEqual(token0)
    expect(route.output).toEqual(ETHER)
  })
})
