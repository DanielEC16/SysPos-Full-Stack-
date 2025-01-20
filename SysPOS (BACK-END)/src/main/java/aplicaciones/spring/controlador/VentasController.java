package aplicaciones.spring.controlador;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aplicaciones.spring.modelo.Cliente;
import aplicaciones.spring.modelo.DetalleOperacion;
import aplicaciones.spring.modelo.OperacionConDetalles;
import aplicaciones.spring.modelo.Operacion;
import aplicaciones.spring.modelo.Producto;
import aplicaciones.spring.servicios.ClienteService;
import aplicaciones.spring.servicios.DetalleOperacionesService;
import aplicaciones.spring.servicios.OperacionesService;
import aplicaciones.spring.servicios.ProductoService;

@RestController
@RequestMapping("/operaciones")
public class VentasController {
	@Autowired
	OperacionesService operacionService;
	@Autowired
	DetalleOperacionesService detalleService;
	@Autowired
	ClienteService clienteService;
	@Autowired
	ProductoService productoService;
	
	@GetMapping("/listar")
	public List<Operacion> listarOperaciones(){
		return operacionService.listar();
	}
	@PostMapping("/guardar")
    public Operacion generarVentaConDetalles(@RequestBody OperacionConDetalles operacionConDetalles) {
        // 1. Buscar al cliente por su DNI
        Cliente cliente = clienteService.buscarPorDni(operacionConDetalles.getDni());

        // Si el cliente no existe, crear uno nuevo
        if (cliente == null) {
            cliente = new Cliente();
            cliente.setDni(operacionConDetalles.getDni());
            cliente = clienteService.guardar(cliente);  // Guardamos el nuevo cliente
        }

        // 2. Asignar el cliente a la operación
        Operacion nuevaOperacion = operacionConDetalles.getOperacion();
        nuevaOperacion.setCliente(cliente);  // Asociar el cliente a la operación

        // 3. Guardar la operación
        nuevaOperacion = operacionService.guardar(nuevaOperacion);

        // 4. Asociar los detalles a la operación
        for (DetalleOperacion detalle : operacionConDetalles.getDetalles()) {
            // Asignamos el operacion_id a cada detalle
            detalle.setOperacion(nuevaOperacion);  // Se asocia la operación a los detalles
        }

        // 5. Guardar los detalles, ahora que están asociados con la operación
        detalleService.guardarDetalles(operacionConDetalles.getDetalles());

        // 6. Retornar la operación guardada con los detalles asociados
        return nuevaOperacion;
    }





}
