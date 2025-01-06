package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.DetalleOperacion;
import aplicaciones.spring.repositorios.IDetalleOperacion;

@Service("detalleoperaciones")
public class DetalleOperacionesService {
	@Autowired
	IDetalleOperacion iDetalleOperacion;

	public List<DetalleOperacion> listar() {
		return iDetalleOperacion.findAll();
	}

	public void guardar(DetalleOperacion detalle) {
		iDetalleOperacion.save(detalle);
	}

	public DetalleOperacion obtenerPorId(Long id) {
		return iDetalleOperacion.findById(id).orElse(null);
	}

	public void eliminar(Long id) {
		iDetalleOperacion.deleteById(id);
	}

	public List<DetalleOperacion> listarPorOperacion(Long operacionId) {
		return iDetalleOperacion.findByOperacionId(operacionId);
	}
}
