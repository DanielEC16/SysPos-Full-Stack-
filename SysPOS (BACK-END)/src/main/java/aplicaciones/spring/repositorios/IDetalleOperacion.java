package aplicaciones.spring.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.DetalleOperacion;

public interface IDetalleOperacion extends JpaRepository<DetalleOperacion, Long>{
	List<DetalleOperacion> findByOperacionId(Long operacionId);
}
