package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Operacion;
import aplicaciones.spring.repositorios.IOperacion;

@Service("venta")
public class OperacionesService {
	@Autowired
	IOperacion iOperacion;

	public List<Operacion> listar() {
		return iOperacion.findAll();
	}

	public void guardar(Operacion operacion) {
		iOperacion.save(operacion);
	}

	public Operacion obtenerPorId(Long id) {
		return iOperacion.findById(id).orElse(null);
	}

	public void eliminar(Long id) {
		iOperacion.deleteById(id);
	}
}
