import React from "react";

export const Footer = () => {
    return (
        
        <footer className="blackfoot bg-brown-darker" style={{ marginTop: '2rem', padding: '10px', color: 'white', bottom: '0', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Columna Izquierda */}
          <div style={{ flex: '1', minWidth: '250px', marginRight: '20px' }}>
            <h4 style={{ margin: '5px 0' }}>Contáctanos</h4>
            <p style={{ fontSize: '12px' }}>Encuentra las mejores ofertas en hoteles, casas y alojamientos para tu próxima aventura.</p>
            <p style={{ fontSize: '12px' }}>📧 Email: soporte@tudominio.com</p>
            <p style={{ fontSize: '12px' }}>📞 Teléfono: +123 456 7890</p>
          </div>
      
          {/* Columna Derecha */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h4 style={{ margin: '5px 0' }}>Políticas</h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: '0', fontSize: '12px' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Política de privacidad</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Términos y condiciones</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Política de cancelación</a></li>
            </ul>
            <h4 style={{ margin: '5px 0' }}>Redes Sociales</h4>
            <p style={{ fontSize: '12px' }}>Síguenos para conocer ofertas exclusivas:</p>
            <p style={{ fontSize: '12px' }}>🌐 <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a> | <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a> | <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Twitter</a></p>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', margin: '5px 0 0 0' }}>© 2024 [Nombre de tu empresa]. Todos los derechos reservados.</p>
      </footer>
      
      
      
    )
}