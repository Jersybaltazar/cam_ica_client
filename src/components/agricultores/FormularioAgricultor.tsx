import { agricultoresService } from "@/hooks/agricultoreshook";
import { useEffect, useState } from "react";
import { Agricultor } from "@/types";
import { FaCalendarAlt, FaUserAlt, FaMapMarkerAlt, FaCertificate, FaSeedling, FaLeaf } from "react-icons/fa";

interface FormularioAgricultorProps {
  agricultor: Agricultor | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const FormularioAgricultor: React.FC<FormularioAgricultorProps> = ({ agricultor, onCancel, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'cultivos', 'ubicacion', 'certificaciones', 'tecnica', 'sostenibilidad'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estado del formulario con todos los campos requeridos
  const [formData, setFormData] = useState({
    // Datos personales
    dni: '',
    fecha_censo: new Date().toISOString().split('T')[0],
    apellidos: '',
    nombres: '',
    nombre_completo: '',
    sexo: 'HOMBRE',
    edad: '',

    // Cultivos
    esparrago: 'NO',
    granada: 'NO',
    maiz: 'NO',
    palta: 'NO',
    papa: 'NO',
    pecano: 'NO',
    vid: 'NO',

    // Ubicación
    dpto: '',
    provincia: '',
    distrito: '',
    centro_poblado: '',
    ubicacion_completa: '',

    // Certificaciones
    senasa: 'NO',
    sispa: 'NO',
    codigo_autogene_sispa: '',
    regimen_tenencia_sispa: '',
    area_total_declarada: '',
    fecha_actualizacion_sispa: '',

    // Información técnica
    toma: '',
    edad_cultivo: '',
    total_ha_sembrada: '',
    productividad_x_ha: '',
    tipo_riego: '',
    nivel_alcance_venta: 'LOCAL',
    jornales_por_ha: '',

    // Prácticas sostenibles
    practica_economica_sost: '',
    porcentaje_prac_economica_sost: ''
  });

  // Inicializar formulario con datos del agricultor si es edición
  useEffect(() => {
    if (agricultor) {
      setFormData({
        // Datos personales
        dni: agricultor.dni || '',
        fecha_censo: agricultor.fecha_censo || new Date().toISOString().split('T')[0],
        apellidos: agricultor.apellidos || '',
        nombres: agricultor.nombres || '',
        nombre_completo: agricultor.nombre_completo || '',
        sexo: agricultor.sexo || 'HOMBRE',
        edad: agricultor.edad?.toString() || '',

        // Cultivos
        esparrago: agricultor.esparrago || 'NO',
        granada: agricultor.granada || 'NO',
        maiz: agricultor.maiz || 'NO',
        palta: agricultor.palta || 'NO',
        papa: agricultor.papa || 'NO',
        pecano: agricultor.pecano || 'NO',
        vid: agricultor.vid || 'NO',

        // Ubicación
        dpto: agricultor.dpto || '',
        provincia: agricultor.provincia || '',
        distrito: agricultor.distrito || '',
        centro_poblado: agricultor.centro_poblado || '',
        ubicacion_completa: agricultor.ubicacion_completa || '',

        // Certificaciones
        senasa: agricultor.senasa || 'NO',
        sispa: agricultor.sispa || 'NO',
        codigo_autogene_sispa: agricultor.codigo_autogene_sispa || '',
        regimen_tenencia_sispa: agricultor.regimen_tenencia_sispa || '',
        area_total_declarada: agricultor.area_total_declarada?.toString() || '',
        fecha_actualizacion_sispa: agricultor.fecha_actualizacion_sispa || '',

        // Información técnica
        toma: agricultor.toma || '',
        edad_cultivo: agricultor.edad_cultivo?.toString() || '',
        total_ha_sembrada: agricultor.total_ha_sembrada?.toString() || '',
        productividad_x_ha: agricultor.productividad_x_ha?.toString() || '',
        tipo_riego: agricultor.tipo_riego || '',
        nivel_alcance_venta: agricultor.nivel_alcance_venta || 'LOCAL',
        jornales_por_ha: agricultor.jornales_por_ha?.toString() || '',

        // Prácticas sostenibles
        practica_economica_sost: agricultor.practica_economica_sost || '',
        porcentaje_prac_economica_sost: agricultor.porcentaje_prac_economica_sost?.toString() || ''
      });
    }
  }, [agricultor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Si se actualiza nombres o apellidos, actualizar nombre_completo
    if (name === 'nombres' || name === 'apellidos') {
      setFormData(prev => ({
        ...prev,
        nombre_completo: `${name === 'nombres' ? value : prev.nombres} ${name === 'apellidos' ? value : prev.apellidos}`.trim()
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked ? 'SÍ' : 'NO'
    }));
  };
  // Función para determinar cultivos activos basado en los campos de cultivo
  const determineCultivosActivos = (): string[] => {
    const cultivos = [];

    if (formData.esparrago === 'SÍ') cultivos.push('ESPARRAGO');
    if (formData.granada === 'SÍ') cultivos.push('GRANADA');
    if (formData.maiz === 'SÍ') cultivos.push('MAIZ');
    if (formData.palta === 'SÍ') cultivos.push('PALTA');
    if (formData.papa === 'SÍ') cultivos.push('PAPA');
    if (formData.pecano === 'SÍ') cultivos.push('PECANO');
    if (formData.vid === 'SÍ') cultivos.push('VID');

    return cultivos;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convertir datos de texto a números/booleanos según corresponda
      const agricultorData: Agricultor = {
        ...formData,
        edad: formData.edad ? parseInt(formData.edad) : 0,
        area_total_declarada: formData.area_total_declarada ? parseFloat(formData.area_total_declarada) : null,
        total_ha_sembrada: formData.total_ha_sembrada ? parseFloat(formData.total_ha_sembrada) : 0,
        productividad_x_ha: formData.productividad_x_ha ? parseFloat(formData.productividad_x_ha) : null,
        jornales_por_ha: formData.jornales_por_ha ? parseFloat(formData.jornales_por_ha) : null,
        edad_cultivo: formData.edad_cultivo || '',
        tiene_practicas_sostenibles: formData.practica_economica_sost ? true : false,
        porcentaje_prac_economica_sost: formData.porcentaje_prac_economica_sost || '',
        cultivos_activos: determineCultivosActivos()
      };

      if (agricultor?.id) {
        // Modo edición
        await agricultoresService.updateAgricultor(agricultor.id, agricultorData);
      } else {
        // Modo creación
        await agricultoresService.createAgricultor(agricultorData);
      }

      onSuccess();
    } catch (err) {
      console.error('Error al guardar agricultor:', err);
      setError('Ocurrió un error al guardar los datos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Función para determinar si podemos avanzar a la siguiente pestaña
  const canProceed = () => {
    switch (activeTab) {
      case 'personal':
        return formData.dni && formData.nombres && formData.apellidos;
      case 'cultivos':
        return true; // Siempre se puede avanzar si hay al menos un cultivo como "NO"
      case 'ubicacion':
        return formData.dpto && formData.provincia && formData.distrito;
      case 'certificaciones':
        return true; // Opcional
      case 'tecnica':
        return true; // Opcional
      case 'sostenibilidad':
        return true; // Opcional
      default:
        return false;
    }
  };

  // Tabs de navegación
  const renderTabs = () => (
    <div className="flex flex-wrap border-b border-gray-200 mb-6">
      <button
        onClick={() => setActiveTab('personal')}
        className={`px-4 py-2 font-medium ${activeTab === 'personal' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
      >
        <FaUserAlt className="inline mr-2" />
        Datos Personales
      </button>
      <button
        onClick={() => setActiveTab('cultivos')}
        className={`px-4 py-2 font-medium ${activeTab === 'cultivos' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
        disabled={!formData.dni || !formData.nombres || !formData.apellidos}
      >
        <FaSeedling className="inline mr-2" />
        Cultivos
      </button>
      <button
        onClick={() => setActiveTab('ubicacion')}
        className={`px-4 py-2 font-medium ${activeTab === 'ubicacion' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
      >
        <FaMapMarkerAlt className="inline mr-2" />
        Ubicación
      </button>
      <button
        onClick={() => setActiveTab('certificaciones')}
        className={`px-4 py-2 font-medium ${activeTab === 'certificaciones' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
      >
        <FaCertificate className="inline mr-2" />
        Certificaciones
      </button>
      <button
        onClick={() => setActiveTab('tecnica')}
        className={`px-4 py-2 font-medium ${activeTab === 'tecnica' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
      >
        <FaLeaf className="inline mr-2" />
        Info. Técnica
      </button>
      <button
        onClick={() => setActiveTab('sostenibilidad')}
        className={`px-4 py-2 font-medium ${activeTab === 'sostenibilidad' ? 'text-[#154E40] border-b-2 border-[#2DB292]' : 'text-gray-500'}`}
        style={{ fontFamily: 'Montserrat' }}
      >
        <FaLeaf className="inline mr-2" />
        Sostenibilidad
      </button>
    </div>
  );

  // Contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderDatosPersonales();
      case 'cultivos':
        return renderCultivos();
      case 'ubicacion':
        return renderUbicacion();
      case 'certificaciones':
        return renderCertificaciones();
      case 'tecnica':
        return renderInfoTecnica();
      case 'sostenibilidad':
        return renderSostenibilidad();
      default:
        return null;
    }
  };

  // Renderizado de los distintos formularios
  const renderDatosPersonales = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* DNI */}
      <div>
        <label
          htmlFor="dni"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          DNI <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          maxLength={8}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Número de documento (8 dígitos)"
        />
      </div>

      {/* Fecha de censo */}
      <div>
        <label
          htmlFor="fecha_censo"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Fecha de censo <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="fecha_censo"
          name="fecha_censo"
          value={formData.fecha_censo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
        />
      </div>

      {/* Nombres */}
      <div>
        <label
          htmlFor="nombres"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Nombres <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Nombres del agricultor"
        />
      </div>

      {/* Apellidos */}
      <div>
        <label
          htmlFor="apellidos"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Apellidos <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Apellidos del agricultor"
        />
      </div>

      {/* Nombre completo (automático) */}
      <div>
        <label
          htmlFor="nombre_completo"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Nombre completo <span className="text-gray-400">(Generado automáticamente)</span>
        </label>
        <input
          type="text"
          id="nombre_completo"
          name="nombre_completo"
          value={formData.nombre_completo}
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:outline-none"
          style={{ fontFamily: 'Montserrat' }}
        />
      </div>

      {/* Género */}
      <div>
        <label
          htmlFor="sexo"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Género
        </label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
        >
          <option value="HOMBRE">HOMBRE</option>
          <option value="MUJER">MUJER</option>

        </select>
      </div>

      {/* Edad */}
      <div>
        <label
          htmlFor="edad"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Edad
        </label>
        <input
          type="number"
          id="edad"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          min="0"
          max="120"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Edad en años"
        />
      </div>
    </div>
  );

  const renderCultivos = () => (
    <div>
      <p className="mb-4 text-gray-600" style={{ fontFamily: 'Montserrat' }}>
        Seleccione los cultivos que maneja el agricultor:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Espárrago */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="esparrago"
              checked={formData.esparrago === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Espárrago</span>
            </div>
          </label>
        </div>

        {/* Granada */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="granada"
              checked={formData.granada === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Granada</span>
            </div>
          </label>
        </div>

        {/* Maíz */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="maiz"
              checked={formData.maiz === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Maíz</span>
            </div>
          </label>
        </div>

        {/* Palta */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="palta"
              checked={formData.palta === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Palta</span>
            </div>
          </label>
        </div>

        {/* Papa */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="papa"
              checked={formData.papa === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Papa</span>
            </div>
          </label>
        </div>

        {/* Pecano */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="pecano"
              checked={formData.pecano === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Pecano</span>
            </div>
          </label>
        </div>

        {/* Vid */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="vid"
              checked={formData.vid === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Vid</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderUbicacion = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Departamento */}
      <div>
        <label
          htmlFor="dpto"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Departamento <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dpto"
          name="dpto"
          value={formData.dpto}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: ICA"
        />
      </div>

      {/* Provincia */}
      <div>
        <label
          htmlFor="provincia"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Provincia <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="provincia"
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: ICA"
        />
      </div>

      {/* Distrito */}
      <div>
        <label
          htmlFor="distrito"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Distrito <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="distrito"
          name="distrito"
          value={formData.distrito}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: SUBTANJALLA"
        />
      </div>

      {/* Centro Poblado */}
      <div>
        <label
          htmlFor="centro_poblado"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Centro Poblado
        </label>
        <input
          type="text"
          id="centro_poblado"
          name="centro_poblado"
          value={formData.centro_poblado || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Centro poblado (opcional)"
        />
      </div>
    </div>
  );

  const renderCertificaciones = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Montserrat', color: '#154E40' }}>Certificaciones</h3>
        <p className="text-gray-600" style={{ fontFamily: 'Montserrat' }}>
          Indique si el agricultor cuenta con certificaciones SENASA y/o SISPA:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* SENASA */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="senasa"
              checked={formData.senasa === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Certificación SENASA</span>
              <span className="block text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>Servicio Nacional de Sanidad Agraria</span>
            </div>
          </label>
        </div>

        {/* SISPA */}
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="sispa"
              checked={formData.sispa === 'SÍ'}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 text-[#2DB292] rounded focus:ring-[#154E40]"
            />
            <div className="ml-3">
              <span className="block font-medium text-gray-700" style={{ fontFamily: 'Montserrat' }}>Certificación SISPA</span>
              <span className="block text-sm text-gray-500" style={{ fontFamily: 'Montserrat' }}>Sistema de Información de Sanidad y Producción Agraria</span>
            </div>
          </label>
        </div>
      </div>

      {/* Información adicional SISPA (visible solo si SISPA está seleccionado) */}
      {formData.sispa === 'SÍ' && (
        <div className="mt-6 border-t pt-6">
          <h4 className="font-medium mb-4" style={{ fontFamily: 'Montserrat', color: '#2DB292' }}>
            Información adicional SISPA
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Código autogenerado SISPA */}
            <div>
              <label
                htmlFor="codigo_autogene_sispa"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Montserrat' }}
              >
                Código autogenerado SISPA
              </label>
              <input
                type="text"
                id="codigo_autogene_sispa"
                name="codigo_autogene_sispa"
                value={formData.codigo_autogene_sispa || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
                style={{ fontFamily: 'Montserrat' }}
                placeholder="Ej: SISPA-00012345"
              />
            </div>

            {/* Régimen de tenencia SISPA */}
            <div>
              <label
                htmlFor="regimen_tenencia_sispa"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Montserrat' }}
              >
                Régimen de tenencia SISPA
              </label>
              <input
                type="text"
                id="regimen_tenencia_sispa"
                name="regimen_tenencia_sispa"
                value={formData.regimen_tenencia_sispa || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
                style={{ fontFamily: 'Montserrat' }}
                placeholder="Ej: PROPIETARIO"
              />
            </div>

            {/* Área total declarada */}
            <div>
              <label
                htmlFor="area_total_declarada"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Montserrat' }}
              >
                Área total declarada (ha)
              </label>
              <input
                type="number"
                step="0.01"
                id="area_total_declarada"
                name="area_total_declarada"
                value={formData.area_total_declarada || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
                style={{ fontFamily: 'Montserrat' }}
                placeholder="Ej: 5.25"
              />
            </div>

            {/* Fecha actualización SISPA */}
            <div>
              <label
                htmlFor="fecha_actualizacion_sispa"
                className="block text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: 'Montserrat' }}
              >
                Fecha de actualización SISPA
              </label>
              <input
                type="date"
                id="fecha_actualizacion_sispa"
                name="fecha_actualizacion_sispa"
                value={formData.fecha_actualizacion_sispa || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
                style={{ fontFamily: 'Montserrat' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInfoTecnica = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Toma */}
      <div>
        <label
          htmlFor="toma"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Toma
        </label>
        <input
          type="text"
          id="toma"
          name="toma"
          value={formData.toma || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Especifique la toma"
        />
      </div>

      {/* Edad del cultivo */}
      <div>
        <label
          htmlFor="edad_cultivo"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Edad del cultivo (años)
        </label>
        <input
          type="text"
          id="edad_cultivo"
          name="edad_cultivo"
          value={formData.edad_cultivo || ''}
          onChange={handleChange}
          min="0"
          step="1"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: 3"
        />
      </div>

      {/* Total hectáreas sembradas */}
      <div>
        <label
          htmlFor="total_ha_sembrada"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Total hectáreas sembradas
        </label>
        <input
          type="number"
          step="0.01"
          id="total_ha_sembrada"
          name="total_ha_sembrada"
          value={formData.total_ha_sembrada || ''}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: 2.5"
        />
      </div>

      {/* Productividad por hectárea */}
      <div>
        <label
          htmlFor="productividad_x_ha"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Productividad por hectárea (Ton/ha)
        </label>
        <input
          type="number"
          step="0.01"
          id="productividad_x_ha"
          name="productividad_x_ha"
          value={formData.productividad_x_ha || ''}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: 8.5"
        />
      </div>

      {/* Tipo de riego */}
      <div>
        <label
          htmlFor="tipo_riego"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Tipo de riego
        </label>
        <select
          id="tipo_riego"
          name="tipo_riego"
          value={formData.tipo_riego || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
        >
          <option value="">Seleccione un tipo</option>
          <option value="GRAVEDAD">GRAVEDAD</option>
          <option value="TECNIFICADO">TECNIFICADO</option>
          <option value="ASPERSIÓN">ASPERSIÓN</option>
          <option value="GOTEO">GOTEO</option>
          <option value="MIXTO">MIXTO</option>
        </select>
      </div>

      {/* Nivel de alcance de venta */}
      <div>
        <label
          htmlFor="nivel_alcance_venta"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Nivel de alcance de venta
        </label>
        <select
          id="nivel_alcance_venta"
          name="nivel_alcance_venta"
          value={formData.nivel_alcance_venta || 'LOCAL'}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
        >
          <option value="LOCAL">LOCAL</option>
          <option value="REGIONAL">REGIONAL</option>
          <option value="NACIONAL">NACIONAL</option>
          <option value="INTERNACIONAL">INTERNACIONAL</option>
        </select>
      </div>

      {/* Jornales por hectárea */}
      <div>
        <label
          htmlFor="jornales_por_ha"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Jornales por hectárea
        </label>
        <input
          type="number"
          step="0.1"
          id="jornales_por_ha"
          name="jornales_por_ha"
          value={formData.jornales_por_ha || ''}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Ej: 15.5"
        />
      </div>
    </div>
  );

  const renderSostenibilidad = () => (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="practica_economica_sost"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Práctica económica sostenible
        </label>
        <textarea
          id="practica_economica_sost"
          name="practica_economica_sost"
          value={formData.practica_economica_sost || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
          placeholder="Describa las prácticas económicas sostenibles implementadas"
        />
      </div>

      <div>
        <label
          htmlFor="porcentaje_prac_economica_sost"
          className="block text-sm font-medium text-gray-700 mb-1"
          style={{ fontFamily: 'Montserrat' }}
        >
          Porcentaje de implementación de prácticas sostenibles
        </label>
        <select
          id="porcentaje_prac_economica_sost"
          name="porcentaje_prac_economica_sost"
          value={formData.porcentaje_prac_economica_sost || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2DB292]"
          style={{ fontFamily: 'Montserrat' }}
        >
          <option value="">Seleccione un porcentaje</option>
          <option value="0 - 25%">0 - 25%</option>
          <option value="25 - 50%">25 - 50%</option>
          <option value="50 - 75%">50 - 75%</option>
          <option value="75 - 100%">75 - 100%</option>
        </select>
      </div>

      {/* Nota sobre prácticas sostenibles */}
      <div className="bg-gray-50 p-4 rounded-md border-l-4 border-[#2DB292]">
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Montserrat' }}>
          <strong>Nota:</strong> El campo "tiene_practicas_sostenibles" se establecerá automáticamente como <strong>verdadero</strong> si
          se ha ingresado una práctica económica sostenible.
        </p>
      </div>
    </div>
  );

  // Renderizado principal del componente
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: 'Omegle', color: '#154E40' }}
      >
        {agricultor ? 'Editar Agricultor' : 'Registrar Nuevo Agricultor'}
      </h2>

      {error && (
        <div
          className="mb-6 p-4 rounded-md bg-red-50 text-red-700 border border-red-200"
          style={{ fontFamily: 'Montserrat' }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Navegación por pestañas */}
        {renderTabs()}

        {/* Contenido del formulario según la pestaña activa */}
        <div className="py-4">
          {renderContent()}
        </div>

        {/* Botones de navegación y acciones */}
        <div className="mt-8 flex justify-between">
          <div>
            {activeTab !== 'personal' && (
              <button
                type="button"
                onClick={() => {
                  const tabs = ['personal', 'cultivos', 'ubicacion', 'certificaciones', 'tecnica', 'sostenibilidad'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
                className="px-6 py-2 border rounded-md mr-3"
                style={{
                  fontFamily: 'Montserrat',
                  borderColor: '#2DB292',
                  color: '#2DB292'
                }}
              >
                Anterior
              </button>
            )}

            {activeTab !== 'sostenibilidad' && (
              <button
                type="button"
                onClick={() => {
                  const tabs = ['personal', 'cultivos', 'ubicacion', 'certificaciones', 'tecnica', 'sostenibilidad'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1 && canProceed()) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-md ${canProceed() ? 'bg-[#2DB292] text-white' : 'bg-gray-200 text-gray-500'}`}
                style={{ fontFamily: 'Montserrat' }}
              >
                Siguiente
              </button>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border rounded-md"
              style={{
                fontFamily: 'Montserrat',
                borderColor: '#ECEBEB',
                color: '#333333'
              }}
            >
              Cancelar
            </button>

            {activeTab === 'sostenibilidad' && (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-md text-white flex items-center justify-center min-w-[120px]"
                style={{
                  fontFamily: 'Montserrat',
                  backgroundColor: '#154E40'
                }}
                onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#2DB292')}
                onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#154E40')}
              >
                {loading ? (
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  agricultor ? 'Actualizar' : 'Registrar'
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioAgricultor;