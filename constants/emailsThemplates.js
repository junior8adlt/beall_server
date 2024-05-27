const handleShippingUrl = (shippingProvider) => {
  switch (shippingProvider) {
    case 'estafeta':
      return `https://www.estafeta.com/Herramientas/Rastreo`;
    case 'fedex':
      return `https://www.fedex.com/es-mx/tracking.html`;
    case 'dhl':
      return `https://www.dhl.com/mx-es/home/rastreo.html`;
  }
};

const activateAccount = (code) => {
  const activationUrl = `https://www.beallfam.com/activar-cuenta?code=${code}`;
  return `
  <div style="background-color: #f4f3ee; height: 100vh">
  <div style="width: 100%; height: 6rem; background-color: #f3d3c4"></div>
  <table
    style="
      width: 100%;
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
      padding: 2rem;
    "
  >
    <tbody>
      <tr>
        <td>
          <h1 style="margin: 0px">¡Bienvenido!</h1>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Estamos emocionados de que empieces. Primero, debes confirmar tu cuenta. Simplemente
            presione el botón de abajo.
          </p>
        </td>
      </tr>
      <tr style="height: 100px">
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
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si eso no funciona, copie y pegue el siguiente enlace en su navegador:
          </p>
        </td>
      </tr>
      <tr style="text-align: center">
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
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si tiene alguna pregunta, escribenos al siguiente correo electrónico: 
            <a href='mailto:contacto@beallfam.com'>
            contacto@beallfam.com
            </a>
            siempre estaremos encantados de ayudarle.
          </p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td style="vertical-align: bottom">
          <p style="margin: 0px; font-size: 18px">Atentamente:</p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">Be All Familiologos</p>
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
      width: 100%;
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
      padding: 2rem;
    "
  >
    <tbody>
      <tr>
        <td>
          <h1 style="margin: 0px">¿Olvidaste tu contraseña?</h1>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            ¡Esta bien, suele pasar! Este es tu código pin para resetear tu
            contraseña, ingresalo junto con tu nueva contraseña.
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-weight: bold; font-size: 18px;">${code}</p>
        </td>
      </tr>

      <tr style="text-align: center">
        <td>
        <p style="margin: 0px; font-size: 18px">
        Si tiene alguna pregunta, escribenos al siguiente correo electrónico: 
        <a href='mailto:contacto@beallfam.com'>
        contacto@beallfam.com
        </a>
        siempre estaremos encantados de ayudarle.
      </p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td style="vertical-align: bottom">
          <p style="margin: 0px; font-size: 18px">Atentamente:</p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">Be All Familiologos</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  `;
};

