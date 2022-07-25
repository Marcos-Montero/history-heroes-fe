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
  b: a.b,
  c: { d: { e: 6 }, he: a.c.he },
}

console.log(x)
