package aplicaciones.spring.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import aplicaciones.spring.modelo.Categoria;
import aplicaciones.spring.servicios.CategoriaService;

@RestController
@RequestMapping("/categorias")
public class CategoriasController {

	@Autowired
	CategoriaService categoriaService;
	
	@GetMapping("/listar")
	public List<Categoria> listarCategorias(){
		return categoriaService.listar();
	}
}
