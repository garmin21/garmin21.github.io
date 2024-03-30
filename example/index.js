const { promise, resolve, reject } = Promise.withResolvers()

console.log(promise) // pending

setTimeout(() => {
  resolve(1)
  console.log(promise) // fulfilled
}, 4000)

function num(a, b) {
  return a + b
}

export default num
