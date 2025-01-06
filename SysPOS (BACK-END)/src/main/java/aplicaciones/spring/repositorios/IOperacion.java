package aplicaciones.spring.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.Operacion;

public interface IOperacion extends JpaRepository<Operacion, Long>{

}
