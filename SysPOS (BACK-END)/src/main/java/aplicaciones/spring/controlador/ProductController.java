package aplicaciones.spring.controlador;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import aplicaciones.spring.modelo.Categoria;
import aplicaciones.spring.modelo.Cliente;
import aplicaciones.spring.modelo.Producto;
import aplicaciones.spring.servicios.CategoriaService;
import aplicaciones.spring.servicios.ProductoService;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/productos")
public class ProductController {
	@Autowired
	ProductoService productoService;
	@Autowired
	CategoriaService categoriaService;

	@GetMapping("/listar")
	public List<Producto> listarProductos() {
		return productoService.listar();
	}
	
	@PostMapping("/guardar")
	public Producto guardarProducto(@RequestBody Producto producto) {
		return productoService.guardar(producto);
	}
	


}
