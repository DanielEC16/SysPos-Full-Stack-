package aplicaciones.spring.modelo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="operaciones")
public class Operacion implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Cliente cliente;
	@Temporal(TemporalType.DATE)
	private Date fecha;
	private double total;
	private String tipo;
	private String estado;
	private String nota;
	@OneToMany(mappedBy = "operacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DetalleOperacion> detalles;
	@PrePersist
	public void prePersist() {
		if (this.fecha== null) {
	        this.fecha = new Date(); // Asigna la fecha de creación solo si está vacía
	    }
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getNota() {
		return nota;
	}
	public void setNota(String nota) {
		this.nota = nota;
	}
	
	public List<DetalleOperacion> getDetalles() {
		return detalles;
	}
	public void setDetalles(List<DetalleOperacion> detalles) {
		this.detalles = detalles;
	}
	@Override
	public String toString() {
		return "Operaciones [id=" + id + ", cliente=" + cliente + ", fecha=" + fecha + ", total=" + total + ", tipo="
				+ tipo + ", estado=" + estado + ", nota=" + nota + "]";
	}
	
}
