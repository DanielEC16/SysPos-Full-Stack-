package aplicaciones.spring.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import aplicaciones.spring.modelo.Producto;

public interface IProducto extends JpaRepository<Producto, Long>{
	@Query("SELECT p FROM Producto p WHERE p.nombre LIKE %:keyword% OR p.codigo LIKE %:keyword%")
	List<Producto> buscarPorCodigoONombre(@Param("keyword") String keyword);
	
	Producto findByCodigo(String codigo);
	
}
