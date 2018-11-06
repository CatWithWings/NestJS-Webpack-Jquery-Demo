const strategy = {
  discount30: (price) => {
    console.log(price)
    const data = Number(price);
    return (data - data * 0.7).toFixed(2)
  },

  discount50: (price) => {
    const data = Number(price);
    return (data - data * 0.5).toFixed(2)
  },

  discount70: (price) => {
    const data = Number(price);
    return (data - data * 0.3).toFixed(2)
  }
}

class DiscountFactory {
  exec(discount, price) {
    return strategy[discount] && strategy[discount](price);
  }
}

export { DiscountFactory };
