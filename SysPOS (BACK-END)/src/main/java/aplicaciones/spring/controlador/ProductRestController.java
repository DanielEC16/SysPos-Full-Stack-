package aplicaciones.spring.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import aplicaciones.spring.modelo.Producto;
import aplicaciones.spring.servicios.ProductoService;

@RestController
@RequestMapping("/admin")
public class ProductRestController {
	@Autowired
	ProductoService productoService;

	
}
