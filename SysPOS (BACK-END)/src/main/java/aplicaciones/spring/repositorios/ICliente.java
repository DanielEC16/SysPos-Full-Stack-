package aplicaciones.spring.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import aplicaciones.spring.modelo.Cliente;

public interface ICliente extends JpaRepository<Cliente, Long>{
	Cliente findByDni(String dni);
}
