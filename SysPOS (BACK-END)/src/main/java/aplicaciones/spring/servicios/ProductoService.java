package aplicaciones.spring.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aplicaciones.spring.modelo.Categoria;
import aplicaciones.spring.modelo.Producto;
import aplicaciones.spring.repositorios.ICategoria;
import aplicaciones.spring.repositorios.IProducto;

@Service("producto")
public class ProductoService {
	@Autowired
	IProducto iProducto;
	@Autowired
	ICategoria iCategoria;

	public List<Producto> listar() {
		return iProducto.findAll();
	}

	public Producto guardar(Producto producto) {
		Categoria categoria = iCategoria.findById(producto.getCategoria().getId())
				.orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
		producto.setCategoria(categoria);
		return iProducto.save(producto);
	}

	public Producto obtenerPorId(Long id) {
		return iProducto.findById(id).orElse(null);
	}

	public void eliminar(Long id) {
		iProducto.deleteById(id);
	}

	public List<Producto> buscarProductos(String keyword) {
		return iProducto.buscarPorCodigoONombre(keyword);
	}

	public Producto buscarProductoPorCodigo(String codigo) {
		return iProducto.findByCodigo(codigo);
	}

	public List<Producto> obtenerProductosPorIds(List<Long> productosIds) {
		return iProducto.findAllById(productosIds); // Consulta por lista de IDs
	}

}
