import React, { useEffect, useState } from "react";
import "./EventRegistration.css";
import emailjs from "@emailjs/browser";

export default function EventRegistration({
  isOpen,
  onClose,
  data
}) {
  const equipos = [
    "ADES",
    "ALPHA",
    "LONCCOS RUNNING TEAM",
    "TAYGETOS",
    "RUNNATICOS",
    "ALTURA",
    "CRAZY RUNNING",
    "OPTICAS ZAVALA",
    "PSYCHO RUNNERS",
    "SAMURAI AQP",
    "ACADEMIA IPD",
    "FUERZA AEREA DEL PERU",
    "CIMA RUNNERS",
    "IMPERIO TRAIL RUNNING",
    "TEAM CLARO",
    "NG ATLETIC",
    "LA RESISTENCIA",
    "AFABP",
    "LIBRE"
  ];

  const [step, setStep] = useState(1);

  const [verificandoDni, setVerificandoDni] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    equipo: "",
    telefono: "",
    correo: "",
    fotoBienvenida: null,
    capturaPago: null
  });

  const [otroEquipo, setOtroEquipo] = useState("");

  const [archivos, setArchivos] = useState({
    fotoBienvenida: null,
    capturaPago: null
  });

  /*
   * ============================================
   * ACEPTACIONES
   * ============================================
   */

  const [aceptaciones, setAceptaciones] = useState({
    bases: false,
    deslinde: false,
    datos: false
  });


  /*
   * ============================================
   * RESET
   * ============================================
   */

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      setExito("");
      setVerificandoDni(false);
      setEnviando(false);
      

      setForm({
        dni: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        genero: "",
        equipo: "",
        telefono: "",
        correo: "",
        fotoBienvenida: null,
        capturaPago: null
      });

      setArchivos({
        fotoBienvenida: null,
        capturaPago: null
      });

      setAceptaciones({
        bases: false,
        deslinde: false,
        datos: false
      });

      setOtroEquipo("");
    }
  }, [isOpen]);


  /*
   * ============================================
   * SI EL MODAL ESTÁ CERRADO
   * ============================================
   */

  if (!isOpen || !data) {
    return null;
  }


  /*
   * ============================================
   * CAMBIAR INPUT
   * ============================================
   */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setError("");
  };


  /*
   * ============================================
   * NORMALIZAR DNI / CE
   * ============================================
   */

  const normalizarDocumento = (valor) => {
    return valor
      .toUpperCase()
      .trim()
      .replace(/\s+/g, "");
  };


  /*
   * ============================================
   * VALIDAR DNI / CE
   * ============================================
   */

  const documentoValido = (documento) => {

    if (!documento) {
      return false;
    }

    if (documento.length < 5) {
      return false;
    }

    if (documento.length > 20) {
      return false;
    }

    return /^[A-Z0-9-]+$/.test(documento);
  };


  /*
   * ============================================
   * PASO 1
   * VERIFICAR DNI
   * ============================================
   */

  const verificarDni = async () => {

    const dni = normalizarDocumento(form.dni);

    if (!documentoValido(dni)) {

      setError(
        "Ingresa un DNI o CE válido."
      );

      return;
    }

    setVerificandoDni(true);
    setError("");

    try {

      const response = await fetch(
        `${data.supabaseUrl}/rest/v1/rpc/verificar_dni_ce`,
        {
          method: "POST",

          headers: {
            apikey:
              data.supabasePublishableKey,

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            documento: dni
          })
        }
      );


      if (!response.ok) {

        const texto =
          await response.text();

        throw new Error(
          `No se pudo verificar el DNI o CE. ${texto}`
        );
      }


      const existe =
        await response.json();


      if (existe === true) {

        setError(
          "Este DNI o CE ya se encuentra inscrito. No es posible realizar una nueva inscripción."
        );

        return;
      }


      setForm((prev) => ({
        ...prev,
        dni
      }));

      setStep(2);

    } catch (err) {

      console.error(
        "ERROR VERIFICANDO DNI:",
        err
      );

      setError(
        err?.message ||
        "No se pudo verificar el DNI o CE."
      );

    } finally {

      setVerificandoDni(false);

    }
  };


  /*
   * ============================================
   * VALIDAR PASO 2
   * ============================================
   */

  const continuarPaso2 = () => {

    if (!form.nombres.trim()) {

      setError(
        "Ingresa tus nombres."
      );

      return;
    }


    if (!form.apellidos.trim()) {

      setError(
        "Ingresa tus apellidos."
      );

      return;
    }


    if (!form.fechaNacimiento) {

      setError(
        "Selecciona tu fecha de nacimiento."
      );

      return;
    }


    if (!form.genero) {

      setError(
        "Selecciona tu género."
      );

      return;
    }


    if (!form.equipo.trim()) {

      setError(
        "Selecciona tu equipo"
      );

      return;
    }

    if (form.equipo === "OTRO" && !otroEquipo.trim()) {
      setError("Debes ingresar el nombre de tu equipo.");
      return;
    }


    if (!form.telefono.trim()) {

      setError(
        "Ingresa tu teléfono."
      );

      return;
    }


    if (!form.correo.trim()) {

      setError(
        "Ingresa tu correo electrónico."
      );

      return;
    }


    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.correo
      )
    ) {

      setError(
        "Ingresa un correo electrónico válido."
      );

      return;
    }


    setError("");
    setStep(3);
  };


  /*
   * ============================================
   * CONVERTIR IMAGEN A BASE64
   * ============================================
   */

  const convertirImagen = (
    file,
    maxWidth = 1600,
    quality = 0.8
  ) => {

    return new Promise((resolve, reject) => {

      const reader =
        new FileReader();


      reader.onload = () => {

        const img =
          new Image();


        img.onload = () => {

          let width =
            img.width;

          let height =
            img.height;


          if (width > maxWidth) {

            const ratio =
              maxWidth / width;

            width =
              maxWidth;

            height =
              height * ratio;
          }


          const canvas =
            document.createElement(
              "canvas"
            );


          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );


          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );


          resolve(
            canvas.toDataURL(
              "image/jpeg",
              quality
            )
          );
        };


        img.onerror = () => {

          reject(
            new Error(
              "No se pudo procesar la imagen."
            )
          );

        };


        img.src =
          reader.result;
      };


      reader.onerror = () => {

        reject(
          new Error(
            "No se pudo leer la imagen."
          )
        );

      };


      reader.readAsDataURL(file);

    });
  };


  /*
   * ============================================
   * CAMBIAR ARCHIVO
   * ============================================
   */

  const handleFileChange = async (
    e,
    tipo
  ) => {

    const file =
      e.target.files?.[0];


    if (!file) {
      return;
    }


    if (!file.type.startsWith("image/")) {

      setError(
        "Solo puedes subir imágenes."
      );

      return;
    }


    if (file.size > 15 * 1024 * 1024) {

      setError(
        "La imagen no debe superar los 15 MB."
      );

      return;
    }


    try {

      setError("");


      const base64 =
        await convertirImagen(file);


      setArchivos((prev) => ({
        ...prev,

        [tipo]: {
          base64,
          nombre:
            file.name
        }
      }));


      setForm((prev) => ({
        ...prev,

        [tipo]:
          file.name
      }));

    } catch (err) {

      console.error(
        err
      );

      setError(
        err?.message ||
        "No se pudo procesar la imagen."
      );

    }
  };


  /*
   * ============================================
   * PASO 3
   * ============================================
   */

  const continuarPaso3 = () => {

    if (!archivos.capturaPago) {

      setError(
        "Debes subir la captura de pago."
      );

      return;
    }


    setError("");
    setStep(4);
  };


  /*
   * ============================================
   * PASO 4
   * ============================================
   */

  const handleAceptacion = (campo) => {

    setAceptaciones((prev) => ({
      ...prev,

      [campo]:
        !prev[campo]
    }));

    setError("");
  };


  const continuarPaso4 = () => {

    if (!aceptaciones.bases) {

      setError(
        "Debes aceptar las bases generales."
      );

      return;
    }


    if (!aceptaciones.deslinde) {

      setError(
        "Debes aceptar el Deslinde de Responsabilidad."
      );

      return;
    }


    if (!aceptaciones.datos) {

      setError(
        "Debes confirmar que los datos proporcionados son correctos."
      );

      return;
    }


    setError("");
    setStep(5);
  };


  /*
   * ============================================
   * VOLVER
   * ============================================
   */

  const volver = () => {

    setError("");

    if (step > 1) {
      setStep(step - 1);
    }

  };


  /*
   * ============================================
   * ENVIAR INSCRIPCIÓN
   * ============================================
   */

  const enviarInscripcion = async () => {

    setEnviando(true);
    setError("");

    try {

      const payload = {

        dni:
          form.dni,

        nombres:
          form.nombres.trim(),

        apellidos:
          form.apellidos.trim(),

        telefono:
          form.telefono.trim(),

        correo:
          form.correo.trim(),

        genero:
          form.genero,

        equipo:
          form.equipo === "OTRO"
            ? otroEquipo.trim()
            : form.equipo,

        fechaNacimiento:
          form.fechaNacimiento,


        capturaPagoBase64:
          archivos.capturaPago.base64,

        capturaPagoNombre:
          archivos.capturaPago.nombre,


        fotoBienvenidaBase64:
          archivos.fotoBienvenida
            ? archivos.fotoBienvenida.base64
            : null,

        fotoBienvenidaNombre:
          archivos.fotoBienvenida
            ? archivos.fotoBienvenida.nombre
            : null

      };


    /*
    * ==========================================
    * GOOGLE APPS SCRIPT
    * ==========================================
    */
    try {
      await fetch(data.googleAppsScriptUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        redirect: "follow"
      });
    } catch (error) {
      console.warn(
        "El navegador no pudo leer la respuesta de Apps Script:",
        error
      );
    }

    // ================================
    // ENVÍO DE CORREO DE CONFIRMACIÓN
    // ================================

    try {
      const emailParams = {
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        dni: form.dni,
        telefono: form.telefono.trim(),
        fechaNacimiento: form.fechaNacimiento,
        correo: form.correo.trim(),
        genero: form.genero,
        equipo:
          form.equipo === "OTRO"
            ? otroEquipo.trim()
            : form.equipo
      };

      await emailjs.send(
        data.emailServiceId,
        data.emailTemplateId,
        emailParams,
        data.emailPublicKey
      );

      console.log("Correo de confirmación enviado correctamente.");
    } catch (error) {
      console.error("Error enviando correo de confirmación:", error);
    }

    // ================================
    // MOSTRAR ÉXITO
    // ================================

    setExito(
      `¡Gracias por tu inscripción! Tu inscripción fue registrada correctamente. Se enviará un correo de confirmación a ${form.correo}.`
    );

    setStep(6);

    } catch (err) {

      console.error(
        "ERROR INSCRIPCIÓN:",
        err
      );

      setError(
        err?.message ||
        "Ocurrió un error al procesar tu inscripción."
      );

    } finally {

      setEnviando(false);

    }
  };


  /*
   * ============================================
   * CERRAR MODAL
   * ============================================
   */

  const cerrarModal = () => {

    if (enviando) {
      return;
    }

    onClose();

  };


  /*
   * ============================================
   * RENDER
   * ============================================
   */

  return (

    <div
      className="registration-overlay"

      onMouseDown={(e) => {

        if (
          e.target === e.currentTarget &&
          !enviando
        ) {

          cerrarModal();

        }

      }}
    >

      <div className="registration-modal">


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="registration-header">

          <div>

            <span className="registration-step-label">

              {step <= 5
                ? `PASO ${step} DE 5`
                : "INSCRIPCIÓN COMPLETADA"}

            </span>


            <h2>
              {data.titulo}
            </h2>

          </div>


          {!enviando && (

            <button
              type="button"

              className="registration-close"

              onClick={cerrarModal}
            >
              ×
            </button>

          )}

        </div>


        {/* =====================================
            BARRA DE PROGRESO
        ====================================== */}

        {step <= 5 && (

          <div className="registration-progress">

            <div
              className="registration-progress-bar"

              style={{
                width:
                  `${(step / 5) * 100}%`
              }}
            />

          </div>

        )}


        {/* =====================================
            ERROR
        ====================================== */}

        {error && (

          <div className="registration-error">

            {error}

          </div>

        )}


        {/* =====================================
            PASO 1
        ====================================== */}

        {step === 1 && (

          <div className="registration-step">

            <div className="registration-step-icon">
              1
            </div>


            <h3>
              Verifica tu documento
            </h3>


            <p>
              Ingresa tu DNI o CE para comprobar
              que no tengas una inscripción previa.
            </p>


            <label>
              DNI / CE
            </label>


            <input
              type="text"

              name="dni"

              value={form.dni}

              onChange={handleChange}

              placeholder="DNI o CE"

              autoComplete="off"

              maxLength={20}

              disabled={verificandoDni}
            />


            <button
              type="button"

              className="registration-primary-button"

              onClick={verificarDni}

              disabled={verificandoDni}
            >

              {verificandoDni
                ? "VERIFICANDO..."
                : "CONTINUAR"}

            </button>

          </div>

        )}


        {/* =====================================
            PASO 2
        ====================================== */}

        {step === 2 && (

          <div className="registration-step">

            <h3>
              Datos del participante
            </h3>


            <p className="registration-info">

              La categoría se asignará según la
              edad del participante y las bases
              generales del evento.

            </p>


            <div className="registration-grid">


              <div className="registration-field">

                <label>
                  Nombres
                </label>

                <input
                  type="text"

                  name="nombres"

                  value={form.nombres}

                  onChange={handleChange}

                  placeholder="Nombres"
                />

              </div>


              <div className="registration-field">

                <label>
                  Apellidos
                </label>

                <input
                  type="text"

                  name="apellidos"

                  value={form.apellidos}

                  onChange={handleChange}

                  placeholder="Apellidos"
                />

              </div>


              <div className="registration-field">

                <label>
                  Fecha de nacimiento
                </label>

                <input
                  type="date"

                  name="fechaNacimiento"

                  value={form.fechaNacimiento}

                  onChange={handleChange}
                />

              </div>


              <div className="registration-field">

                <label>
                  Género
                </label>

                <select
                  name="genero"

                  value={form.genero}

                  onChange={handleChange}
                >

                  <option value="">
                    Selecciona
                  </option>

                  <option value="Damas">
                    Damas
                  </option>

                  <option value="Varones">
                    Varones
                  </option>

                </select>

              </div>


              <div className="registration-field">

                <label htmlFor="equipo">
                  Equipo
                </label>

                <select
                  id="equipo"
                  value={form.equipo}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      equipo: e.target.value
                    }));

                    setError("");
                  }}
                  required
                >

                  <option value="">
                    Selecciona tu equipo
                  </option>

                  {equipos.map((equipo) => (
                    <option
                      key={equipo}
                      value={equipo}
                    >
                      {equipo}
                    </option>
                  ))}

                  <option value="OTRO">
                    Otro equipo
                  </option>

                </select>

                {form.equipo === "OTRO" && (
                  <input
                    type="text"
                    placeholder="Escribe el nombre de tu equipo"
                    value={otroEquipo}
                    onChange={(e) => {
                      setOtroEquipo(e.target.value);
                      setError("");
                    }}
                    required
                  />
                )}

              </div>


              <div className="registration-field">

                <label>
                  Teléfono
                </label>

                <input
                  type="tel"

                  name="telefono"

                  value={form.telefono}

                  onChange={handleChange}

                  placeholder="Teléfono"
                />

              </div>


              <div className="registration-field registration-field-full">

                <label>
                  Correo electrónico
                </label>

                <input
                  type="email"

                  name="correo"

                  value={form.correo}

                  onChange={handleChange}

                  placeholder="correo@ejemplo.com"
                />

              </div>

            </div>


            <div className="registration-actions">

              <button
                type="button"

                className="registration-secondary-button"

                onClick={volver}
              >
                ATRÁS
              </button>


              <button
                type="button"

                className="registration-primary-button"

                onClick={continuarPaso2}
              >
                CONTINUAR
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PASO 3
        ====================================== */}

        {step === 3 && (

          <div className="registration-step">

            <h3>
              Pago y fotografía
            </h3>


            <div className="registration-payment">

              <span>
                REALIZA TU PAGO VÍA YAPE
              </span>


              <strong>
                {data.numeroYape}
              </strong>


              <small>
                {data.nombreYape}
              </small>

            </div>


            <div className="registration-upload">

              <label>
                Captura de pago *
              </label>


              <input
                type="file"

                accept="image/*"

                onChange={(e) =>
                  handleFileChange(
                    e,
                    "capturaPago"
                  )
                }
              />


              {archivos.capturaPago && (

                <span className="file-success">

                  ✓ {archivos.capturaPago.nombre}

                </span>

              )}

            </div>


            <div className="registration-upload">

              <label>

                Foto para bienvenida

                <span>
                  (Opcional)
                </span>

              </label>


              <input
                type="file"

                accept="image/*"

                onChange={(e) =>
                  handleFileChange(
                    e,
                    "fotoBienvenida"
                  )
                }
              />


              {archivos.fotoBienvenida && (

                <span className="file-success">

                  ✓ {archivos.fotoBienvenida.nombre}

                </span>

              )}

            </div>


            <div className="registration-actions">

              <button
                type="button"

                className="registration-secondary-button"

                onClick={volver}
              >
                ATRÁS
              </button>


              <button
                type="button"

                className="registration-primary-button"

                onClick={continuarPaso3}
              >
                CONTINUAR
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PASO 4
        ====================================== */}

        {step === 4 && (

          <div className="registration-step">

            <h3>
              Aceptaciones
            </h3>


            <p>
              Para continuar debes aceptar
              todos los puntos.
            </p>


            <div className="registration-check">

              <input
                type="checkbox"

                id="bases"

                checked={
                  aceptaciones.bases
                }

                onChange={() =>
                  handleAceptacion(
                    "bases"
                  )
                }
              />


              <label htmlFor="bases">

                He leído y acepto las bases
                generales del evento.

              </label>

            </div>


            <div className="registration-check">

              <input
                type="checkbox"

                id="deslinde"

                checked={
                  aceptaciones.deslinde
                }

                onChange={() =>
                  handleAceptacion(
                    "deslinde"
                  )
                }
              />


              <label htmlFor="deslinde">

                He leído y acepto el Deslinde
                de Responsabilidad.

              </label>

            </div>


            <div className="registration-check">

              <input
                type="checkbox"

                id="datos"

                checked={
                  aceptaciones.datos
                }

                onChange={() =>
                  handleAceptacion(
                    "datos"
                  )
                }
              />


              <label htmlFor="datos">

                Acepto que los datos
                proporcionados son correctos.

              </label>

            </div>


            <div className="registration-actions">

              <button
                type="button"

                className="registration-secondary-button"

                onClick={volver}
              >
                ATRÁS
              </button>


              <button
                type="button"

                className="registration-primary-button"

                onClick={continuarPaso4}
              >
                CONTINUAR
              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PASO 5
        ====================================== */}

        {step === 5 && (

          <div className="registration-step">

            <h3>
              Resumen de inscripción
            </h3>


            <p>
              Revisa cuidadosamente tus datos
              antes de confirmar.
            </p>


            <div className="registration-summary">


              <div>

                <span>
                  DNI / CE
                </span>

                <strong>
                  {form.dni}
                </strong>

              </div>


              <div>

                <span>
                  Nombres
                </span>

                <strong>
                  {form.nombres}
                </strong>

              </div>


              <div>

                <span>
                  Apellidos
                </span>

                <strong>
                  {form.apellidos}
                </strong>

              </div>


              <div>

                <span>
                  Fecha de nacimiento
                </span>

                <strong>
                  {form.fechaNacimiento}
                </strong>

              </div>


              <div>

                <span>
                  Género
                </span>

                <strong>
                  {form.genero}
                </strong>

              </div>


              <div>

                <span>
                  Equipo
                </span>

                <strong>
                  {form.equipo === "OTRO"
                    ? otroEquipo
                    : form.equipo}
                </strong>

              </div>


              <div>

                <span>
                  Teléfono
                </span>

                <strong>
                  {form.telefono}
                </strong>

              </div>


              <div>

                <span>
                  Correo
                </span>

                <strong>
                  {form.correo}
                </strong>

              </div>


              <div>

                <span>
                  Captura de pago
                </span>

                <strong className="summary-ok">
                  ✓ Adjuntada
                </strong>

              </div>


              <div>

                <span>
                  Foto bienvenida
                </span>

                <strong>

                  {archivos.fotoBienvenida
                    ? "✓ Adjuntada"
                    : "No adjuntada"}

                </strong>

              </div>

            </div>


            <div className="registration-actions">

              <button
                type="button"

                className="registration-secondary-button"

                onClick={volver}
              >
                MODIFICAR
              </button>


              <button
                type="button"

                className="registration-primary-button"

                onClick={enviarInscripcion}

                disabled={enviando}
              >

                {enviando
                  ? "PROCESANDO..."
                  : "INSCRIBIRME"}

              </button>

            </div>

          </div>

        )}


        {/* =====================================
            PASO 6 - ÉXITO
        ====================================== */}

        {step === 6 && (

          <div className="registration-success">

            <div className="success-icon">
              ✓
            </div>


            <h3>
              ¡Gracias por tu inscripción!
            </h3>


            <p>
              Tu inscripción fue registrada
              correctamente.
            </p>


            <p>
              Se enviará un correo de confirmación
              a:
            </p>


            <strong>
              {form.correo}
            </strong>


            <button
              type="button"

              className="registration-primary-button"

              onClick={onClose}
            >
              CERRAR
            </button>

          </div>

        )}

      </div>

    </div>
  );
}