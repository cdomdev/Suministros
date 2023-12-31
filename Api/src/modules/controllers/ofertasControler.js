// controladores para las ofertas
const moment = require("moment");
const { Productos, Ofertas, Inventario } = require("../models/inventaryModel");
const { formatAndValidateDate } = require("../utils/dateFormater");
// crear un oferta

const crearOfetas = async (req, res) => {
  // cuerpo de la oferta
  const { nombre, descuento, productos, fechaIni, fechaFin } = req.body;
  console.log(`datos desde el front : ${req.body}`);
  //  formetaer fechas dia-mes-anio
  const fechaInicio = moment(fechaIni, "DD-MM-YYYY").format("YYYY-MM-DD");
  const fechaFinal = moment(fechaFin, "DD-MM-YYYY").format("YYYY-MM-DD");

  //   crear la oferta
  try {
    const nuevaOferta = await Ofertas.create({
      nombre,
      descuento,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFinal,
    });

    // asociar los productos selcionados a la nueva oferta
    if (productos && productos.length > 0) {
      await nuevaOferta.addProductos(productos);
    }

    res
      .status(201)
      .json({ message: "Nueva oferta creado con exito", oferta: nuevaOferta });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al crear la oferta", error: error.message });
  }
};

// obtener datos necesarios para relacion entre productos y ofertas
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Productos.findAll({
      attributes: ["id", "title", "description"],
      include: [
        {
          model: Inventario,
          attributes: ["cantidad"],
        },
      ],
    });
    res
      .status(200)
      .json({ message: "Productos obtenidos con éxito", data: productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

const obtenerOfertasConProductos = async (req, res) => {
  try {
    const ofertas = await Ofertas.findAll({
      include: {
        model: Productos,
        through: "productos_ofertas",
      },
    });

    if (!ofertas) {
      return res.status(400).json({ message: "Oferta no encontrada" });
    }
    return res.status(200).json({ ofertas });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obetenr la oferta" });
  }
};

// elimar ofertas

const eliminarOferta = async (req, res) => {
  const { id } = req.body;
  console.log(`lo que llega desde el cleinte: ${req.body}`);
  try {
    const ofertaAElminar = await Ofertas.findByPk(id);

    if (!ofertaAElminar) {
      return res.status(400).json({ message: "Oferta no encontrada" });
    }
    await ofertaAElminar.destroy();
    return res.status(200).json({ message: "Ofertas elimindad exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al eliminar la oferta" });
  }
};

const actulizarOfertas = async (req, res) => {
  const { updatedValues, oferta_id } = req.body;
  const { nombre, descuento, fechaIni, fechaFin } = updatedValues;

  console.log(`cuerpo;: ${JSON.stringify(req.body)}`);

  // const fecha_inicio = formatAndValidateDate(fechaIni)
  // const fecha_fin = formatAndValidateDate(fechaFin)

  // console.log('fecha de inicio oferta ', fecha_inicio)
  // console.log('fehca de final de opferta ', fecha_fin)
  const fecha_inicio = fechaIni;
  const fecha_fin = fechaFin;
  try {
    const ofertaUpdate = await Ofertas.findOne({ where: oferta_id });
    if (ofertaUpdate) {
      await Ofertas.update(
        { nombre, descuento, fecha_inicio, fecha_fin },
        { where: { id: oferta_id } }
      );
      return res.status(200).json({
        message: "Oferta atualizada exitosamente.",
      });
    } else {
      return res.status(404).json({
        message: "No se encontró regitro de la oferta.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Hubo un error al actualizar la oferta.",
    });
  }
};

module.exports = {
  obtenerProductos,
  crearOfetas,
  obtenerOfertasConProductos,
  eliminarOferta,
  actulizarOfertas,
};