const buyCourse = (courseName) => {
  return `
  <div style="background-color: #f4f3ee; height: 100vh">
      <div style="width: 100%; height: 6rem; background-color: #f3d3c4"></div>
      <table
        style="
          width: 100%;
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
          padding: 2rem;
        "
      >
        <tbody>
          <tr>
            <td>
              <h1 style="margin: 0px">¡Grandioso!</h1>
            </td>
          </tr>
          <tr style="text-align: center">
            <td>
              <p style="margin: 0px; font-size: 18px">
                Alguien acaba de comprar el curso <strong>${courseName}</strong>.
              </p>
            </td>
          </tr>
          <tr style="text-align: center">
            <td style="vertical-align: bottom">
              <p style="margin: 0px; font-size: 18px">Atentamente:</p>
            </td>
          </tr>
          <tr style="text-align: center">
            <td>
              <p style="margin: 0px; font-size: 18px">Be All Familiologos</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

const senReceip = (
  order,
  firstName,
  lastName,
  shippingPrice,
  totalOfProducts,
  totalQuantityOfProducts,
) => {
  return `
  <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
  <tbody>
    <tr>
      <td align="center">
        <div align="center">
          <table
            width="600"
            class="m_-6003843106306148780container"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
            style="font-family: Helvetica, Arial, sans-serif"
          >
            <tbody>
              <tr>
                <td
                  background="https://ci3.googleusercontent.com/meips/ADKq_NY1A8lN_z8R0qllIAm7zouBNq7RbpPp_PS-IAquxoRM_2uJU_QhBZvl2bqfWCbkfV5_08jUNUKF8gREXC9RV2NmshUL93Fb_mpZtl880vncKvxMqurqSRID9c3kMKGRsJaKg9X1FEwgag7FziAWSUd5GBRO8j6I0bVXBL_H=s0-d-e1-ft#http://image.emails.underarmour.com/lib/fe8213727c640d747c/m/8/f00ae7a9-fac3-4d28-be3d-d37b302b7a94.png"
                  bgcolor="#1d1d1d"
                  width="600"
                  height="600"
                  valign="top"
                  class="m_-6003843106306148780mobile-hidden"
                  align="center"
                >
                  <div>
                    <table
                      width="100%"
                      class="m_-6003843106306148780container"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tbody>
                        <tr>
                          <td style="padding-top: 85px; padding-bottom: 27px" align="center">
                            <a
                              href="https://www.beallfam.com/"
                              target="_blank"
                              data-saferedirecturl="https://www.beallfam.com/"
                              ><img
                                src="https://ik.imagekit.io/kmujnmitqkk/logo_blanco_URQiBnmP9.png?updatedAt=1703657230104"
                                alt="Be All Logo"
                                border="0"
                                style="display: block; height: auto"
                                width="200"
                                class="CToWUd"
                                data-bit="iit"
                            /></a>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-family: Arial, Helvetica, sans-serif;
                              font-size: 15px;
                              font-weight: normal;
                              font-style: normal;
                              font-stretch: normal;
                              letter-spacing: 1.9px;
                              text-align: center;
                              color: #ffffff;
                              padding-bottom: 35px;
                              padding-top: 13px;
                              text-decoration: none;
                            "
                            align="center"
                          >
                            RECIBO DEL PEDIDO
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-family:  Arial, Helvetica, sans-serif;
                              font-size: 41px;
                              font-weight: 700;
                              font-style: normal;
                              font-stretch: normal;
                              line-height: 100%;
                              letter-spacing: 0px;
                              text-align: center;
                              text-transform: uppercase;
                              color: #ffffff;
                              padding-bottom: 35px;
                            "
                            align="center"
                          >
                            GRACIAS, <br />${firstName}!
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-family: Arial, Helvetica, sans-serif;
                              font-size: 15px;
                              font-weight: normal;
                              font-style: normal;
                              font-stretch: normal;
                              line-height: 147%;
                              letter-spacing: normal;
                              text-align: center;
                              color: #ffffff;
                              padding: 0px 136px 39px 136px;
                            "
                            align="center"
                          >
                            Hemos recibido tu pedido # ${order.orderNumber}. Te enviaremos tu nuevos
                            productos muy pronto. Recibirás una actualización en cuanto esté en
                            camino.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="m_-6003843106306148780mobile-only m_-6003843106306148780pad10">
                  <div
                    class="m_-6003843106306148780mobile-only"
                    style="font-size: 0; max-height: 0; overflow: hidden; display: none"
                  >
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tbody>
                        <tr>
                          <td
                            height="446"
                            style="
                              background-image: url('https://ci3.googleusercontent.com/meips/ADKq_Na9gzin05NtbF1B3KVak8wyxxKJLP4ORivYApnynXvAfjs7awnpk1_u9--P8z3Vtm5Xhv1Qqr_OE-y_bjAjD_HX6ibnLBZtOxAjTwieKRX_ZfecTkC4hztKXDFHZ6Vp6p9MR2B-ALR189uuJ54L-0VePPQFTo334M-yauSe=s0-d-e1-ft#http://image.emails.underarmour.com/lib/fe8213727c640d747c/m/8/bbc24871-26c7-4f86-bc58-617481800090.png');
                              background-repeat: no-repeat;
                              background-position: top center;
                              background-size: cover;
                            "
                            bgcolor="#1d1d1d"
                            valign="top"
                            class="m_-6003843106306148780mobile-only"
                          >
                            <div
                              class="m_-6003843106306148780mobile-only"
                              style="
                                font-size: 0;
                                max-height: 0;
                                overflow: hidden;
                                display: none;
                              "
                            >
                              <table
                                width="100%"
                                class="m_-6003843106306148780container"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding-top: 53px; padding-bottom: 22px"
                                      align="center"
                                    >
                                    <a
                                    href="https://www.beallfam.com/"
                                    target="_blank"
                                    data-saferedirecturl="https://www.beallfam.com/"
                                    ><img
                                      src="https://ik.imagekit.io/kmujnmitqkk/logo_blanco_URQiBnmP9.png?updatedAt=1703657230104"
                                      alt="Be All Logo"
                                      border="0"
                                      style="display: block; height: auto"
                                      width="56"
                                      class="CToWUd"
                                      data-bit="iit"
                                  /></a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style="
                                        font-family:  Arial, Helvetica,
                                          sans-serif;
                                        font-size: 13px;
                                        font-weight: normal;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: 1.23;
                                        letter-spacing: 1.9px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding-bottom: 22px;
                                      "
                                      align="center"
                                    >
                                      RECIBO DEL PEDIDO
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style="
                                        font-family: 'underarmour', Arial, Helvetica, sans-serif;
                                        font-size: 30px;
                                        font-weight: bold;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: 1;
                                        letter-spacing: -0.9px;
                                        text-align: center;
                                        color: #ffffff;
                                        padding-left: 30px;
                                        padding-right: 30px;
                                        padding-bottom: 12px;
                                      "
                                      align="center"
                                    >
                                      GRACIAS, <br />${firstName}!
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      style="
                                        font-family: Arial, Helvetica, sans-serif;
                                        font-size: 13px;
                                        font-weight: normal;
                                        font-style: normal;
                                        font-stretch: normal;
                                        line-height: 1.54;
                                        letter-spacing: normal;
                                        text-align: center;
                                        color: #ffffff;
                                        padding-left: 40px;
                                        padding-right: 40px;
                                      "
                                      align="center"
                                    >
                                      Hemos recibido tu pedido # ${
                                        order.orderNumber
                                      }. Te enviaremos tu
                                      nuevos productos muy pronto. Recibirás una actualización
                                      en cuanto esté en camino.
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td bgcolor="#ffffff">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                      <tr>
                        <td bgcolor="#ffffff" style="font-size: 0%">
                          <img
                            src="https://ci3.googleusercontent.com/meips/ADKq_NaugAzlNuWgusG-AbwDKzVZ435SQkfHcrVAbH_WVExPCPRaQpYL_fcbv2BpHiK7YaBYRRp03FQwej5nmLWo3otolIC6kdTTR8JVGg6A3I4H40sxh8eUyA1deJEz6A03RpGinP13tCjOsaorJ2h4XTitHiJTpTLGTjk9bEBN=s0-d-e1-ft#http://image.emails.underarmour.com/lib/fe8213727c640d747c/m/8/9e3998d3-8479-4f18-abcd-d96879374313.gif"
                            alt=""
                            width="1"
                            height="30"
                            style="display: block"
                            border="0"
                            class="CToWUd"
                            data-bit="iit"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  align="left"
                  style="border: 9px solid #f2f2f2"
                  class="m_-6003843106306148780noBorder"
                >
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    class="m_-6003843106306148780container"
                  >
                    <tbody>
                    ${
                      order.shippingMethod === 'Digital'
                        ? `
                        <tr>
                    <td
                      align="left"
                      style="padding-top: 53px; padding-left: 46px"
                      class="m_-6003843106306148780padLeft33 m_-6003843106306148780padTop36"
                    >
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td
                              class="m_-6003843106306148780headlines"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                font-size: 18px;
                                font-weight: bold;
                                font-style: normal;
                                font-stretch: normal;
                                line-height: 122%;
                                letter-spacing: -0.2px;
                                text-align: left;
                                color: #1d1d1d;
                                padding-bottom: 15px;
                              "
                            >
                              Descarga tu producto desde tus ordenes en la plataforma
                            </td>
                          </tr>
                        `
                        : `
                    <tr>
                    <td
                      align="left"
                      style="padding-top: 53px; padding-left: 46px"
                      class="m_-6003843106306148780padLeft33 m_-6003843106306148780padTop36"
                    >
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                          <tr>
                            <td
                              class="m_-6003843106306148780headlines"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                font-size: 18px;
                                font-weight: bold;
                                font-style: normal;
                                font-stretch: normal;
                                line-height: 122%;
                                letter-spacing: -0.2px;
                                text-align: left;
                                color: #1d1d1d;
                                padding-bottom: 15px;
                              "
                            >
                              Enviar a:
                            </td>
                          </tr>
                          <tr>
                            <td
                              class="m_-6003843106306148780addressText m_-6003843106306148780noBotPad"
                              style="
                                font-family: Arial, Helvetica, sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                font-style: normal;
                                font-stretch: normal;
                                line-height: 157%;
                                letter-spacing: 0.2px;
                                text-align: left;
                                color: #707070;
                                padding-bottom: 15px;
                              "
                            >
                              ${firstName} ${lastName}<br />${order.shippingAddress.street} ${
                            order.shippingAddress.number
                          }${order.shippingAddress.interior ?? ''} ${
                            order.shippingAddress.references ?? ''
                          }<br />${order.shippingAddress.colony}<br />${
                            order.shippingAddress.city
                          }, ${order.shippingAddress.state} ${order.shippingAddress.zipCode} México
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                    `
                    }
                     

                      <tr>
                        <td
                          class="m_-6003843106306148780padLeft33 m_-6003843106306148780headlines m_-6003843106306148780padBot32"
                          style="
                            font-family: Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            font-weight: bold;
                            font-style: normal;
                            font-stretch: normal;
                            letter-spacing: -0.2px;
                            text-align: left;
                            color: #1d1d1d;
                            padding-left: 46px;
                            padding-bottom: 37px;
                            padding-top: 34px;
                          "
                        >
                          <span class="m_-6003843106306148780appleLinksBlack">TU PEDIDO</span>
                        </td>
                      </tr>

                     ${order.products.map((product) => {
                       return `
                        <tr>
                        <td
                          class="m_-6003843106306148780padLeft33 m_-6003843106306148780padRight33 m_-6003843106306148780padBot24"
                          align="left"
                          style="padding-left: 46px; padding-bottom: 40px"
                        >
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                              <tr>
                                <td
                                  align="left"
                                  style="padding-right: 29px"
                                  class="m_-6003843106306148780padRight23"
                                >
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td align="left">
                                          <img
                                            class="m_-6003843106306148780prodImg CToWUd"
                                            src="${product.image}"
                                            width="140"
                                            style="display: block; height: auto"
                                            border="0"
                                            data-bit="iit"
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td align="left" valign="top">
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          class="m_-6003843106306148780productHeadlines"
                                          style="
                                            font-family: Arial, Helvetica, sans-serif;
                                            font-size: 15px;
                                            font-weight: bold;
                                            font-style: normal;
                                            font-stretch: normal;
                                            line-height: 120%;
                                            letter-spacing: -0.2px;
                                            text-align: left;
                                            color: #1d1d1d;
                                            padding-bottom: 7px;
                                          "
                                        >
                                          <span class="m_-6003843106306148780appleLinksBlack"
                                            >
                                            ${product.name}
                                            </span
                                          >
                                        </td>
                                      </tr>

                                      <tr>
                                        <td
                                          class="m_-6003843106306148780addressText"
                                          style="
                                            font-family: Arial, Helvetica, sans-serif;
                                            font-size: 14px;
                                            font-weight: normal;
                                            font-style: normal;
                                            font-stretch: normal;
                                            line-height: 157%;
                                            letter-spacing: 0.2px;
                                            text-align: left;
                                            color: #707070;
                                          "
                                        >
                                          $ ${product.price} x ${product.quantity}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                        `;
                     })}

                      <tr>
                        <td
                          align="left"
                          style="padding-top: 13px; border-top: 1px solid #e9e9e9"
                          bgcolor="#fcfcfc"
                          class="m_-6003843106306148780mobBotBorder"
                        >
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    width="100%"
                                    class="m_-6003843106306148780container"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          class="m_-6003843106306148780padLeft33 m_-6003843106306148780padTop36"
                                          style="padding-top: 29px; padding-left: 46px"
                                        >
                                          <table border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalText"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 179%;
                                                    letter-spacing: 0.2px;
                                                    text-align: left;
                                                    color: #707070;
                                                  "
                                                >
                                                  Subtotal (${totalOfProducts} item)
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalText"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 179%;
                                                    letter-spacing: 0.2px;
                                                    text-align: left;
                                                    color: #707070;
                                                  "
                                                >
                                                  Costo de envío
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalText"
                                                  valign="bottom"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 15px;
                                                    font-weight: bold;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 133%;
                                                    text-align: left;
                                                    color: #1d1d1d;
                                                    padding-top: 23px;
                                                    vertical-align: bottom;
                                                  "
                                                >
                                                  Total
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td
                                          align="right"
                                          style="padding-top: 29px; padding-right: 46px"
                                          class="m_-6003843106306148780padRight33 m_-6003843106306148780padTop36"
                                        >
                                          <table border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalText"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 179%;
                                                    letter-spacing: 0.2px;
                                                    text-align: right;
                                                    color: #707070;
                                                  "
                                                >
                                                  $ ${totalQuantityOfProducts}
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalText"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 14px;
                                                    font-weight: normal;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 179%;
                                                    letter-spacing: 0.2px;
                                                    text-align: right;
                                                    color: #707070;
                                                  "
                                                >
                                                  $ ${shippingPrice}
                                                </td>
                                              </tr>

                                              <tr>
                                                <td
                                                  class="m_-6003843106306148780totalPrice"
                                                  valign="bottom"
                                                  style="
                                                    font-family: Arial, Helvetica, sans-serif;
                                                    font-size: 18px;
                                                    font-weight: bold;
                                                    font-style: normal;
                                                    font-stretch: normal;
                                                    line-height: 133%;
                                                    text-align: right;
                                                    color: #1d1d1d;
                                                    padding-top: 23px;
                                                    vertical-align: bottom;
                                                  "
                                                >
                                                  $ ${order.totalOrderAmount}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  `;
};

const orderShipped = (trackingNumber, shippingProvider) => {
  return `
  <div style="background-color: #f4f3ee; height: 100vh">
  <div style="width: 100%; height: 6rem; background-color: #f3d3c4"></div>
  <table
    style="
      width: 100%;
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
      padding: 2rem;
    "
  >
    <tbody>
      <tr>
        <td>
          <h1 style="margin: 0px">¡Tú pedido va en camino!</h1>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Tu pedido ha sido enviado, tu número de guía es: <strong>${trackingNumber}</strong>, puedes
            rastrearlo en la página de la paquetería.
          </p>
        </td>
      </tr>
      <tr style="height: 100px">
        <td>
          <a
            href="${handleShippingUrl(shippingProvider)}"
            style="
              background-color: #463233;
              border-radius: 8px;
              padding: 15px;
              color: white;
              text-decoration: none;
            "
            target="_blank"
          >
            Rastrear pedido
          </a>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">
            Si tiene alguna pregunta, escribenos al siguiente correo electrónico:
            <a href="mailto:fam.be.all@gmail.com"> fam.be.all@gmail.com </a>
            siempre estaremos encantados de ayudarle.
          </p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td style="vertical-align: bottom">
          <p style="margin: 0px; font-size: 18px">Atentamente:</p>
        </td>
      </tr>
      <tr style="text-align: center">
        <td>
          <p style="margin: 0px; font-size: 18px">Be All Familiologos</p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
         `;
};

module.exports = { activateAccount, recoverPassword, buyCourse, senReceip, orderShipped };
