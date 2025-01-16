package aplicaciones.spring.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@GetMapping("/listar/{id}")
	public ResponseEntity<Cliente> ObtenerCliente(@PathVariable Long id){
		Cliente cliente = clienteService.obtenerPorId(id);
		if (cliente != null) {
	        return new ResponseEntity<>(cliente, HttpStatus.OK); // Cliente encontrado, retorno con código 200
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Cliente no encontrado, retorno con código 404
	    }
	}
	
	@PutMapping("/actualizar/{id}")
	public ResponseEntity<Cliente> updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
	    Optional<Cliente> cliente = Optional.ofNullable(clienteService.obtenerPorId(id));
	    if (cliente.isPresent()) {
	        Cliente clienteActualizado = cliente.get();
	        clienteActualizado.setNombre(clienteDetails.getNombre());
	        clienteActualizado.setApellido(clienteDetails.getApellido());
	        clienteActualizado.setDni(clienteDetails.getDni());
	        clienteActualizado.setTelefono(clienteDetails.getTelefono());
	        
	        clienteService.guardar(clienteActualizado);
	        return ResponseEntity.ok(clienteActualizado);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}

	@DeleteMapping("/eliminar/{id}")
	public String eliminarCliente(@PathVariable Long id) {
		clienteService.eliminar(id);
		return "Cliente borrado exitosamente";
	}
	
	

	
}
