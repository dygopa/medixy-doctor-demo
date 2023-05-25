"use client";

import Link from "next/link";
import Button from "../core/BaseComponents/Button";

export default function PrivacyPolicyIndex() {
  return (
    <div className="w-full flex flex-col justify-between items-start h-screen bg-slate-100">
      <div className="w-full h-[10vh] bg-white border-b border-slate-200 flex justify-between items-center py-[0.8rem] px-[7%] sticky top-0 left-0">
        <img
          src="/images/logo.png"
          className="h-full object-contain w-40"
          alt="Register main"
        />
        <Button variant="primary">
          <Link href="/login" >Iniciar sesión</Link>
        </Button>
      </div>
      <div className="w-full px-[25%] h-full mx-auto py-[3rem]">

        <p className="c6"><span className="c4 c13">AVISO DE PRIVACIDAD</span></p>
        <hr/>
        <p className="c14"><span className="c4 c0"></span></p>
        <p className="c6"><span className="c5">Certus project management SA DE CV.</span><span className="c0">, mejor conocido
                como&nbsp;</span><span className="c5">Prosit tlalnepantla</span><span className="c4 c0">, con domicilio en Carr.
                M&eacute;xico-Toluca 5474, , Cuajimalpa de Morelos, 05320 Ciudad de M&eacute;xico, CDMX 05320., y portal de
                internet&nbsp;https://atomic-temporary-203126534.wpcomstaging.com/ es el responsable del uso y
                protecci&oacute;n de sus datos personales, y al respecto le informamos lo siguiente:</span></p>
        <p className="c6"><span className="c2">&iquest;Para qu&eacute; fines utilizaremos sus datos personales?</span></p>
        <p className="c6"><span className="c0">Los datos personales que recabamos de usted, los utilizaremos para las siguientes
                finalidades que son necesarias para el servicio que solicita: &bull; PARA VERIFICAR Y CONFIRMAR SU IDENTIDAD
                &bull;PARA COMPLETAR EXPEDIENTE PARA LA ESCRITURACI&Oacute;N DEL BIEN INMUEBLE &bull; NOTIFICACIONES De
                manera adicional, utilizaremos su informaci&oacute;n personal para las siguientes finalidades secundarias
                que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor
                atenci&oacute;n: &bull; Mercadotecnia o publicitaria &bull; Prospecci&oacute;n comercial En caso de que no
                desee que sus datos personales sean tratados para estos fines secundarios, desde este momento usted nos
                puede comunicar lo anterior a trav&eacute;s del siguiente mecanismo: A trav&eacute;s de </span><span
                className="c3 c0"><a className="c10"
                    href="https://www.google.com/url?q=https://atomic-temporary-203126534.wpcomstaging.com/%25C2%25A0o&amp;sa=D&amp;source=editors&amp;ust=1682881492904408&amp;usg=AOvVaw2T2CAmozgSxqXjH1mdWqhy">https://atomic-temporary-203126534.wpcomstaging.com/&nbsp;o</a></span><span
                className="c4 c0">&nbsp;por llamada telef&oacute;nica (56) 10572938 La negativa para el uso de sus datos
                personales para estas finalidades no podr&aacute; ser un motivo para que le neguemos los servicios y
                productos que solicita o contrata con nosotros.</span></p>
        <p className="c6"><span className="c2">&iquest;Qu&eacute; datos personales utilizaremos para estos fines?</span></p>
        <p className="c6"><span className="c4 c0">Para llevar a cabo las finalidades descritas en el presente aviso de privacidad,
                utilizaremos los siguientes datos personales:</span></p>
        <ul className="c7 lst-kix_list_2-0 start">
            <li className="c9 li-bullet-0"><span className="c4 c0">Nombre </span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Estado Civil</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Registro Federal de Contribuyentes (RFC)</span></li>
            <li className="c9 li-bullet-0"><span className="c0 c4">Clave &uacute;nica de Registro de Poblaci&oacute;n (CURP)</span>
            </li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Lugar de nacimiento</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Fecha de nacimiento</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Nacionalidad</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Domicilio</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Tel&eacute;fono particular</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Tel&eacute;fono celular</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Correo electr&oacute;nico</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">Firma aut&oacute;grafa</span></li>
            <li className="c9 li-bullet-0"><span className="c4 c0">C&eacute;dula Profesional, C&eacute;dula de Especialidad (en caso
                    de haberla).</span><span className="c4 c8"><br/></span></li>
        </ul>
        <p className="c6"><span className="c2">&iquest;Con qui&eacute;n compartimos su informaci&oacute;n personal y para qu&eacute;
                fines?</span></p>
        <p className="c6"><span className="c4 c0">Le informamos que sus datos personales son compartidos dentro del pa&iacute;s con
                las siguientes personas, empresas, organizaciones o autoridades distintas a nosotros, para los siguientes
                fines:</span></p>
        <p className="c6"><span className="c5">Destinatario de datos personales</span><span className="c4 c0">&nbsp;Cuenta de clientes
                del establecimiento</span></p>
        <p className="c6"><span className="c5">Finalidad</span><span className="c4 c0">&nbsp;</span></p>
        <ul className="c7 lst-kix_list_4-0 start">
            <li className="c1 li-bullet-0"><span className="c4 c0">Confirmar su identidad, as&iacute; como su grado
                    acad&eacute;mico;</span></li>
            <li className="c1 li-bullet-0"><span className="c4 c0">Prestarle el servicio de la plataforma;</span></li>
            <li className="c1 li-bullet-0"><span className="c4 c0">Proporcionarle sus (datos de autenticaci&oacute;n);</span></li>
            <li className="c1 li-bullet-0"><span className="c4 c0">Realizar procesos de facturaci&oacute;n y pago;</span></li>
            <li className="c1 li-bullet-0"><span className="c4 c0">En su caso, cumplir lo requerido por la Ley; </span></li>
            <li className="c1 li-bullet-0"><span className="c4 c0">Cumplir con los requerimientos de naturaleza legal que cualquier
                    autoridad competente o cualquier legislaci&oacute;n aplicable imponga a Prosit.</span></li>
            <li className="c16 li-bullet-0"><span className="c4 c0">Enviar futuras promociones y servicios</span></li>
        </ul>
        <p className="c6"><span className="c5">Requiere del consentimiento</span><span className="c4 c0">&nbsp;No No</span></p>
        <p className="c6"><span className="c2">&iquest;C&oacute;mo puede acceder, rectificar o cancelar sus datos personales, u
                oponerse a su uso?</span></p>
        <p className="c6"><span className="c0">Usted tiene derecho a conocer qu&eacute; datos personales tenemos de usted, para
                qu&eacute; los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho
                solicitar la correcci&oacute;n de su informaci&oacute;n personal en caso de que est&eacute; desactualizada,
                sea inexacta o incompleta (Rectificaci&oacute;n); que la eliminemos de nuestros registros o bases de datos
                cuando considere que la misma no est&aacute; siendo utilizada adecuadamente (Cancelaci&oacute;n); as&iacute;
                como oponerse al uso de sus datos personales para fines espec&iacute;ficos (Oposici&oacute;n). Estos
                derechos se conocen como derechos ARCO. Para el ejercicio de cualquiera de los derechos ARCO, usted
                deber&aacute; presentar la solicitud respectiva a trav&eacute;s del siguiente medio: Enviando un correo
                electr&oacute;nico a&nbsp;https://atomic-temporary-203126534.wpcomstaging.com/ Para conocer el procedimiento
                y requisitos para el ejercicio de los derechos ARCO, ponemos a su disposici&oacute;n el siguiente medio:
                Enviando un correo electr&oacute;nico a&nbsp;&nbsp;Los datos de contacto de
                la persona o departamento de datos personales, que est&aacute; a cargo de dar tr&aacute;mite a las
                solicitudes de derechos ARCO, son los siguientes: a) Nombre de la persona o departamento de datos
                personales: Coordinaci&oacute;n de Ventas b) Av. Tlalnepantla-Tenayuca 25, San Bartolo Tenayuca, 54150
                Tlalnepantla de Baz, M&eacute;x. c) Correo electr&oacute;nico: </span><span className="c0 c3"><a className="c10"
                    href="#">contacto@medhaustlalnepantla.com</a></span><span
                className="c4 c0">&nbsp;d) N&uacute;mero telef&oacute;nico: (55) 10572938</span></p>
        <p className="c6"><span className="c2">Usted puede revocar su consentimiento para el uso de sus datos personales</span></p>
        <p className="c6"><span className="c0">Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el
                tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los
                casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna
                obligaci&oacute;n legal requiramos seguir tratando sus datos personales. Asimismo, usted deber&aacute;
                considerar que para ciertos fines, la revocaci&oacute;n de su consentimiento implicar&aacute; que no le
                podamos seguir prestando el servicio que nos solicit&oacute;, o la conclusi&oacute;n de su relaci&oacute;n
                con nosotros. Para revocar su consentimiento deber&aacute; presentar su solicitud a trav&eacute;s del
                siguiente medio: Enviando un correo electr&oacute;nico a</span><span
                className="c5">&nbsp;</span><span className="c4 c0">&nbsp;Para conocer el
                procedimiento y requisitos para la revocaci&oacute;n del consentimiento.</span></p>
        <p className="c6"><span className="c2">&iquest;C&oacute;mo puede limitar el uso o divulgaci&oacute;n de su
                informaci&oacute;n personal?</span></p>
        <p className="c6"><span className="c4 c0">Con objeto de que usted pueda limitar el uso y divulgaci&oacute;n de su
                informaci&oacute;n personal, le ofrecemos los siguientes medios: Llamando al (56) 10572938 o enviando un
                correo electr&oacute;nico a ccastillo@foadmi.com&nbsp;De manera adicional, le informamos que contamos con
                los siguientes listados de exclusi&oacute;n, en los cuales podr&aacute; registrarse para que sus datos
                personales no sean tratados para ciertos fines:</span></p>
        <p className="c6"><span className="c5">Nombre del listado</span><span className="c4 c0">&nbsp;LISTA PRIVADA</span></p>
        <p className="c6"><span className="c5">Finalidad para las que aplica</span><span className="c4 c0">&nbsp;S&oacute;lo
                comunicados, no publicidad</span></p>
        <p className="c6"><span className="c5">Medio para obtener mayor informaci&oacute;n</span><span className="c0">&nbsp;Llamando al
                (56) 10572938 o enviando un correo electr&oacute;nico a&nbsp;</span><span
                className="c5">ccastillo@foadmi.com</span></p>
        <p className="c6"><span className="c2">El uso de tecnolog&iacute;as de rastreo en nuestro portal de internet</span></p>
        <p className="c6"><span className="c4 c0">Le informamos que en nuestra p&aacute;gina de internet utilizamos cookies, web
                beacons u otras tecnolog&iacute;as, a trav&eacute;s de las cuales es posible monitorear su comportamiento
                como usuario de internet, as&iacute; como brindarle un mejor servicio y experiencia al navegar en nuestra
                p&aacute;gina. Los datos personales que recabamos a trav&eacute;s de estas tecnolog&iacute;as, los
                utilizaremos para los siguientes fines: Conocer el perfil de nuestros compradores y estad&iacute;sticas de
                publicidad o de mercado Los datos personales que obtenemos de estas tecnolog&iacute;as de rastreo son los
                siguientes:</span></p>
        <p className="c6"><span className="c4 c0">&bull; Regi&oacute;n en la que se encuentra el usuario &bull; Tipo de navegador
                del usuario &bull; Tipo de sistema operativo del usuario &bull; Fecha y hora del inicio y final de
                sesi&oacute;n de usuario &bull; H&aacute;bitos de consumo en p&aacute;ginas de compras</span></p>
        <p className="c6"><span className="c4 c0">&bull; P&aacute;ginas web visitadas por un usuario &bull; B&uacute;squedas
                realizadas por un usuario &bull; Publicidad revisada por un usuario &bull; Listas</span></p>
        <p className="c6"><span className="c2">&iquest;C&oacute;mo puede conocer los cambios en este aviso de privacidad?</span></p>
        <p className="c6"><span className="c0">El presente aviso de privacidad puede sufrir modificaciones, cambios o
                actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los
                productos o servicios que ofrecemos; de nuestras pr&aacute;cticas de privacidad; de cambios en nuestro
                modelo de negocio, o por otras causas. Nos comprometemos a mantenerlo informado sobre los cambios que pueda
                sufrir el presente aviso de privacidad, a trav&eacute;s de: En el siguiente sitio web&nbsp;</span><span
                className="c5"></span><span className="c0">&nbsp;El procedimiento a trav&eacute;s del cual se
                llevar&aacute;n a cabo las notificaciones sobre cambios o actualizaciones al presente aviso de privacidad es
                el siguiente: En el siguiente sitio web&nbsp;</span><span className="c5"></span></p>
        <p className="c15"><span className="c4 c12"></span></p>
       
      </div>
    </div>
  );
}
