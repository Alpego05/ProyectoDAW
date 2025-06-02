import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCitaPDF = async (citaData, formatHour) => {
    try {
        // Validación básica
        if (!citaData || !citaData.paciente) {
            throw new Error('Datos de cita incompletos');
        }

        // Crear elemento temporal
        const element = document.createElement('div');
        element.style.width = '800px';
        element.style.padding = '20px';
        element.style.backgroundColor = 'white';
        element.style.position = 'absolute';
        element.style.left = '-9999px'; // Mover fuera de pantalla

        // Plantilla HTML para el PDF
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
              <p><strong>Nombre:</strong> ${citaData.paciente.usuario.nombre} ${citaData.paciente.usuario.apellido1 || ''}</p>
              <p><strong>Teléfono:</strong> ${citaData.paciente.telefono || 'No proporcionado'}</p>
            </div>
            <div>
              <p><strong>Fecha cita:</strong> ${citaData.fecha}</p>
              <p><strong>Hora:</strong> ${formatHour(citaData.hora_inicio)} - ${formatHour(citaData.hora_fin)}</p>
            </div>
          </div>
        </div>

        <!-- Diagnósticos -->
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Diagnósticos</h2>
          
          ${citaData.diagnosticos?.length ?
                citaData.diagnosticos.map(diagnostico => `
              <div style="margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <h3 style="color: #1e40af; margin-bottom: 10px;">${diagnostico.nombre}</h3>
                
                <div style="margin-bottom: 15px;">
                  <p style="font-weight: 500; color: #4b5563; margin-bottom: 5px;">Síntomas:</p>
                  <p style="color: #374151; white-space: pre-wrap;">${diagnostico.sintomas}</p>
                </div>
                
                ${diagnostico.observaciones ? `
                <div style="margin-bottom: 15px;">
                  <p style="font-weight: 500; color: #4b5563; margin-bottom: 5px;">Observaciones:</p>
                  <p style="color: #374151; white-space: pre-wrap;">${diagnostico.observaciones}</p>
                </div>
                ` : ''}
                
                <!-- Recetas -->
                ${diagnostico.recetas?.length ? `
                <div>
                  <p style="font-weight: 500; color: #4b5563; margin-bottom: 10px;">Recetas:</p>
                  <div style="display: grid; gap: 10px;">
                    ${diagnostico.recetas.map(receta => `
                      <div style="padding: 12px; background: #f0fdf4; border-radius: 6px; border-left: 4px solid #10b981;">
                        <p style="font-weight: 500; color: #065f46; margin-bottom: 5px;">${receta.medicamento?.nombre || 'Medicamento no especificado'}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                          <p><strong>Dosis:</strong> ${receta.dosis || 'No especificada'}</p>
                          <p><strong>Duración:</strong> ${receta.duracion || 'No especificada'}</p>
                        </div>
                        ${receta.instrucciones ? `<p style="margin-top: 5px;"><strong>Instrucciones:</strong> ${receta.instrucciones}</p>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
                ` : `
                <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; text-align: center; color: #6b7280;">
                  No se registraron recetas para este diagnóstico
                </div>
                `}
              </div>
            `).join('') : `
            <div style="padding: 20px; background: #f3f4f6; border-radius: 8px; text-align: center; color: #6b7280;">
              No se registraron diagnósticos para esta cita
            </div>
          `}
        </div>

        <!-- Pie de página -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
          Documento generado automáticamente por el sistema médico
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
        pdf.save(`Cita_${citaData.id_cita}_${citaData.paciente.usuario.nombre}_${citaData.fecha}.pdf`);
        return true;
    } catch (error) {
        console.error('Error en generateCitaPDF:', error);
        throw error;
    }
};