package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Cliente;
import aplicaciones.spring.repositorios.ICliente;

@Service("cliente")
public class ClienteService {
	@Autowired
	ICliente iCliente;
	
	public List<Cliente> listar(){
		return iCliente.findAll();
	}
	public Cliente guardar(Cliente cliente) {
		return iCliente.save(cliente);
	}
	public Cliente obtenerPorId(Long id) {
		return iCliente.findById(id).orElse(null);
	}
	public void eliminar(Long id) {
		iCliente.deleteById(id);
	}
	public Cliente buscarPorDni(String dni) {
        return iCliente.findByDni(dni);
    }
}
