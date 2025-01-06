package aplicaciones.spring.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.Usuario;

public interface IUsuario extends JpaRepository<Usuario, Long>{

}
