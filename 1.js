const a = {
  b: '3',
  c: {
    d: {
      e: 5,
    },
    he: 'hoy',
  },
}

const x = {
  ...a,
  c: { d: { e: 6 }, ...a.c },
}

console.log(x)
