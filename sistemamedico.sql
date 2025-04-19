-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2025 a las 17:54:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemamedico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agendas`
--

CREATE TABLE `agendas` (
  `id_agenda` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `disponible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agendas`
--

INSERT INTO `agendas` (`id_agenda`, `id_medico`, `fecha`, `hora_inicio`, `hora_fin`, `disponible`) VALUES
(1, 1, '2024-04-15', '09:00:00', '17:00:00', 1),
(2, 1, '2024-04-16', '09:00:00', '17:00:00', 1),
(3, 2, '2024-04-15', '08:00:00', '16:00:00', 1),
(4, 2, '2024-04-16', '08:00:00', '16:00:00', 1),
(5, 3, '2024-04-15', '08:00:00', '14:00:00', 1),
(6, 3, '2024-04-16', '08:00:00', '14:00:00', 1),
(7, 4, '2024-04-15', '14:00:00', '20:00:00', 1),
(8, 4, '2024-04-16', '14:00:00', '20:00:00', 1),
(9, 5, '2024-04-15', '09:00:00', '15:00:00', 1),
(10, 5, '2024-04-16', '09:00:00', '15:00:00', 1),
(11, 6, '2024-04-15', '10:00:00', '18:00:00', 1),
(12, 6, '2024-04-16', '10:00:00', '18:00:00', 1),
(13, 7, '2024-04-15', '07:00:00', '13:00:00', 1),
(14, 7, '2024-04-16', '07:00:00', '13:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda_cita`
--

CREATE TABLE `agenda_cita` (
  `id_agenda` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agenda_cita`
--

INSERT INTO `agenda_cita` (`id_agenda`, `id_cita`) VALUES
(1, 1),
(1, 3),
(3, 2),
(4, 5),
(5, 4),
(5, 6),
(7, 7),
(9, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `motivo` text DEFAULT NULL,
  `estado` enum('Programada','Completada','Cancelada') DEFAULT 'Programada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id_cita`, `id_paciente`, `id_medico`, `fecha`, `motivo`, `estado`) VALUES
