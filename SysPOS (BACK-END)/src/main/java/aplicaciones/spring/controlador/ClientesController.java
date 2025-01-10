package aplicaciones.spring.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import aplicaciones.spring.modelo.Cliente;
import aplicaciones.spring.servicios.ClienteService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/clientes")
public class ClientesController {
	@Autowired
	ClienteService clienteService;

	@GetMapping("/listar")
	public List<Cliente> listarClientes() {
		return clienteService.listar();
	}

	@PostMapping("/guardar")
	public Cliente guardarCliente(@RequestBody Cliente cliente) {
		return clienteService.guardar(cliente);
	}

	@DeleteMapping("/eliminar/{id}")
	public String eliminarCliente(@PathVariable Long id) {
		clienteService.eliminar(id);
		return "Cliente borrado exitosamente";
	}
	
	
	@GetMapping("/listar/{id}")
	public ResponseEntity<Cliente> listarClienteId(@PathVariable Long id) {
		Cliente cliente = clienteService.obtenerPorId(id);
		if (cliente != null) {
	        return ResponseEntity.ok(cliente);  // Retorna el cliente con un código 200 OK
	    } else {
	        return ResponseEntity.notFound().build();  // Retorna un 404 si no se encuentra el cliente
	    }
	}
	
}
