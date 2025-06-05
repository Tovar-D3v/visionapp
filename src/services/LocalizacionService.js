import config from "../config/config";
import { formatearFechaBd } from "../utils/formatearFechaBd";


export async function enviarLocalizacion({ latitude, longitude, altitude }, visitaId) {
  const fechaMySQL = formatearFechaBd();
  const payload = {
    latitud: latitude,
    longitud: longitude,
    altitud: altitude ?? 0,
    fecha: fechaMySQL,
    visita: { id: visitaId },
  };

  try {
    const response = await fetch(`${config.API_VISITAS}/registro-localizacion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.log("error:", response.status, await response.text());
    } else {
      console.log("error", payload);
    }
  } catch (error) {
    console.log("error", error);
  }
}
