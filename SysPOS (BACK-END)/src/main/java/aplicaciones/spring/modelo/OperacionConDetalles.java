package aplicaciones.spring.modelo;

import java.util.List;

public class OperacionConDetalles {
	private String dni;
	private Operacion operacion;
	private List<DetalleOperacion> detalles;

	
	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Operacion getOperacion() {
		return operacion;
	}

	public void setOperacion(Operacion operacion) {
		this.operacion = operacion;
	}

	public List<DetalleOperacion> getDetalles() {
		return detalles;
	}

	public void setDetalles(List<DetalleOperacion> detalles) {
		this.detalles = detalles;
	}

}
