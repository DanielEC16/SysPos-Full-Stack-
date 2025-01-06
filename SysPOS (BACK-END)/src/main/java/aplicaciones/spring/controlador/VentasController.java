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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import aplicaciones.spring.modelo.Cliente;
import aplicaciones.spring.modelo.DetalleOperacion;
import aplicaciones.spring.modelo.Operacion;
import aplicaciones.spring.modelo.Producto;
import aplicaciones.spring.servicios.ClienteService;
import aplicaciones.spring.servicios.DetalleOperacionesService;
import aplicaciones.spring.servicios.OperacionesService;
import aplicaciones.spring.servicios.ProductoService;

@Controller
@RequestMapping("/admin/ventas")
public class VentasController {
	@Autowired
	OperacionesService operacionService;
	@Autowired
	DetalleOperacionesService detalleService;
	@Autowired
	ClienteService clienteService;
	@Autowired
	ProductoService productoService;






}
