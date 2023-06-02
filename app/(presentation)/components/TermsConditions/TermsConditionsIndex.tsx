"use client";

import Link from "next/link";
import Button from "../core/BaseComponents/Button";

export default function TermsConditionsIndex() {
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
      <p className="c10"><span className="c12">T&Eacute;RMINOS Y CONDICIONES GENERALES DE SERVICIOS MKS TECHNOLOGY </span></p>
        <p className="c10"><span className="c12">(EN LO SUCESIVO &ldquo;NOODUS&rdquo;)</span></p>
        <p className="c10 c19"><span className="c0"></span></p>
        <p className="c1"><span className="c0">Los presentes T&eacute;rminos y Condiciones de Servicios tienen como objeto regular
                el uso y acceso a la Plataforma NOODUS (en adelante, la Plataforma) y los servicios que se suministran a
                trav&eacute;s de la misma, que incluyen el sitio web </span><span className="c13"><a className="c15"
                    href="https://www.google.com/url?q=http://www.medhaus.com.mx&amp;sa=D&amp;source=editors&amp;ust=1682882889129447&amp;usg=AOvVaw3u4l5acO09YbV_cAuAaSbU">www.medhaus.com.mx</a></span><span
                className="c0">&nbsp;, el Software NOODUS, cualesquiera portales, programas y servicios adicionales que funjan
                como extensi&oacute;n de la Plataforma.</span></p>
        <p className="c1"><span className="c0">Los presentes T&eacute;rminos y Condiciones de Uso son un contrato entre el usuario
                (tal como se define m&aacute;s adelante) y CERTUS PROJECT MANAGEMENT SA DE CV (en lo sucesivo MEDHAUS), por
                lo que constituyen un acuerdo legal y vinculante. Al aceptarlos y hacer uso de la Plataforma, el usuario se
                obliga a regirse por los presentes, los cuales manifiesta haber le&iacute;do y comprender su alcance, y en
                caso de no estar de acuerdo con los mismos, deber&aacute; abstenerse de usar y registrarse a la
                Plataforma.</span></p>
        <p className="c1"><span className="c0">El Usuario expresa su consentimiento y aceptaci&oacute;n de los presentes
                T&eacute;rminos y Condiciones de Uso al (i) seleccionar la casilla de aceptaci&oacute;n el bot&oacute;n de
                &laquo;Registrarme&raquo;; (ii) realizar el primer pago por los servicios y/o licencia; y (iii) comenzar a
                hacer uso del Software.<br/>Los t&eacute;rminos aplicar&aacute;n a aquellas personas que tengan calidad de
                usuario y que se encuentren en el territorio mexicano bajo las leyes vigentes aplicables.</span></p>
        <p className="c1"><span className="c0"><br/></span><span className="c3">1. Definiciones</span></p>
        <p className="c1"><span className="c0">Los Servicios: Significa los de administraci&oacute;n de informaci&oacute;n ofrecidos
                a trav&eacute;s del sitio de Internet </span><span className="c13"><a className="c15"
                    href="https://www.google.com/url?q=http://www.medhaus.com.mx&amp;sa=D&amp;source=editors&amp;ust=1682882889130627&amp;usg=AOvVaw1ZL90qs56bCJ3VathFFbu_">www.medhaus.com.mx</a></span><span
                className="c0">&nbsp; y consisten -sin limitaci&oacute;n- en la autorizaci&oacute;n al Usuario de acceso y
                utilizaci&oacute;n de herramientas electr&oacute;nicas de b&uacute;squeda y consulta de informaci&oacute;n
                relacionada con los datos cl&iacute;nicos y/o documentaci&oacute;n m&eacute;dica de los pacientes del
                usuario, para la consulta y uso de estos en relaci&oacute;n con el desempe&ntilde;o de la atenci&oacute;n
                m&eacute;dica que el Usuario proporciona a dichos pacientes.</span></p>
        <p className="c1"><span className="c0">Usuario: Significa la persona f&iacute;sica que se haya registrado a la Plataforma,
                luego de aceptar los T&eacute;rminos y Condiciones de Uso y haber aceptado el Aviso de Privacidad. Al efecto
                s&oacute;lo podr&aacute;n tener el car&aacute;cter de usuario las personas mayores de edad, en pleno
                ejercicio de sus derechos y que cuenten con las credenciales correspondientes para ejercer como
                M&eacute;dicos o Asistentes<br/>M&eacute;dicos. Los tipos de usuarios son los siguientes: i) M&eacute;dico
                Usuario y ii) Asistente de M&eacute;dico Usuario.</span></p>
        <p className="c1"><span className="c0">Paciente: Significa la persona no Usuario de los Servicios que se encuentra bajo la
                atenci&oacute;n<br/>m&eacute;dica del Usuario de la Plataforma y que ha aceptado el Aviso de Privacidad que
                al efecto se le ha puesto a disposici&oacute;n.</span></p>
        <p className="c1"><span className="c0">Plataforma: Significa la plataforma de software NOODUS que es utilizada por MEDHAUS,
                que &nbsp;esta desarrollada por MKS Technology y que incluye el Software, el sitio web, las aplicaciones y
                cualquier otro programa que sirva como extensi&oacute;n de la misma.</span></p>
        <p className="c1"><span className="c0">Expediente Cl&iacute;nico: Significa la recopilaci&oacute;n de datos cl&iacute;nicos
                del paciente compilados utilizada a trav&eacute;s de la Plataforma, misma que cumple con la
                NOM-004-SSA-2012.</span></p>
        <p className="c1"><span className="c0">Contrase&ntilde;a: Significa la clave secreta que ser&aacute; utilizada por cada
                Usuario para efectos de<br/>registrarse y acceder a la plataforma.</span></p>
        <p className="c1"><span className="c0">&#8203;Las Partes MEDAUS y el Usuario.</span></p>
        <p className="c1"><span className="c3">2. Uso de la Plataforma</span></p>
        <p className="c1"><span className="c0">MEDHAUS pone a disposici&oacute;n del Usuario el Software denominado NOODUS a
                trav&eacute;s del sitio web www.medhaus.com.mx y para su descarga a trav&eacute;s de la aplicaci&oacute;n
                m&oacute;vil misma que se encuentra disponible para los sistemas operativos IOS y Android.</span></p>
        <p className="c1"><span className="c0">Las Partes convienen en que a partir de la fecha en que el Usuario se registre a la
                Plataforma ya sea en su versi&oacute;n web o m&oacute;vil, &eacute;ste podr&aacute; hacer uso del
                mismo.</span></p>
        <p className="c1"><span className="c0">Si usted es Usuario, al ingresar a la Plataforma a trav&eacute;s del sitio web
                referido podr&aacute; visualizar un formulario a fin de registrarse en la misma, donde deber&aacute;
                ingresar sus datos personales y contrase&ntilde;a. Para uso de la Plataforma deber&aacute; aceptar el Aviso
                de Privacidad puesto a su disposici&oacute;n y los presentes T&eacute;rminos y Condiciones de Uso. Una vez
                registrado, le aparecer&aacute; un panel de apoyo y una opci&oacute;n para visualizar los tutoriales a fin
                de conocer mejor la Plataforma. </span></p>
        <p className="c1"><span className="c0">Al registrarse, el Usuario es responsable de proteger su contrase&ntilde;a y acepta
                no divulgar la misma con terceros, por lo que el Usuario acepta que la actividad que tenga lugar a
                trav&eacute;s de su cuenta se tendr&aacute; como realizada por este, y que ser&aacute; responsable de la
                actividad derivada del uso de su cuenta cuando la haya autorizado o no.</span></p>
        <p className="c1"><span className="c0">El Usuario acepta que su cuenta personal es &uacute;nica e intransferible por lo que
                est&aacute; prohibido el uso de la cuenta por personas distintas. En caso de que MEDHAUS identifique que la
                cuenta est&aacute; siendo utilizada por diversos usuarios o se est&aacute; dando un uso indebido a la
                Plataforma, MEDHAUS se reserva el derecho de suspender o eliminar la cuenta con previa notificaci&oacute;n.
                En este evento, MEDHAUS no ser&aacute; responsable por concepto alguno de indemnizaci&oacute;n, ni
                devolver&aacute; las cantidades erogadas en los planes para el uso de la Plataforma.</span></p>
        <p className="c1"><span className="c0">Una vez registrado en la Plataforma, y con base a las modalidades de uso, el Usuario
                podr&iacute;a tener un periodo de prueba por un per&iacute;odo de tiempo que podr&aacute; visualizarse en la
                secci&oacute;n de planes y pagos junto con los Servicios que la Plataforma ofrece al registrarse. Al
                terminar la prueba gratis el Usuario deber&aacute; elegir entre los planes desglosados en dicho apartado,
                mismos que aparecer&aacute;n con la serie de beneficios que ofrece cada plan ya sea mensual o anual
                decidiendo en dicho momento la modalidad de pago.</span></p>
        <p className="c1"><span className="c0">Los pacientes podr&aacute;n utilizar la plataforma como directorio m&eacute;dico para
                buscar profesionales por distintos m&eacute;todos y agendar su cita de acuerdo con la disponibilidad del
                m&eacute;dico. Para reservar una cita con un m&eacute;dico registrado o usuario de la Plataforma NOODUS,
                dichos Pacientes deber&aacute;n completar el formulario de registro en el que insertar&aacute;n sus datos
                personales por lo que deber&aacute;n aceptar el Aviso de Privacidad que al efecto se pone a su
                disposici&oacute;n al agendar la cita.</span></p>
        <p className="c1"><span className="c0">Una vez aceptado el Aviso de Privacidad, el Paciente deber&aacute; hacer clic en el
                bot&oacute;n &ldquo;Reservar cita&rdquo; y autom&aacute;ticamente el Usuario recibir&aacute; una
                notificaci&oacute;n con la confirmaci&oacute;n del registro y de su cita. Dicha cita podr&aacute;
                consultarla, reprogramarla o cancelarla en el portal </span><span className="c13"><a className="c15"
                    href="https://www.google.com/url?q=http://www.medhaus.com.mx&amp;sa=D&amp;source=editors&amp;ust=1682882889132847&amp;usg=AOvVaw1JZqXWJ11CnGCg0rw3Nbxp">www.medhaus.com.mx</a></span><span
                className="c0">&nbsp; una vez que inicie sesi&oacute;n. </span></p>
        <p className="c1"><span className="c0">Una vez iniciada su sesi&oacute;n, el Paciente podr&aacute; acceder a sus datos
                personales, historial de citas, promociones, contenidos, registros m&eacute;dicos (recetas, tratamientos,
                &oacute;rdenes m&eacute;dicas, resultados, diagn&oacute;sticos, antecedentes). Igualmente, el paciente
                podr&aacute; acceder a servicios de control de tratamientos, programa de salud y prevenci&oacute;n creados
                por el m&eacute;dico, recomendaciones y consejos, videos, recordatorios, entre otros servicios. Alguno de
                estos servicios s&oacute;lo estar&aacute;n disponibles en la App m&oacute;vil del Paciente.</span></p>
        <p className="c1"><span className="c0">El Usuario igualmente podr&aacute; crear al Paciente y alimentar sus datos personales
                y el Paciente recibir&aacute; la confirmaci&oacute;n del registro para aceptar o denegar el aviso de
                privacidad y el registro.</span></p>
        <p className="c1"><span className="c0">El Usuario compartir&aacute; la informaci&oacute;n cl&iacute;nica del Paciente
                (incluyendo su &uacute;ltima receta, diagn&oacute;stico, alergias, antecedentes, infograf&iacute;as,
                &uacute;ltimas &oacute;rdenes y estudios solicitados, as&iacute; como programas de prevenci&oacute;n,
                recomendaciones y contenidos de salud y bienestar) con este mismo a efecto de informarle sobre su estado de
                salud. El Paciente podr&aacute; acceder a dicha informaci&oacute;n iniciando sesi&oacute;n en el portal o en
                la App m&oacute;vil y desde ambas aplicaciones podr&aacute; igualmente compartir informaci&oacute;n con El
                Usuario sobre su estado de salud.</span></p>
        <p className="c1"><span className="c0">El Usuario se obliga a utilizar la Plataforma para los fines establecidos en los
                presentes T&eacute;rminos y Condiciones de Uso, as&iacute; como de respetar los Derechos de Autor y de
                Propiedad Industrial de NOODUS respecto del contenido que se ofrece en la Plataforma.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c3">3. Limitaciones en el uso de la Plataforma</span></p>
        <p className="c6"><span className="c0">El Usuario deber&aacute; sujetarse a las limitaciones y condiciones establecidas de
                los presentes<br/>t&eacute;rminos y no podr&aacute;, en ning&uacute;n caso:</span></p>
        <p className="c6"><span className="c0">&#8203;</span></p>
        <ol className="c7 lst-kix_list_1-0 start" start={1}>
            <li className="c6 c8 li-bullet-0"><span className="c0">Obtener cualquier beneficio econ&oacute;mico a trav&eacute;s de
                    la difusi&oacute;n, enajenaci&oacute;n o transmisi&oacute;n material o electr&oacute;nica de la
                    Plataforma NOODUS;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Utilizar Plataforma NOODUS para fines diversos de los
                    expresamente autorizados;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Redistribuir total o parcialmente el Software, y cualquier
                    contenido asociado a &eacute;ste;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Realizar trabajos de ingenier&iacute;a inversa, descompilar o
                    desensamblar el Software o intentar, por otros medios, obtener su c&oacute;digo fuente;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Modificar en forma alguna los c&oacute;digos originales,
                    ejecutables, documentos y recursos de informaci&oacute;n, as&iacute;; como realizar cualquier
                    acci&oacute;n o atentado en contra de los mismos;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Permitir o fomentar a cualquier tercero a realizar alguna de las
                    actividades anteriormente descritas;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Involucrarse en actividades que interfieran o interrumpan los
                    servicios de la Plataforma y/o del Software;</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Eludir o tratar de eliminar las medidas de protecci&oacute;n
                    tecnol&oacute;gica que se hayan<br/>implementado para la protecci&oacute;n de la Plataforma</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Utilizar los datos personales de terceros y la informaci&oacute;n
                    que se encuentra en la Plataforma para fines de lucro; y</span></li>
            <li className="c1 c8 li-bullet-0"><span className="c0">Transmitir a trav&eacute;s de la Plataforma cualquier virus o
                    mecanismo tendiente a afectar negativamente el uso de esta.</span></li>
        </ol>
        <p className="c1"><span className="c0">Al momento en que los Usuarios suben documentaci&oacute;n relativa a su historial
                profesional y<br/>acad&eacute;mico, la Plataforma se encarga de cotejar que dicha informaci&oacute;n que
                acredita sus<br/>credenciales, coincida con la informaci&oacute;n p&uacute;blica establecida en la base de
                datos que a su efecto el gobierno emita (en el caso que esto pueda realizase de forma autom&aacute;tica).
                Sin embargo, MEDHAUS no se hace responsable de la falsedad o legitimidad de los documentos subidos a la
                Plataforma por los Usuarios, incluidos su INE, t&iacute;tulo profesional, c&eacute;dula profesional,
                c&eacute;dula de especialidad.</span></p>
        <p className="c1"><span className="c0">MEDHAUS se reserva el derecho de hacer investigaciones encaminadas a indagar
                cualquiera de las actividades enunciadas, as&iacute; como de iniciar cualquier procedimiento o acci&oacute;n
                judicial contra el mal uso, infracciones, delitos y da&ntilde;os y perjuicios ocasionados por el
                Usuario.</span></p>
        <p className="c1"><span className="c0"><br/></span><span className="c3">4. Licencia de uso del Software Plataforma</span></p>
        <p className="c1"><span className="c0">El Usuario acuerda que al momento de aceptar los presentes T&eacute;rminos y
                Condiciones de Uso, MEDHAUS otorga al Usuario una licencia de uso (i) onerosa; (ii) no exclusiva; e (iii)
                intransferible sobre el Software NOODUS (en adelante, la Licencia). La Licencia se confiere con el fin de
                que el Usuario tenga acceso a la informaci&oacute;n y servicios que la Plataforma presta.</span></p>
        <p className="c1"><span className="c0">El Usuario reconoce que el uso de la Plataforma comprendida en los presentes
                T&eacute;rminos y<br/>Condiciones de Uso &uacute;nicamente abarca las licencias y autorizaciones
                expl&iacute;citamente otorgadas en los mismos, por lo que cualesquiera derechos y/o licencias que no
                est&eacute;n expl&iacute;citamente otorgados al Usuario en los presentes, son reservados para NOODUS. Por
                ello, el Usuario reconoce que su uso de la licencia del Software NOODUS de ninguna manera implica
                ning&uacute;n tipo de cesi&oacute;n ni transmisi&oacute;n de ning&uacute;n derecho de autor sobre este, ni
                sobre cualquier elemento y/o derecho relacionado.</span></p>
        <p className="c1"><span className="c3">5. El alcance de los Servicios</span></p>
        <p className="c1"><span className="c0">Para los Usuarios de la Plataforma, se podr&aacute;n contratar los siguientes
                planes:</span></p>
        <ul className="c7 lst-kix_list_12-0 start">
            <li className="c1 c5 li-bullet-1"><span className="c0">Plan base</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Plan Especialista</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Plan proveedores</span></li>
        </ul>
        <p className="c1"><span className="c0">Cada uno de los planes incluyen diferentes funcionalidades, mismas que pueden
                consultarse directamente en la p&aacute;gina www.medhaus.com.mx</span></p>
        <p className="c1"><span className="c3">6. Exclusi&oacute;n de Garant&iacute;as</span></p>
        <p className="c1"><span className="c0">NOODUS pone a disposici&oacute;n del Usuario la Plataforma en el estado en que se
                encuentra y no asume responsabilidad alguna relacionada con la operaci&oacute;n satisfactoria y rendimiento
                del mismo. Asimismo, no garantiza que:</span></p>
        <ol className="c7 lst-kix_list_11-0 start" start={1}>
            <li className="c6 c9 li-bullet-1"><span className="c0">El Plataforma est&eacute; libre de errores;</span></li>
            <li className="c6 c9 li-bullet-1"><span className="c0">Su uso no se vea interrumpido o afectado por errores, virus u
                    otras funciones de<br/>desactivaci&oacute;n que afecten el acceso o el uso de la Plataforma; </span></li>
            <li className="c6 c9 li-bullet-2"><span className="c0">El acceso o el uso del servicio estar&aacute; exento de
                    interrupciones o de errores.</span></li>
        </ol>
        <p className="c1"><span className="c0">De igual forma, NOODUS no otorga garant&iacute;a alguna, ya sea expresa o
                impl&iacute;cita, relacionada con el otorgamiento de la presente Licencia.</span></p>
        <p className="c1"><span className="c3">7. Limitaci&oacute;n de responsabilidad</span></p>
        <p className="c1"><span className="c0">En ning&uacute;n caso NOODUS ser&aacute; responsable por da&ntilde;os de cualquier
                naturaleza que se deriven del uso de su Plataforma o de la incapacidad para usarlo, ni de aquellos que se
                generen por la p&eacute;rdida o robo del Software, aun cuando NOODUS haya sido informado sobre la
                posibilidad de dichos da&ntilde;os.</span></p>
        <p className="c1"><span className="c0">De igual forma, NOODUS no asume responsabilidad alguna por la descarga,
                instalaci&oacute;n y uso de su Plataforma, as&iacute; como del deterioro, uso indebido o il&iacute;cito y
                p&eacute;rdida de informaci&oacute;n derivada de su uso.</span></p>
        <p className="c1"><span className="c0">Asimismo, NOODUS no es responsable de cualquier incompatibilidad con el Software y
                otros sitios de Internet, servicios, Softwares, hardwares, o cualquier retraso o falla que se pueda producir
                al iniciar, realizar o llevar a cabo cualquier transmisi&oacute;n con el dispositivo electr&oacute;nico. La
                informaci&oacute;n contenida en la Plataforma se presenta con la mayor oportunidad posible y con base en la
                informaci&oacute;n que su vez le es proporcionada por terceros, por lo que eventualmente podr&iacute;a haber
                discrepancias con la informaci&oacute;n definitiva, raz&oacute;n por la cual el Usuario est&aacute;
                consciente y acepta que NOODUS no asume responsabilidad alguna por tales discrepancias. Adicionalmente, con
                la aceptaci&oacute;n de los presentes, el Usuario libera a NOODUS de toda responsabilidad legal o de
                cualquier otra &iacute;ndole, por la precisi&oacute;n, oportunidad, contenido o uso que terceros den a la
                informaci&oacute;n dada a conocer a trav&eacute;s de la Plataforma.</span></p>
        <p className="c1"><span className="c0">Adem&aacute;s, NOODUS en este momento manifiesta que:</span></p>
        <ol className="c7 lst-kix_list_2-0 start" start={1}>
            <li className="c1 c5 li-bullet-1"><span className="c0">La Plataforma a trav&eacute;s de la cual presta los servicios no
                    es una empresa promotora de salud o instituci&oacute;n sanitaria, por lo que &uacute;nicamente funge
                    como intermediaria y es una herramienta para los m&eacute;dicos, que incluyen de manera enunciativa
                    m&aacute;s no limitativa, la agenda de citas y el mantenimiento de la historia cl&iacute;nica.</span>
            </li>
            <li className="c1 c5 li-bullet-2"><span className="c0">La Plataforma no tiene responsabilidad sobre la veracidad o
                    falsedad de los<br/>documentos que los m&eacute;dicos hayan ingresado a la plataforma seg&uacute;n las
                    leyes<br/>mexicanas aplicables.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">La Plataforma no tiene injerencia o asesora al Paciente en la
                    elecci&oacute;n de los m&eacute;dicos.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">La Plataforma no tiene responsabilidad alguna respecto de las
                    opiniones, diagn&oacute;sticos o recomendaciones que emita el m&eacute;dico a trav&eacute;s de la
                    misma.</span></li>
        </ol>
        <p className="c1"><span className="c0">&#8203;Si el usuario estuviere insatisfecho con la Plataforma o no estuviere de
                acuerdo con los presentes t&eacute;rminos y condiciones, su &uacute;nico y exclusivo recurso consiste en
                dejar de utilizar la Plataforma.</span></p>
        <p className="c1"><span className="c3">8. Actualizaciones a la plataforma NOODUS</span></p>
        <p className="c1"><span className="c0">NOODUS puede realizar de forma autom&aacute;tica las modificaciones al sistema que
                considere<br/>necesarias para la mejora, actualizaci&oacute;n y desarrollo en mayor grado del Software,
                mismas que el usuario apreciar&aacute; de forma autom&aacute;tica en la plataforma, ya sea en el sitio web o
                en la aplicaci&oacute;n m&oacute;vil. Asimismo, puede eliminar, en cualquier momento y sin previo aviso, la
                funcionalidad del Software por este motivo sin responsabilidad alguna a su cargo.</span></p>
        <p className="c1"><span className="c3">9. Pagos, contrataciones y prueba gratis</span></p>
        <p className="c1"><span className="c0">Adem&aacute;s de ofrecer los Servicios ya enunciados, NOODUS puede ofrecer una prueba
                gratis. La duraci&oacute;n del periodo de prueba gratis se especifica en el punto 2 de los presentes
                t&eacute;rminos y condiciones y tiene la intenci&oacute;n de permitir que los nuevos miembros prueben los
                Servicios. NOODUS determina otorgar la prueba gratis a su sola discreci&oacute;n y puede limitar el
                otorgamiento o duraci&oacute;n para evitar el abuso de la prueba gratis. NOODUS se reserva el derecho de
                revocar la prueba gratuita y suspender su cuenta si determina que el Usuario no es elegible como un
                m&eacute;dico v&aacute;lido para ser Usuario de la plataforma.</span></p>
        <p className="c1"><span className="c0">Para hacer uso del servicio de la Plataforma NOODUS, el Usuario debe contar con los
                requisitos t&eacute;cnicos mencionados en el sitio web y contratar alguno de los planes a trav&eacute;s de
                una forma de pago v&aacute;lida mencionada en el apartado de &ldquo;Pagos&rdquo; en la Plataforma. Una vez
                contratado alguno de los planes entrar&aacute; a un servicio de suscripci&oacute;n de renovaci&oacute;n
                autom&aacute;tica mensual o anual, seg&uacute;n sea el caso del plan contratado. La suscripci&oacute;n
                continuar&aacute; hasta que el Usuario decida cancelarla, mientras el Usuario no realice el proceso de
                cancelaci&oacute;n antes de la fecha de corte mencionada en el apartado de &ldquo;Pagos&rdquo;, autoriza a
                NOODUS a cobrarle la suscripci&oacute;n del siguiente ciclo de facturaci&oacute;n a su forma de pago
                establecida.</span></p>
        <p className="c1"><span className="c0">En caso de que el pago no pudiera ejecutarse de manera exitosa, debido a la fecha
                de<br/>vencimiento, la falta de fondos o si el Usuario no actualiza la informaci&oacute;n de su forma de
                pago, NOODUS tendr&aacute; el derecho de suspender su acceso al servicio hasta que obtengamos una forma de
                pago v&aacute;lida. Para visualizar la pr&oacute;xima fecha de pago dir&iacute;jase a &ldquo;Planes y
                Pagos&rdquo; dentro de la cuenta en la Plataforma NOODUS y seleccione la opci&oacute;n &ldquo;Mis
                pagos&rdquo;.</span></p>
        <p className="c1"><span className="c0">NOODUS se reserva el derecho de cambiar los planes de suscripci&oacute;n fechas de
                corte, fechas de pago y el precio de los servicios. Cualquier modificaci&oacute;n al respecto ser&aacute;
                notificada con anterioridad para que el Usuario decida si desea permanecer con la suscripci&oacute;n al
                mismo plan, cambiarlo de plan o cancelar la suscripci&oacute;n. Dicho cambio se aplicar&aacute; a los
                siguientes ciclos de facturaci&oacute;n.</span></p>
        <p className="c1"><span className="c3">10. Facturaci&oacute;n por el servicio contratado</span></p>
        <p className="c1"><span className="c0">La duraci&oacute;n del ciclo de facturaci&oacute;n depender&aacute; de la forma de
                pago que el Usuario elija al<br/>suscribirse a los Servicios, esta puede ser mensual o anual. La factura se
                realizar&aacute; de forma<br/>autom&aacute;tica una vez recibido el pago, teniendo como fecha l&iacute;mite
                el &uacute;ltimo d&iacute;a del mes en que se realiz&oacute; el pago. Para poder facturar es necesario que
                el Usuario capture su informaci&oacute;n fiscal en el apartado de &ldquo;Facturaci&oacute;n&rdquo; en la
                Plataforma.</span></p>
        <p className="c1"><span className="c3">&#8203;11. Cambios de planes </span></p>
        <p className="c1"><span className="c0">Un cambio de Plan MEDHAUS se puede realizar en cualquier momento tomando las
                siguientes consideraciones:</span></p>
        <ol className="c7 lst-kix_list_3-0 start" start={1}>
            <li className="c1 c5 li-bullet-2"><span className="c0">Para cambios entre los planes mensuales; los pagos no son
                    reembolsables y no se<br/>otorgar&aacute;n devoluciones ni cr&eacute;ditos por los d&iacute;as de
                    suscripci&oacute;n pendientes por utilizar en el mes. A partir del momento que el Usuario realice el
                    pago del nuevo plan se iniciar&aacute; la nueva fecha de corte recurrente del nuevo plan contratado. Los
                    d&iacute;as no utilizados del plan anterior se perder&aacute;n. Cualquier cambio entre los planes
                    mensuales supondr&aacute; tambi&eacute;n un cambio autom&aacute;tico a las fechas de corte del plan, las
                    cuales pasar&aacute;n a ser el primer d&iacute;a de cada mes durante la vigencia de la
                    suscripci&oacute;n.</span></li>
            <li className="c1 c5 li-bullet-1"><span className="c0">Para cambios entre los planes anuales; los pagos no son
                    reembolsables, sin embargo, se realizar&aacute; una equivalencia entre el mont&oacute; no consumido del
                    Plan anterior y los d&iacute;as de servicio que corresponden a dicho monto en el nuevo Plan contratado,
                    los cuales ser&aacute;n a&ntilde;adidos de manera adicional a los 365 d&iacute;as asignados por la
                    adquisici&oacute;n de la nueva anualidad. Cualquier cambio entre los planes anuales supondr&aacute;
                    tambi&eacute;n un cambio autom&aacute;tico a las fechas de corte del plan, las cuales pasar&aacute;n a
                    ser el primer d&iacute;a de cada mes durante la vigencia de la suscripci&oacute;n.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Para cambios de un plan anual a un plan mensual; se
                    evaluar&aacute; el costo de los d&iacute;as<br/>utilizados hasta el momento y dicho monto se
                    asignar&aacute; en &ldquo;d&iacute;as sin costo&rdquo; al nuevo plan. &nbsp;Una vez terminado los
                    d&iacute;as de gracia deber&aacute; seleccionar la suscripci&oacute;n de cobro mensual del nuevo plan
                    deseado. Cualquier cambio entre los planes supondr&aacute; tambi&eacute;n un cambio autom&aacute;tico a
                    las fechas de corte del plan, las cuales pasar&aacute;n a ser el primer d&iacute;a de cada mes durante
                    la vigencia de la suscripci&oacute;n.</span></li>
        </ol>
        <p className="c6"><span className="c0"><br/></span><span className="c3">12. Uso y contrataci&oacute;n de folios de
                Facturaci&oacute;n</span><span className="c0"><br/>&nbsp;</span></p>
        <p className="c6"><span className="c11">Facturaci&oacute;n</span></p>
        <p className="c6 c19"><span className="c0"></span></p>
        <p className="c6"><span className="c0">NOODUS otorga de manera gratuita un n&uacute;mero de Folios para que el Usuario
                pruebe los servicios de Facturaci&oacute;n. NOODUS es libre para determinar el n&uacute;mero de Folios
                otorgados dentro de esta prueba y puede limitar el otorgamiento o duraci&oacute;n para evitar el abuso de
                los mismos durante la prueba gratis de la Plataforma.</span></p>
        <p className="c6"><span className="c0"><br/>El n&uacute;mero de folios disponibles se podr&aacute;n visualizar en el apartado
                del panel de &ldquo;Facturaci&oacute;n&rdquo;. No son reembolsables los pagos realizados por el uso parcial
                o no uso de paquetes de Folios de facturaci&oacute;n. Pero s&iacute; pueden ser transferibles a la cuenta de
                otro Usuario de la Plataforma. Para realizar la transferencia de los folios de facturaci&oacute;n es
                necesario mandar un correo a </span><span className="c13"><a className="c15"
                    href="mailto:soporte@medhaus.com.mx">soporte@medhaus.com.mx</a></span><span className="c0">&nbsp;
                &nbsp;solicitando su deseo de transferir los Folios.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c3">13. Condiciones de Facturaci&oacute;n y
                Reembolsos</span></p>
        <ol className="c7 lst-kix_list_4-0 start" start={1}>
            <li className="c1 c5 li-bullet-1"><span className="c11">Emisi&oacute;n de Facturas 4.0</span><span className="c0"><br/>La
                    factura fiscal ser&aacute; realizada acorde a los lineamientos establecidos por el SAT,<br/>entregando
                    los archivos PDF y XML correspondiente en la versi&oacute;n 4.0.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Los datos fiscales del Usuario ser&aacute;n proporcionados en el
                    momento de la contrataci&oacute;n del servicio y deber&aacute;n ser iguales a los expedidos por la
                    constancia de su situaci&oacute;n fiscal.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">En caso de que el Usuario requiera actualizar sus datos de
                    facturaci&oacute;n, ser&aacute;n cargados en el sistema de la Plataforma a m&aacute;s tardar el 31 de
                    marzo de 2023, en caso de que el Usuario no haya proporcionado sus datos fiscales, el pago ser&aacute;
                    facturado como Venta al P&uacute;blico en General con el RFC gen&eacute;rico establecido por el
                    SAT.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Los pagos realizados en el mes, ser&aacute;n facturados durante
                    el mes en curso.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">Los pagos realizados el &uacute;ltimo d&iacute;a h&aacute;bil del
                    mes en curso, ser&aacute;n facturados el primer d&iacute;a h&aacute;bil del siguiente mes, aplica solo a
                    pagos realizados por transferencia.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">No se podr&aacute; emitir facturas de pagos de meses anteriores,
                    con excepci&oacute;n a los pagos realizados el &uacute;ltimo d&iacute;a h&aacute;bil del mes inmediato
                    anterior, aplica solo a pagos realizados por transferencia.</span></li>
            <li className="c1 c5 li-bullet-2"><span className="c0">En las renovaciones anuales, el Usuario recibir&aacute; un correo
                    electr&oacute;nico, notificando el mes de vencimiento de su plan, esto con el objetivo de preparar el
                    pago de suscripci&oacute;n.</span></li>
        </ol>
        <p className="c6"><span className="c0"><br/></span><span className="c11">Contenido de la factura 4.0</span><span
                className="c0"><br/>Las facturas ser&aacute;n generadas con la siguiente informaci&oacute;n:</span></p>
        <p className="c6 c19"><span className="c0"></span></p>
        <ol className="c7 lst-kix_list_5-0 start" start={1}>
            <li className="c6 c9 li-bullet-2"><span className="c0">&nbsp;Se incluye el RFC.</span></li>
            <li className="c6 c9 li-bullet-2"><span className="c0">&nbsp;Se incluye el C&oacute;digo Postal.</span></li>
            <li className="c6 c9 li-bullet-2"><span className="c0">&nbsp;Se incluye el r&eacute;gimen del receptor.</span></li>
        </ol>
        <ul className="c7 lst-kix_list_5-1 start">
            <li className="c6 c16 li-bullet-2"><span className="c0">El nombre o raz&oacute;n social ser&aacute; obligatorio y se
                    deber&aacute; validar con la Constancia de Situaci&oacute;n Fiscal.</span></li>
        </ul>
        <ol className="c7 lst-kix_list_5-0" start={4}>
            <li className="c6 c18 li-bullet-1"><span className="c0">A nivel concepto, se a&ntilde;ade un atributo para indicar si es
                    objeto o no de impuesto.<br/>En la informaci&oacute;n del uso del CFDI, se registrar&aacute; como
                    &ldquo;Gastos en General&rdquo;.</span></li>
            <li className="c6 c18 li-bullet-2"><span className="c0">El M&eacute;todo de pago</span></li>
        </ol>
        <ul className="c7 lst-kix_list_5-1 start">
            <li className="c1 c16 li-bullet-2"><span className="c0">Pago en una sola exhibici&oacute;n, cuando la factura es pagada
                    durante el mes en<br/>curso o antes de ser emitida.</span></li>
            <li className="c1 c16 li-bullet-2"><span className="c0">Pago Diferido o en parcialidades, en caso de que la factura se
                    pague despu&eacute;s de ser emitida o en parcialidades.</span></li>
        </ul>
        <p className="c1"><span className="c0">El complemento de Pagos, que debe ser expedido junto con el CFDI cuando se reciben
                pagos en parcialidades o de manera diferida tambi&eacute;n actualiza su formato<br/>con las siguientes
                novedades:</span></p>
        <ol className="c7 lst-kix_list_7-0 start" start={1}>
            <li className="c2 li-bullet-1"><span className="c0">Se agrega el campo para expresar el total de los pagos que se
                    desprenden<br/>de los nodos Pago.</span></li>
            <li className="c2 li-bullet-2"><span className="c0">Se a&ntilde;ade el atributo para indicar si el pago es objeto o no
                    de impuestos.</span></li>
            <li className="c2 li-bullet-2"><span className="c0">Se a&ntilde;ade un elemento nuevo para los impuestos, el cual
                    incluye el detalle<br/>de los Trasladados y Retenidos.</span></li>
            <li className="c2 li-bullet-2"><span className="c0">El complemento de pagos ya solo se puede usar con el tipo de
                    comprobante &#39;P&#39;.</span></li>
            <li className="c2 li-bullet-1"><span className="c0">Hay ajustes en reglas de validaci&oacute;n y
                    cat&aacute;logos.</span></li>
            <li className="c2 li-bullet-1"><span className="c0">El c&oacute;digo y concepto se indicar&aacute; el servicio
                    contratado por el Usuario, alineado al<br/>cat&aacute;logo de servicios establecido por el SAT.</span>
            </li>
        </ol>
        <p className="c1"><span className="c11">Recibo electr&oacute;nico de pago</span></p>
        <p className="c1 c14"><span className="c0">El CFDI del recibo electr&oacute;nico de pago ser&aacute; emitido cuando se haya
                recibido el pago de las facturas con el m&eacute;todo de &ldquo;Pago Diferido o en parcialidades&rdquo;,
                conforme lo establecido en los lineamientos de la facturaci&oacute;n 4.0.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c11">Env&iacute;o de la factura</span></p>
        <p className="c1 c14"><span className="c0">La factura ser&aacute; enviada al correo proporcionado por el Usuario, teniendo
                un lapso de 24 horas cuando sea d&iacute;a h&aacute;bil o se recorrer&aacute; al pr&oacute;ximo d&iacute;a
                h&aacute;bil el d&iacute;a de env&iacute;o<br/>dependiendo, a partir de la fecha de env&iacute;o para
                cualquier duda o aclaraci&oacute;n de la misma.</span></p>
        <p className="c1"><span className="c11">Aclaraciones y correcciones</span></p>
        <ul className="c7 lst-kix_list_8-0 start">
            <li className="c1 c17 li-bullet-2"><span className="c0">La factura ser&aacute; realizada con los datos proporcionados
                    por el Usuario, en caso de existir alguna informaci&oacute;n err&oacute;nea, se podr&aacute; cambiar la
                    factura siempre y cuando a&uacute;n est&eacute; dentro del mes de pago.</span></li>
            <li className="c1 c17 li-bullet-2"><span className="c0">En caso de requerir alguna correcci&oacute;n en el contenido de
                    la factura, se debe solicitar por tel&eacute;fono, mensaje de WhatsApp o email al responsable de
                    facturaci&oacute;n dentro del mismo mes en que se realiz&oacute; el pago.</span></li>
        </ul>
        <p className="c1"><span className="c3">14. Cancelaciones.</span></p>
        <p className="c1"><span className="c11">Cancelaciones de Facturas</span><span className="c0"><br/>No se aceptar&aacute;
                correcciones, ni cancelaciones de facturas despu&eacute;s del mes en que se realiz&oacute; el pago.</span>
        </p>
        <p className="c1"><span className="c0">Las condiciones para la Cancelaci&oacute;n de CFDI&rsquo;s deber&aacute; de
                considerar lo siguiente:</span></p>
        <p className="c1"><span className="c0">Se deber&aacute; incluir el motivo de cancelaci&oacute;n, considerando solamente los
                posibles valores de:</span></p>
        <ul className="c7 lst-kix_list_10-0 start">
            <li className="c1 c17 li-bullet-2"><span className="c0">Clave 01 - Comprobante emitido con errores con
                    relaci&oacute;n</span></li>
            <li className="c1 c17 li-bullet-1"><span className="c0">Clave 02 - Comprobante emitido con errores sin
                    relaci&oacute;n</span></li>
            <li className="c1 c17 li-bullet-2"><span className="c0">Clave 03 &ndash; No se llev&oacute; a cabo la
                    operaci&oacute;n</span></li>
            <li className="c1 c17 li-bullet-1"><span className="c0">Clave 04 &ndash; Operaci&oacute;n nominativa relacionada en la
                    factura global</span></li>
        </ul>
        <p className="c6"><span className="c11">&#8203;Cancelaciones del Servicio</span></p>
        <p className="c6"><span className="c0"><br/>El Usuario puede realizar la cancelaci&oacute;n del servicio de
                suscripci&oacute;n de NOODUS en cualquier momento, y continuar&aacute; teniendo acceso a los Servicios hasta
                final del mes en curso. Para cancelar los Servicios de la Plataforma NOODUS es necesario ingresar al
                m&oacute;dulo &quot;Planes y pagos&quot;, seleccionar el apartado &ldquo;Proceso de
                cancelaci&oacute;n&rdquo; y seguir los pasos descritos. Para la cancelaci&oacute;n de los Servicios es
                necesario que lo haga directamente el Usuario que realiz&oacute; la contrataci&oacute;n.<br/>El Usuario tiene
                los d&iacute;as restantes del mes a partir de la solicitud de cancelaci&oacute;n para realizar el respaldo
                de su informaci&oacute;n (Expedientes de sus pacientes), lo que permitir&aacute; extraerla/descargarla a su
                conveniencia, cuyo formato ser&aacute; definido por NOODUS. En caso de que el Usuario desee m&aacute;s
                d&iacute;as para realizar la extracci&oacute;n de su informaci&oacute;n en NOODUS deber&aacute; de
                solicitarlo v&iacute;a correo electr&oacute;nico a atencion@NOODUS.com.mx</span></p>
        <p className="c6"><span className="c0"><br/></span><span className="c11">Reembolsos</span><span className="c0"><br/>NOODUS
                podr&aacute; realizar el reembolso de pagos en los siguientes casos:</span></p>
        <p className="c6 c14"><span className="c0"><br/>1. Que el Usuario haya cometido un error al pagar alg&uacute;n paquete que no
                deseaba.<br/>2. Que el sistema haya cobrado de forma duplicada o err&oacute;nea al Usuario.</span></p>
        <p className="c6"><span className="c0"><br/>Cada caso de reembolso ser&aacute; evaluado por NOODUS y determinar&aacute; si
                aplica dicho reembolso. Al hacer uso del sistema gozando los beneficios del pago realizado, se elimina de
                forma inmediata el derecho de solicitud de reembolso.<br/>En caso de que la decisi&oacute;n de realizar el
                reembolso aplique, se realizar&aacute; el reembolso del dinero de la misma forma en la que fue efectuado el
                pago. Ya sea directamente a la tarjeta de cr&eacute;dito/d&eacute;bito, sistema electr&oacute;nico de pagos
                o transferencia interbancaria. El reembolso se realizar&aacute; durante los siguientes 10 d&iacute;as
                h&aacute;biles a partir de que se aprob&oacute; el caso de reembolso.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c3">15. Derechos de la Propiedad Intelectual</span></p>
        <p className="c1"><span className="c0">Todo el contenido, gr&aacute;ficos, interfaz de usuario, c&oacute;digo fuente y/o
                softwares utilizados en la plataforma NOODUS son propiedad de NOODUS y se encuentran protegidos por la Ley
                Federal del Derecho de Autor y/o la Ley Federal de Protecci&oacute;n a la Propiedad Industrial
                respectivamente.<br/>Por lo anterior, el Usuario acepta que los derechos de Propiedad Intelectual que se
                encuentren dentro de la Plataforma permanecer&aacute;n de la propiedad exclusiva de NOODUS y de ninguna
                forma se vende o transmite propiedad del software al Usuario. NOODUS otorga al Usuario una Licencia de uso
                limitada, no exclusiva y no transferible a terceros. Dicha Licencia de uso no dar&aacute; derechos al
                Usuario a modificar o alterar el software y en ninguna circunstancia NOODUS proveer&aacute; al Usuario las
                claves de seguridad del software y/o c&oacute;digo fuente.</span></p>
        <p className="c1"><span className="c3">16. Datos Personales</span></p>
        <p className="c1"><span className="c0">Para utilizar los Servicios, el Usuario debe proporcionar previamente ciertos datos
                de car&aacute;cter personal a trav&eacute;s del formulario respectivo. Dicha informaci&oacute;n se
                consideran datos personales, entendiendo por dicho t&eacute;rmino, cualquier informaci&oacute;n concerniente
                a una persona f&iacute;sicas identificada o identificable, conforme a la Ley Federal de Protecci&oacute;n de
                Datos Personales en Posesi&oacute;n de los Particulares
                (https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf) (en adelante Dato(s) Personal(es).</span></p>
        <p className="c1"><span className="c0">Al llenar el formulario y enviarlo a MEDHAUS, el Usuario manifiesta expresamente
                haber tenido a la vista y haber le&iacute;do el aviso de privacidad de datos personales de la Plataforma a
                trav&eacute;s del cual se prestan los servicios , por lo que acepta los t&eacute;rminos y condiciones de
                dicho aviso de protecci&oacute;n de datos personales, mismo que acepta se encuentra a su disposici&oacute;n
                para futuras consultas en el sitio de internet </span><span className="c13"><a className="c15"
                    href="https://www.google.com/url?q=http://www.medhaus.com.mx&amp;sa=D&amp;source=editors&amp;ust=1682882889145810&amp;usg=AOvVaw0QpLnfuqpKySe9qcA3CugJ">www.medhaus.com.mx</a></span>
        </p>
        <p className="c1"><span className="c0">El Usuario garantiza la veracidad, exactitud, vigencia y autenticidad de los Datos
                Personales facilitados a efecto de tener acceso al Servicio, oblig&aacute;ndose el suscrito como Usuario a
                mantenerlos correctos y debidamente actualizados, debiendo notificar a NOODUS en cuanto dicho Datos
                Personales sean modificados, por lo que NOODUS no se hace responsable en caso de que dichos Datos Personales
                sean objeto de cambios y no sean notificados por escrito dentro de un plazo de no m&aacute;s de cinco (5)
                d&iacute;as h&aacute;biles de haberse presentado la modificaci&oacute;n o cambio del Dato Personal de que se
                trate. El Usuario libera a NOODUS de cualquier tipo de responsabilidad legal (administrativa,
                jur&iacute;dica y/u otras) conforme a la Ley Federal de Protecci&oacute;n &nbsp;de Datos Personales en
                Posesi&oacute;n de los Particulares, su Reglamento o cualquier normatividad al respecto, presente o futura
                (en adelante Legislaci&oacute;n de Datos Personales), que pudiera resultar del tratamiento indebido que el
                Usuario d&eacute; a los datos personales de terceros que obtenga mediante el uso del Servicios y se
                compromete a indemnizar a NOODUS por cualquier multa, sanci&oacute;n, da&ntilde;os o perjuicios gastos o
                costas que se pudieran derivar de cualquier violaci&oacute;n a la legislaci&oacute;n de Datos Personales o
                cualquier otra normatividad que se relacione con la recolecci&oacute;n<br/>y tratamiento de Datos
                Personales.</span></p>
        <p className="c1"><span className="c0">El Usuario acepta que al hacer uso de los Servicios, todo Dato Personal considerado
                como<br/>sensible, entendiendo por este t&eacute;rmino, cualquier dato personal que afecte la esfera
                m&aacute;s &iacute;ntima de su titular, o cuya utilizaci&oacute;n indebida pueda dar origen a
                discriminaci&oacute;n o conlleve un riesgo grave para &eacute;ste, conforme a lo previsto en la
                Legislaci&oacute;n de Datos Personales, ser&aacute; su responsabilidad por lo que el Usuario se obliga a
                obtener por parte del titular de dichos datos sensibles, autorizaci&oacute;n previa y expresa del titular de
                los datos considerados como sensibles, para que estos sean tratados por el Usuario, haci&eacute;ndose cargo
                de cualquier responsabilidad al respecto tanto ante el titular de los Datos Personales como ante la
                autoridad, oblig&aacute;ndose a sacar en paz y a salvo a NOODUS de cualquier multa, sanci&oacute;n o
                cualquier cantidad que surja de cualquier violaci&oacute;n a la Legislaci&oacute;n de Datos Personales o
                cualquier otra legislaci&oacute;n respecto al tratamiento / uso de Datos Personales. Asimismo, el Usuario se
                obliga a sacar en paz y a salvo a NOODUS<br/>de cualquier reclamo de autoridades o terceros, respecto a
                cualquier responsabilidad jur&iacute;dica en la prestaci&oacute;n de servicios m&eacute;dicos mediante la
                utilizaci&oacute;n del Servicio.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c3">17. Modificaciones a los T&eacute;rminos y Condiciones
                de Uso</span></p>
        <p className="c1"><span className="c0">MEDHAUS puede modificar los presentes T&eacute;rminos y Condiciones de Uso en
                cualquier momento, por lo cual el Usuario deber&aacute; revisar peri&oacute;dicamente el apartado
                correspondiente en la Plataforma y mantenerse informado respecto de cualquier cambio o modificaci&oacute;n.
                En caso de que no est&eacute; de acuerdo con cualquier modificaci&oacute;n a los T&eacute;rminos y
                Condiciones de Uso, el Usuario deber&aacute; interrumpir el uso de la Plataforma. Cualquier otro acuerdo
                entre las Partes ser&aacute; reemplazado por los presentes t&eacute;rminos y condiciones.</span></p>
        <p className="c1"><span className="c3">18. Incumplimiento.</span></p>
        <p className="c1"><span className="c0">Las Partes acuerdan que en caso de que el Usuario incumpla total o parcialmente con
                sus<br/>obligaciones de confidencialidad establecidas en los presentes T&eacute;rminos y Condiciones de Uso,
                estar&aacute; obligado a pagar a NOODUS los da&ntilde;os y perjuicios que sean dictaminados por los
                tribunales competentes. El Usuario ser&aacute; condenado a dichos da&ntilde;os y perjuicios, adicionalmente,
                a la imposici&oacute;n de multas por parte de las autoridades correspondientes.</span></p>
        <p className="c1"><span className="c3">19. Vigencia y Aplicaci&oacute;n</span><span className="c0"><br/>Los presentes
                T&eacute;rminos y Condiciones de Uso tendr&aacute;n una vigencia indefinida y regir&aacute;n sobre todos los
                acuerdos realizados entre los Usuarios de la Plataforma y NOODUS.</span></p>
        <p className="c1"><span className="c3">20. Jurisdicci&oacute;n</span></p>
        <p className="c1"><span className="c0">Las Partes convienen que en todo lo relativo a los presentes T&eacute;rminos y
                Condiciones estar&aacute;n regidas por el C&oacute;digo de Comercio vigente en los Estados Unidos Mexicanos.
                El lugar competente de jurisdicci&oacute;n es el Distrito Judicial de la Ciudad de M&eacute;xico, Estado de
                M&eacute;xico; no obstante, lo anterior, NOODUS tambi&eacute;n tendr&aacute; derecho a formular demandas en
                contra del Usuario en cualquier otro juzgado o jurisdicci&oacute;n competente en caso de ser
                necesario.</span></p>
        <p className="c1"><span className="c0">&#8203;</span><span className="c11">&Uacute;ltima actualizaci&oacute;n 15 de marzo de
                2023.</span></p>
       
      </div>
    </div>
  );
}
