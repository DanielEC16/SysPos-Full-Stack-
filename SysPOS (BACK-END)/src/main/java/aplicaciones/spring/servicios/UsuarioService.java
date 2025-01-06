package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Usuario;
import aplicaciones.spring.repositorios.IUsuario;

@Service("usuario")
public class UsuarioService {
	@Autowired
	IUsuario iUsuario;
	public List<Usuario> listar(){
		return iUsuario.findAll();
	}
	public void guardar(Usuario usuario) {
		iUsuario.save(usuario);
	}
	public Usuario obtenerPorId(Long id) {
		return iUsuario.findById(id).orElse(null);
	}
	public void eliminar(Long id) {
		iUsuario.deleteById(id);
	}
	
}
