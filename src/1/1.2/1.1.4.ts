import colors from 'colors'

let counter: number = 0

function count_change(amount: number): number {
  return cc(amount, 5)
}

function log(x: number, y: number): void {
  counter += 1
  const count = colors.yellow(counter.toString())
  const amount = colors.green(x.toString())
  const kind = colors.magenta(y.toString())
  console.log(`CC called ${count} ${counter === 1 ? 'time' : 'times'} \namount: ${amount}, kind_of_coins: ${kind}`)
}

function cc(amount: number, kinds_of_coins: number): number {
  log(amount, kinds_of_coins)
  return amount === 0
    ? 1
    : amount < 0 || kinds_of_coins === 0
      ? 0
      : cc(amount, kinds_of_coins - 1) + cc(amount - first_denomination(kinds_of_coins), kinds_of_coins)
}

function first_denomination(kinds_of_coins: number): number {
  return kinds_of_coins === 1
    ? 1
    : kinds_of_coins === 2
      ? 5
      : kinds_of_coins === 3
        ? 10
        : kinds_of_coins === 4
          ? 25
          : kinds_of_coins === 5
            ? 50
            : 0
}

export default count_change
