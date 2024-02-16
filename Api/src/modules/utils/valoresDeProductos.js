
const calcularTotal = (productos) => {
    let total = 0;
    for (const producto of productos) {
      total += parseFloat(producto.valor) * producto.cantidad;
    }
    return total;
};

 const calcularCantidad = (productos) => {
    let cantidadTotal = 0;
    for (const producto of productos) {
      cantidadTotal += producto.cantidad;
    }
    return cantidadTotal;
};

const subTotal = (productos) =>{
  let subTotalValue = 0
  for(const producto of productos){
    subTotalValue += parseFloat(producto.valor)
  }
  return subTotalValue
}

module.exports = {
  calcularCantidad, 
  calcularTotal,
  subTotal
}