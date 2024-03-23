import { MercadoPagoConfig, Preference } from "mercadopago";

// Configura las credenciales de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-5505405215799840-031710-e8a57a0c465797dfb354fc344f5b8080-1732396978",
});

export const createPreference = async (req, res) => {
  const { cartItems } = req.body;
  const { nombre, valor, cantidad } = cartItems[0];

  try {
    if (!nombre || !valor || !cantidad) {
      res.status(400).json({ message: "Faltan datos para procesesar el pago" });
    }
    const body = {
      items: [
        {
          title: nombre,
          quantity: Number(valor),
          unit_price: Number(cantidad),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/feedback",
        failure: "http://localhost:3000/feedback",
        pending: "http://localhost:3000/feedback",
      },
      auto_return: "approved",
      notification_url: "https://833a-179-51-118-55.ngrok-free.app/webhooks",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });

    res.status(200).json({
      id: result.id,
      init_point: result.init_point,
      message: "Preferencia creada con éxito",
    });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const reciveWebhook = async (req, res) => {
  console.log(req.query);
  res.send("webhook");
};
