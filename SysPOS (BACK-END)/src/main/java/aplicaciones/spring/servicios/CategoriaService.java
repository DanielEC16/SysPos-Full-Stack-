package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Categoria;
import aplicaciones.spring.repositorios.ICategoria;

@Service("categoria")
public class CategoriaService {
	@Autowired
	ICategoria iCategoria;
	public List<Categoria> listar(){
		return iCategoria.findAll();
	}
	public void guardar(Categoria categoria) {
		iCategoria.save(categoria);
	}
	public Categoria obtenerPorId(Long id) {
		return iCategoria.findById(id).orElse(null);
	}
	public void eliminar(Long id) {
		iCategoria.deleteById(id);
	}
}
