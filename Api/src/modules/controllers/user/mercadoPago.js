import   { MercadoPagoConfig, Preference } from "mercadopago";

// Configura las credenciales de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: "TEST-5505405215799840-031710-e8a57a0c465797dfb354fc344f5b8080-1732396978",
});

// Crea una instancia de Preference
const preference = new Preference(client);

export const createOrder = (req, res) => {
  const { title, quantity, unit_price } = req.body;

  // Verifica que los datos requeridos estén presentes en la solicitud
  if (!title || !quantity || !unit_price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Crea la preferencia usando los datos recibidos en la solicitud
  preference
    .create({
      body: {
        items: [
          {
            title: title,
            quantity: Number(quantity),
            unit_price: Number(unit_price),
          },
        ],
      },
    })
    .then((response) => {
      // Envía la respuesta al cliente con la preferencia creada
      res.json(response);
    })
    .catch((error) => {
      // Envía una respuesta de error al cliente si ocurre un problema
      console.error("Error creating preference:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

// module.exports = {
//   createOrder,
// };
