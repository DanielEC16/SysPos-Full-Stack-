package aplicaciones.spring.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.Categoria;

public interface ICategoria extends JpaRepository<Categoria, Long>{

}
