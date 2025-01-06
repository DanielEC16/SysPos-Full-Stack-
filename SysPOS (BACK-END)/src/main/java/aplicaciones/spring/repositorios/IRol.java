package aplicaciones.spring.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.Rol;

public interface IRol extends JpaRepository<Rol, Long>{

}
