const activateAccount = (code) => {
  const activationUrl = `http://localhost:3001/activate-account?code=${code}`;
  console.log(process.env);
  return `
  <div style="background-color: #f4f3ee; height: 100vh">
  <div style="width: 100%; height: 6rem; background-color: #F3D3C4"></div>
  <table
    style="
      width: 60%;
      height: 40rem;
      border-radius: 8px;
      background-color: white;
      text-align: center;
      position: absolute;
      top: 2rem;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 1rem;
      padding-top: 1rem;
    "
  >
    <tbody>
      <tr>
        <td>
          <h1 style="margin: 0px">¡Bienvenido!</h1>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Estamos emocionados de que empieces. Primero, debes confirmar tu
            cuenta. Simplemente presione el botón de abajo.
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <a
            href="${activationUrl}"
            style="
              background-color: #463233;
              border-radius: 8px;
              padding: 15px;
              color: white;
              text-decoration: none;
            "
            target="_blank"
          >
            Confirmar cuenta
          </a>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si eso no funciona, copie y pegue el siguiente enlace en su
            navegador:
          </p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p
            style="
              text-decoration: underline #463233;
              color: #463233;
              margin: 0px;
              font-size: 18px;
            "
          >
          ${activationUrl}
          </p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si tiene alguna pregunta, solo responda a este correo
            electrónico; siempre estaremos encantados de ayudarle.
          </p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td style="vertical-align: bottom">
          <p style="margin: 0px; font-size: 18px">Atentamente:</p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">Be all</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
    `;
};

const recoverPassword = (code) => {
  return `
  <div style="background-color: #f4f3ee; height: 100vh">
  <div style="width: 100%; height: 6rem; background-color: #F3D3C4"></div>
  <table
    style="
      width: 60%;
      height: 40rem;
      border-radius: 8px;
      background-color: white;
      text-align: center;
      position: absolute;
      top: 2rem;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      padding-left: 2rem;
      padding-right: 2rem;
      padding-bottom: 1rem;
      padding-top: 1rem;
    "
  >
    <tbody>
      <tr>
        <td>
          <h1 style="margin: 0px">¿Olvidaste tu contraseña?</h1>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">
            ¡Esta bien, suele pasar! Este es tu código pin para resetear tu
            contraseña, ingresalo junto con tu nueva contraseña.
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-weight: bold">${code}</p>
        </td>
      </tr>

      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si tiene alguna pregunta, solo responda a este correo
            electrónico; siempre estaremos encantados de ayudarle.
          </p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td style="vertical-align: bottom">
          <p style="margin: 0px; font-size: 18px">Atentamente:</p>
        </td>
      </tr>
      <tr style="text-align: justify">
        <td>
          <p style="margin: 0px; font-size: 18px">Be all</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;
};

module.exports = { activateAccount, recoverPassword };
