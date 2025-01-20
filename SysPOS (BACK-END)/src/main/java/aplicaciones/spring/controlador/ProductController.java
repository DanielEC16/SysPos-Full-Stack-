package aplicaciones.spring.controlador;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import io.micrometer.core.ipc.http.HttpSender.Response;

import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/productos")
public class ProductController {
	@Autowired
	ProductoService productoService;
	@Autowired
	CategoriaService categoriaService;

	@PostMapping("/guardar")
	public Producto guardarProducto(@RequestBody Producto producto) {
		return productoService.guardar(producto);
	}
	
	@GetMapping("/listar")
	public List<Producto> listarProductos() {
		return productoService.listar();
	}
	
	@GetMapping("/listar/{id}")
	public ResponseEntity<Producto> ObtenerProduct(@PathVariable Long id){
		Producto producto = productoService.obtenerPorId(id);
		if (producto != null ) {
			return new ResponseEntity<>(producto,HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/eliminar/{id}")
	public String eliminarProducto(@PathVariable Long id) {
		productoService.eliminar(id);
		return "Producto borrado exitosamente";
	}
	
	@GetMapping("/buscarcodigo/{codigo}")
    public ResponseEntity<Producto> buscarProductoPorCodigo(@PathVariable String codigo) {
        Producto producto = productoService.buscarProductoPorCodigo(codigo);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
	


}
