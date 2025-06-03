import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCitaPDF = async (datosPDF, formatHour) => {
  try {
    if (!datosPDF) {
      throw new Error('No se proporcionaron datos para generar el PDF');
    }

    const {
      cita,
      doctor,
      diagnostico = null,
    } = datosPDF;

    console.log(diagnostico)

    if (!cita) {
      throw new Error('Datos de cita incompletos: no se encontró información de la cita');
    }

    if (!cita.paciente) {
      throw new Error('Datos de cita incompletos: no se encontró información del paciente');
    }

    // Crear elemento temporal
    const element = document.createElement('div');
    element.style.width = '800px';
    element.style.padding = '20px';
    element.style.backgroundColor = 'white';
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    const formatDiagnostico = (diagnostico) => {
      if (!diagnostico) {
        return '<p style="color: #6b7280; font-style: italic;">No se registraron diagnósticos para esta cita.</p>';
      }

      return `
                <div style="background: #fefefe; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
                    <h4 style="color: #1e3a8a; margin: 0 0 10px 0; font-size: 16px;">${diagnostico.nombre}</h4>
                    <div style="margin-bottom: 10px;">
                        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${cita.fecha || 'No disponible'}</p>
                        <p style="margin: 5px 0;"><strong>Síntomas:</strong> ${diagnostico.sintomas || 'No disponible'}</p>
                        <p style="margin: 5px 0;"><strong>Observaciones:</strong> ${diagnostico.observaciones || ''}</p>
                        ${diagnostico.estado ? `<p style="margin: 5px 0;"><strong>Estado:</strong> ${diagnostico.estado}</p>` : ''}
                    </div>
                    
                    ${diagnostico.recetas && diagnostico.recetas.length > 0 ? `
                        <div style="border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 10px;">
                            <h5 style="color: #059669; margin: 0 0 8px 0; font-size: 14px;">Recetas:</h5>
                            ${diagnostico.recetas.map((receta, recetaIndex) => `
                                <div style="background: #f0fdf4; border: 1px solid #d1fae5; border-radius: 4px; padding: 10px; margin-bottom: 8px;">
                                    <p style="margin: 3px 0; font-size: 13px;"><strong>Medicamento:</strong> ${receta.medicamento.nombre || 'No especificado'}</p>
                                    <p style="margin: 3px 0; font-size: 13px;"><strong>Dosis:</strong> ${receta.dosis || 'No especificada'}</p>
                                    ${receta.duracion ? `<p style="margin: 3px 0; font-size: 13px;"><strong>Duración:</strong> ${receta.duracion}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
    };



    element.innerHTML = `
            <div style="font-family: 'Helvetica', 'Arial', sans-serif; color: #333;">
                <!-- Encabezado -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1e3a8a; margin-bottom: 5px;">Reporte de Cita Médica</h1>
                    <p style="color: #6b7280;">${new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</p>
                </div>

                <!-- Información del paciente -->
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Datos del Paciente</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <p><strong>Nombre:</strong> ${cita.paciente.usuario.nombre || 'No disponible'} ${cita.paciente.usuario.apellido1 || ''} ${cita.paciente.usuario.apellido2 || ''}</p>
                        </div>
                        <div>
                            <p><strong>Fecha cita:</strong> ${cita.fecha}</p>
                            <p><strong>Hora:</strong> ${formatHour(cita.hora_inicio)} - ${formatHour(cita.hora_fin)}</p>
                        </div>
                    </div>
                    ${doctor ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                        <p><strong>Doctor:</strong> ${doctor.usuario?.nombre || doctor.nombre || 'No disponible'} ${doctor.usuario?.apellido1 || doctor.apellido1 || ''}</p>
                        <p><strong>Especialidad:</strong> ${doctor.especialidad || 'No especificada'}</p>
                    </div>
                    ` : ''}
                </div>

                <!-- Información de diagnóstico -->
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 25px; border: 1px solid #e2e8f0;">
                    <h2 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 15px;">Diagnóstico</h2>
                    ${formatDiagnostico(diagnostico)}
                </div>

              

                <!-- Pie de página -->
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #6b7280; font-size: 12px;">
                    <p>Este documento fue generado automáticamente el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
                </div>
            </div>
        `;

    document.body.appendChild(element);

    // Configuración de html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    // Configuración del PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // Ancho A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Eliminar elemento temporal
    document.body.removeChild(element);

    // Guardar PDF
    const nombrePaciente = cita.paciente.usuario?.nombre || cita.paciente.nombre || 'Paciente';
    const apellidoPaciente = cita.paciente.usuario?.apellido1 || cita.paciente.apellido1 || '';
    const nombreCompleto = `${nombrePaciente}_${apellidoPaciente}`.replace(/\s+/g, '_');

    pdf.save(`Cita_${cita.id_cita}_${nombreCompleto}_${cita.fecha}.pdf`);

    console.log('PDF generado exitosamente');
    return true;

  } catch (error) {
    console.error('Error en generateCitaPDF:', error);
    throw error;
  }
};