(1, 1, 1, '2024-04-15 09:30:00', 'Control de presión arterial', 'Programada'),
(2, 2, 2, '2024-04-15 14:30:00', 'Erupción cutánea', 'Programada'),
(3, 3, 1, '2024-04-15 10:30:00', 'Control de glucemia', 'Programada'),
(4, 4, 3, '2024-04-15 09:00:00', 'Revisión pediátrica anual', 'Programada'),
(5, 5, 4, '2024-04-15 15:00:00', 'Cefalea persistente', 'Programada'),
(6, 6, 5, '2024-04-15 10:00:00', 'Control prenatal', 'Programada'),
(7, 7, 6, '2024-04-15 11:00:00', 'Revisión de la vista', 'Programada'),
(8, 8, 7, '2024-04-15 12:00:00', 'Dolor en rodilla derecha', 'Programada'),
(9, 9, 1, '2024-03-10 09:30:00', 'Control de presión arterial', 'Completada'),
(10, 10, 2, '2024-03-12 14:30:00', 'Erupción cutánea', 'Completada'),
(11, 1, 1, '2024-03-15 10:30:00', 'Control de glucemia', 'Completada'),
(12, 2, 3, '2024-03-17 09:00:00', 'Fiebre alta', 'Completada'),
(13, 3, 4, '2024-03-18 15:00:00', 'Dolor de cabeza', 'Completada'),
(14, 4, 5, '2024-03-20 10:00:00', 'Dolor abdominal', 'Completada'),
(15, 5, 6, '2024-03-22 11:00:00', 'Visión borrosa', 'Completada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `id_diagnostico` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` text NOT NULL,
  `tratamiento` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diagnosticos`
--

INSERT INTO `diagnosticos` (`id_diagnostico`, `id_cita`, `id_medico`, `fecha`, `descripcion`, `tratamiento`) VALUES
(1, 9, 1, '2024-03-10 10:00:00', 'Hipertensión arterial controlada', 'Continuar con medicación actual y dieta baja en sodio'),
(2, 10, 2, '2024-03-12 15:00:00', 'Dermatitis de contacto', 'Aplicación de crema con hidrocortisona y evitar alérgenos'),
(3, 11, 1, '2024-03-15 11:00:00', 'Diabetes mellitus tipo 2 en rango', 'Mantener dieta y ejercicio, continuar con metformina'),
(4, 12, 3, '2024-03-17 09:30:00', 'Amigdalitis aguda', 'Antibiótico, reposo y abundantes líquidos'),
(5, 13, 4, '2024-03-18 15:30:00', 'Migraña', 'Analgésicos y ambiente tranquilo sin estimulación luminosa'),
(6, 14, 5, '2024-03-20 10:30:00', 'Gastritis aguda', 'Dieta blanda, omeprazol y evitar irritantes'),
(7, 15, 6, '2024-03-22 11:30:00', 'Conjuntivitis alérgica', 'Gotas oftálmicas antihistamínicas y evitar alérgenos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico_enfermedad`
--

CREATE TABLE `diagnostico_enfermedad` (
  `id_diagnostico` int(11) NOT NULL,
  `id_enfermedad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diagnostico_enfermedad`
--

INSERT INTO `diagnostico_enfermedad` (`id_diagnostico`, `id_enfermedad`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 5),
(5, 4),
(6, 6),
(7, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico_prueba`
--

CREATE TABLE `diagnostico_prueba` (
  `id_diagnostico` int(11) NOT NULL,
  `id_prueba` int(11) NOT NULL,
  `estado` enum('Pendiente','En proceso','Realizada','Cancelada') DEFAULT 'Pendiente',
  `resultado` text DEFAULT NULL,
  `fecha_resultado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diagnostico_prueba`
--

INSERT INTO `diagnostico_prueba` (`id_diagnostico`, `id_prueba`, `estado`, `resultado`, `fecha_resultado`) VALUES
(1, 2, 'Realizada', 'Valores dentro de rangos normales', '2024-03-11 14:00:00'),
(1, 4, 'Pendiente', NULL, NULL),
(2, 9, 'Pendiente', NULL, NULL),
(3, 2, 'Realizada', 'Glucemia en ayunas: 125 mg/dl', '2024-03-16 15:00:00'),
(5, 1, 'Realizada', 'No se observan anomalías estructurales', '2024-03-20 10:00:00'),
(6, 5, 'Realizada', 'Mucosa gástrica con eritema difuso', '2024-03-21 11:00:00'),
(7, 9, 'Realizada', 'Positivo para alérgenos ambientales', '2024-03-23 09:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedades`
--

CREATE TABLE `enfermedades` (
  `id_enfermedad` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `codigo_cie` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermedades`
--

INSERT INTO `enfermedades` (`id_enfermedad`, `nombre`, `descripcion`, `codigo_cie`) VALUES
(1, 'Hipertensión arterial', 'Presión arterial elevada de forma sostenida', 'I10'),
(2, 'Dermatitis atópica', 'Enfermedad inflamatoria de la piel', 'L20'),
(3, 'Diabetes mellitus tipo 2', 'Trastorno metabólico caracterizado por niveles elevados de glucosa', 'E11'),
(4, 'Migraña', 'Cefalea recurrente e intensa', 'G43'),
(5, 'Asma bronquial', 'Enfermedad respiratoria crónica caracterizada por inflamación de las vías aéreas', 'J45'),
(6, 'Gastritis', 'Inflamación de la mucosa gástrica', 'K29'),
(7, 'Rinitis alérgica', 'Inflamación de la mucosa nasal debido a alérgenos', 'J30'),
(8, 'Osteoartritis', 'Enfermedad degenerativa de las articulaciones', 'M15-M19'),
(9, 'Ansiedad generalizada', 'Trastorno de ansiedad caracterizado por preocupación excesiva', 'F41.1'),
(10, 'Hipotiroidismo', 'Producción insuficiente de hormonas tiroideas', 'E03'),
(11, 'Infección urinaria', 'Infección que afecta al tracto urinario', 'N39.0'),
(12, 'Dermatitis seborreica', 'Inflamación crónica de la piel en zonas ricas en glándulas sebáceas', 'L21'),
(13, 'Insomnio', 'Dificultad para conciliar o mantener el sueño', 'G47.0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad_medicamento`
--

CREATE TABLE `enfermedad_medicamento` (
  `id_enfermedad` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `dosificacion` varchar(100) DEFAULT NULL,
  `indicaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermedad_medicamento`
--

INSERT INTO `enfermedad_medicamento` (`id_enfermedad`, `id_medicamento`, `dosificacion`, `indicaciones`) VALUES
(1, 1, '10mg una vez al día', 'Tomar por la mañana con el estómago vacío'),
(2, 2, '1% dos veces al día', 'Aplicar una capa fina en áreas afectadas'),
(3, 3, '850mg dos veces al día', 'Tomar después del desayuno y la cena'),
(4, 3, '500mg cada 8 horas', 'Tomar después de las comidas durante 7 días'),
(5, 4, '2 inhalaciones cada 6 horas', 'Usar cuando sea necesario para aliviar síntomas'),
(6, 5, '20mg una vez al día', 'Tomar en ayunas, 30 minutos antes del desayuno'),
(7, 6, '10mg una vez al día', 'Tomar preferentemente por la mañana'),
(8, 7, '50mg cada 8 horas', 'Tomar con las comidas para evitar irritación gástrica'),
(9, 8, '0.5mg dos veces al día', 'No consumir alcohol durante el tratamiento'),
(10, 9, '50mcg una vez al día', 'Tomar en ayunas, 30 minutos antes del desayuno'),
(11, 10, '500mg cada 12 horas', 'Tomar con abundante agua, separado de lácteos'),
(12, 11, 'Aplicar dos veces por semana', 'Dejar actuar 3-5 minutos antes de enjuagar'),
(13, 12, '1mg antes de acostarse', 'Tomar 30 minutos antes de ir a dormir');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historiales`
--

CREATE TABLE `historiales` (
  `id_historial` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `antecedentes` text DEFAULT NULL,
  `alergias` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historiales`
--

INSERT INTO `historiales` (`id_historial`, `id_paciente`, `fecha_creacion`, `antecedentes`, `alergias`) VALUES
(1, 1, '2024-01-15', 'Hipertensión arterial diagnosticada en 2020', 'Penicilina'),
(2, 2, '2024-01-16', 'Asma desde la infancia', 'Polen, ácaros'),
(3, 3, '2024-01-17', 'Diabetes tipo 2 diagnosticada en 2019', 'Ninguna conocida'),
(4, 4, '2024-02-10', 'Migraña crónica', 'Aspirina'),
(5, 5, '2024-02-12', 'Operación de apendicitis en 2018', 'Látex'),
(6, 6, '2024-02-14', 'Problemas de visión desde la infancia', 'Ninguna conocida'),
(7, 7, '2024-02-16', 'Fractura de tobillo en 2020', 'Sulfamidas'),
(8, 8, '2024-02-18', 'Trastorno de ansiedad diagnosticado en 2019', 'Frutos secos'),
(9, 9, '2024-02-20', 'Problemas renales crónicos', 'Contraste yodado'),
(10, 10, '2024-02-22', 'Colesterol alto', 'Penicilina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_diagnostico`
--

CREATE TABLE `historial_diagnostico` (
  `id_historial` int(11) NOT NULL,
  `id_diagnostico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial_diagnostico`
--

INSERT INTO `historial_diagnostico` (`id_historial`, `id_diagnostico`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id_medicamento` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `principio_activo` varchar(100) NOT NULL,
  `concentracion` varchar(50) DEFAULT NULL,
  `presentacion` varchar(50) DEFAULT NULL,
  `via_administracion` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `requiere_receta` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`id_medicamento`, `nombre`, `principio_activo`, `concentracion`, `presentacion`, `via_administracion`, `descripcion`, `requiere_receta`) VALUES
(1, 'Enalapril', 'Enalapril maleato', '10mg', 'Tabletas', 'Oral', 'Inhibidor de la ECA para tratar la hipertensión arterial', 1),
(2, 'Hidrocortisona', 'Hidrocortisona', '1%', 'Crema', 'Tópica', 'Corticosteroide para tratar inflamación cutánea', 0),
(3, 'Metformina', 'Metformina clorhidrato', '850mg', 'Tabletas', 'Oral', 'Antidiabético oral para controlar la glucemia', 1),
(4, 'Ibuprofeno', 'Ibuprofeno', '600mg', 'Tabletas', 'Oral', 'Antiinflamatorio no esteroideo utilizado para tratar dolor e inflamación', 0),
(5, 'Paracetamol', 'Paracetamol', '500mg', 'Tabletas', 'Oral', 'Analgésico y antipirético', 0),
(6, 'Amoxicilina', 'Amoxicilina trihidrato', '500mg', 'Cápsulas', 'Oral', 'Antibiótico de amplio espectro', 1),
(7, 'Salbutamol', 'Salbutamol sulfato', '100mcg/dosis', 'Inhalador', 'Inhalatoria', 'Broncodilatador para el tratamiento del asma', 1),
(8, 'Omeprazol', 'Omeprazol', '20mg', 'Cápsulas', 'Oral', 'Inhibidor de la bomba de protones para reducir la producción de ácido gástrico', 0),
(9, 'Loratadina', 'Loratadina', '10mg', 'Tabletas', 'Oral', 'Antihistamínico para aliviar síntomas de alergia', 0),
(10, 'Diclofenaco', 'Diclofenaco sódico', '50mg', 'Tabletas', 'Oral', 'Antiinflamatorio no esteroideo para dolor e inflamación', 1),
(11, 'Alprazolam', 'Alprazolam', '0.5mg', 'Tabletas', 'Oral', 'Benzodiazepina para trastornos de ansiedad', 1),
(12, 'Levotiroxina', 'Levotiroxina sódica', '50mcg', 'Tabletas', 'Oral', 'Hormona tiroidea sintética para tratar el hipotiroidismo', 1),
(13, 'Ciprofloxacino', 'Ciprofloxacino clorhidrato', '500mg', 'Tabletas', 'Oral', 'Antibiótico fluoroquinolona', 1),
(14, 'Ketoconazol', 'Ketoconazol', '2%', 'Champú', 'Tópica', 'Antifúngico para dermatitis seborreica', 0),
(15, 'Melatonina', 'Melatonina', '1mg', 'Tabletas', 'Oral', 'Hormona para regular el ciclo de sueño', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id_medico` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `numero_colegiado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id_medico`, `id_usuario`, `especialidad`, `numero_colegiado`) VALUES
(1, 1, 'Cardiología', 'MED-12345'),
(2, 2, 'Dermatología', 'MED-23456'),
(3, 6, 'Pediatría', 'MED-34567'),
(4, 7, 'Neurología', 'MED-45678'),
(5, 8, 'Ginecología', 'MED-56789'),
(6, 9, 'Oftalmología', 'MED-67890'),
(7, 10, 'Traumatología', 'MED-78901'),
(8, 11, 'Psiquiatría', 'MED-89012'),
(9, 12, 'Urología', 'MED-90123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` enum('M','F','Otro') NOT NULL,
  `direccion` text DEFAULT NULL,
  `grupo_sanguineo` varchar(5) DEFAULT NULL,
  `seguro_medico` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `id_usuario`, `fecha_nacimiento`, `genero`, `direccion`, `grupo_sanguineo`, `seguro_medico`) VALUES
(1, 3, '1985-06-15', 'M', 'Calle Principal 123', 'O+', 'Seguro Nacional'),
(2, 4, '1990-03-22', 'F', 'Avenida Central 456', 'A-', 'Seguro Privado'),
(3, 5, '1978-12-03', 'M', 'Plaza Mayor 789', 'B+', 'Sin seguro'),
(4, 13, '1992-04-18', 'M', 'Calle Secundaria 234', 'A+', 'Seguro Nacional'),
(5, 14, '1980-08-25', 'F', 'Avenida Norte 567', 'B-', 'Seguro Privado'),
(6, 15, '1975-12-10', 'M', 'Callejón Sur 890', 'AB+', 'Sin seguro'),
(7, 16, '1988-03-05', 'F', 'Plaza del Sol 123', 'O-', 'Seguro Internacional'),
(8, 17, '1995-07-22', 'M', 'Calle del Mar 456', 'A+', 'Seguro Nacional'),
(9, 18, '1983-11-14', 'F', 'Avenida de la Luna 789', 'AB-', 'Seguro Privado'),
(10, 19, '1970-02-28', 'M', 'Paseo del Río 012', 'O+', 'Sin seguro'),
(11, 20, '1990-09-17', 'F', 'Boulevard Central 345', 'B+', 'Seguro Nacional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pruebas`
--

CREATE TABLE `pruebas` (
  `id_prueba` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requiere_ayuno` tinyint(1) DEFAULT 0,
  `tiempo_resultados` int(11) DEFAULT NULL COMMENT 'Tiempo estimado en días'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pruebas`
--

INSERT INTO `pruebas` (`id_prueba`, `nombre`, `descripcion`, `requiere_ayuno`, `tiempo_resultados`) VALUES
(1, 'Análisis de sangre', 'Medición de niveles de glucosa, colesterol, etc.', 1, 1),
(2, 'Electrocardiograma', 'Registro de la actividad eléctrica del corazón', 0, 1),
(3, 'Biopsia cutánea', 'Extracción de muestra de piel para análisis', 0, 5),
(4, 'Resonancia magnética', 'Técnica de imagen que utiliza campos magnéticos para visualizar órganos y estructuras', 0, 3),
(5, 'Tomografía computarizada', 'Técnica de imagen que utiliza rayos X para obtener cortes transversales del cuerpo', 0, 2),
(6, 'Ecografía abdominal', 'Técnica de imagen que utiliza ultrasonidos para visualizar órganos abdominales', 1, 1),
(7, 'Prueba de esfuerzo', 'Examen para evaluar cómo responde el corazón durante el ejercicio físico', 0, 1),
(8, 'Espirometría', 'Prueba para evaluar la función pulmonar', 0, 1),
(9, 'Colonoscopia', 'Examen del colon mediante un endoscopio', 1, 2),
(10, 'Densitometría ósea', 'Prueba para medir la densidad mineral ósea', 0, 2),
(11, 'Electroencefalograma', 'Registro de la actividad eléctrica cerebral', 0, 3),
(12, 'Test de alergia cutánea', 'Prueba para identificar alergias', 0, 1),
(13, 'Holter cardíaco', 'Monitorización continua del ritmo cardíaco durante 24-48 horas', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `id_receta` int(11) NOT NULL,
  `id_diagnostico` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `dosis` varchar(50) NOT NULL,
  `frecuencia` varchar(50) NOT NULL,
  `duracion` varchar(50) NOT NULL,
  `instrucciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id_receta`, `id_diagnostico`, `id_medicamento`, `dosis`, `frecuencia`, `duracion`, `instrucciones`) VALUES
(1, 1, 1, '10mg', '1 vez al día', '30 días', 'Tomar por la mañana con el estómago vacío'),
(2, 2, 3, '1%', '2 veces al día', '7 días', 'Aplicar en áreas afectadas'),
(3, 3, 2, '850mg', '2 veces al día', '30 días', 'Tomar después del desayuno y la cena'),
(4, 4, 3, '500mg', '3 veces al día', '10 días', 'Tomar con las comidas'),
(5, 5, 4, '600mg', '3 veces al día', '3 días', 'Tomar con alimentos en caso de molestias estomacales'),
(6, 6, 5, '20mg', '1 vez al día', '14 días', 'Tomar antes del desayuno'),
(7, 7, 6, '10mg', '1 vez al día', '15 días', 'Tomar por la mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_registro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `email`, `telefono`, `fecha_registro`) VALUES
(1, 'Juan', 'García López', 'juan.garcia@email.com', '555-123-4567', '2024-01-10'),
(2, 'Ana', 'Martínez Ruiz', 'ana.martinez@email.com', '555-234-5678', '2024-01-11'),
(3, 'Carlos', 'Rodríguez Pérez', 'carlos.rodriguez@email.com', '555-345-6789', '2024-01-12'),
(4, 'María', 'López Sánchez', 'maria.lopez@email.com', '555-456-7890', '2024-01-13'),
(5, 'Pedro', 'González Torres', 'pedro.gonzalez@email.com', '555-567-8901', '2024-01-14'),
(6, 'Roberto', 'Fernández García', 'roberto.fernandez@email.com', '555-678-9012', '2024-01-21'),
(7, 'Patricia', 'González Ruiz', 'patricia.gonzalez@email.com', '555-789-0123', '2024-01-22'),
(8, 'Miguel', 'Sánchez Vidal', 'miguel.sanchez@email.com', '555-890-1234', '2024-01-23'),
(9, 'Laura', 'Martín Jiménez', 'laura.martin@email.com', '555-901-2345', '2024-01-24'),
(10, 'Daniel', 'López Castro', 'daniel.lopez@email.com', '555-012-3456', '2024-01-25'),
(11, 'Carmen', 'Rodríguez Gil', 'carmen.rodriguez@email.com', '555-123-4567', '2024-01-26'),
(12, 'Javier', 'Díaz Moreno', 'javier.diaz@email.com', '555-234-5678', '2024-01-27'),
(13, 'Elena', 'Pérez Santos', 'elena.perez@email.com', '555-345-6789', '2024-01-28'),
(14, 'Francisco', 'Torres Cruz', 'francisco.torres@email.com', '555-456-7890', '2024-01-29'),
(15, 'Sofía', 'Álvarez Ortega', 'sofia.alvarez@email.com', '555-567-8901', '2024-01-30'),
(16, 'Alejandro', 'Hernández Serrano', 'alejandro.hernandez@email.com', '555-678-9012', '2024-02-01'),
(17, 'Lucía', 'Gómez Velasco', 'lucia.gomez@email.com', '555-789-0123', '2024-02-02'),
(18, 'Pablo', 'Sanz Marín', 'pablo.sanz@email.com', '555-890-1234', '2024-02-03'),
(19, 'Isabel', 'Romero Blanco', 'isabel.romero@email.com', '555-901-2345', '2024-02-04'),
(20, 'David', 'Castro Molina', 'david.castro@email.com', '555-012-3456', '2024-02-05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id_agenda`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `agenda_cita`
--
ALTER TABLE `agenda_cita`
  ADD PRIMARY KEY (`id_agenda`,`id_cita`),
  ADD KEY `id_cita` (`id_cita`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD PRIMARY KEY (`id_diagnostico`),
  ADD KEY `id_cita` (`id_cita`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `diagnostico_enfermedad`
--
ALTER TABLE `diagnostico_enfermedad`
  ADD PRIMARY KEY (`id_diagnostico`,`id_enfermedad`),
  ADD KEY `id_enfermedad` (`id_enfermedad`);

--
-- Indices de la tabla `diagnostico_prueba`
--
ALTER TABLE `diagnostico_prueba`
  ADD PRIMARY KEY (`id_diagnostico`,`id_prueba`),
  ADD KEY `id_prueba` (`id_prueba`);

--
-- Indices de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  ADD PRIMARY KEY (`id_enfermedad`);

--
-- Indices de la tabla `enfermedad_medicamento`
--
ALTER TABLE `enfermedad_medicamento`
  ADD PRIMARY KEY (`id_enfermedad`,`id_medicamento`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `historiales`
--
ALTER TABLE `historiales`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `historial_diagnostico`
--
ALTER TABLE `historial_diagnostico`
  ADD PRIMARY KEY (`id_historial`,`id_diagnostico`),
  ADD KEY `id_diagnostico` (`id_diagnostico`);

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id_medicamento`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id_medico`),
  ADD UNIQUE KEY `numero_colegiado` (`numero_colegiado`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pruebas`
--
ALTER TABLE `pruebas`
  ADD PRIMARY KEY (`id_prueba`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `id_diagnostico` (`id_diagnostico`),
  ADD KEY `id_medicamento` (`id_medicamento`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id_agenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `enfermedades`
--
ALTER TABLE `enfermedades`
  MODIFY `id_enfermedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `historiales`
--
ALTER TABLE `historiales`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pruebas`
--
ALTER TABLE `pruebas`
  MODIFY `id_prueba` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id_receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agendas`
--
ALTER TABLE `agendas`
  ADD CONSTRAINT `agendas_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE;

--
-- Filtros para la tabla `agenda_cita`
--
ALTER TABLE `agenda_cita`
  ADD CONSTRAINT `agenda_cita_ibfk_1` FOREIGN KEY (`id_agenda`) REFERENCES `agendas` (`id_agenda`) ON DELETE CASCADE,
  ADD CONSTRAINT `agenda_cita_ibfk_2` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`) ON DELETE CASCADE;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE CASCADE,
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE;

--
-- Filtros para la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD CONSTRAINT `diagnosticos_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`) ON DELETE CASCADE,
  ADD CONSTRAINT `diagnosticos_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE;

--
-- Filtros para la tabla `diagnostico_enfermedad`
--
ALTER TABLE `diagnostico_enfermedad`
  ADD CONSTRAINT `diagnostico_enfermedad_ibfk_1` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnosticos` (`id_diagnostico`) ON DELETE CASCADE,
  ADD CONSTRAINT `diagnostico_enfermedad_ibfk_2` FOREIGN KEY (`id_enfermedad`) REFERENCES `enfermedades` (`id_enfermedad`) ON DELETE CASCADE;

--
-- Filtros para la tabla `diagnostico_prueba`
--
ALTER TABLE `diagnostico_prueba`
  ADD CONSTRAINT `diagnostico_prueba_ibfk_1` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnosticos` (`id_diagnostico`) ON DELETE CASCADE,
  ADD CONSTRAINT `diagnostico_prueba_ibfk_2` FOREIGN KEY (`id_prueba`) REFERENCES `pruebas` (`id_prueba`) ON DELETE CASCADE;

--
-- Filtros para la tabla `enfermedad_medicamento`
--
ALTER TABLE `enfermedad_medicamento`
  ADD CONSTRAINT `enfermedad_medicamento_ibfk_1` FOREIGN KEY (`id_enfermedad`) REFERENCES `enfermedades` (`id_enfermedad`) ON DELETE CASCADE,
  ADD CONSTRAINT `enfermedad_medicamento_ibfk_2` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_medicamento`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historiales`
--
ALTER TABLE `historiales`
  ADD CONSTRAINT `historiales_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_diagnostico`
--
ALTER TABLE `historial_diagnostico`
  ADD CONSTRAINT `historial_diagnostico_ibfk_1` FOREIGN KEY (`id_historial`) REFERENCES `historiales` (`id_historial`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_diagnostico_ibfk_2` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnosticos` (`id_diagnostico`) ON DELETE CASCADE;

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnosticos` (`id_diagnostico`) ON DELETE CASCADE,
  ADD CONSTRAINT `recetas_ibfk_2` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_medicamento`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
