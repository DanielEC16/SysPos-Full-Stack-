package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Rol;
import aplicaciones.spring.repositorios.IRol;

@Service("rol")
public class RolService {
	@Autowired
	IRol iRol;
	public List<Rol> listar(){
		return iRol.findAll();
	}
	public void guardar(Rol rol) {
		iRol.save(rol);
	}
	public Rol obtenerPorId(Long id) {
		return iRol.findById(id).orElse(null);
	}
	public void eliminar(Long id) {
		iRol.deleteById(id);
	}
}
