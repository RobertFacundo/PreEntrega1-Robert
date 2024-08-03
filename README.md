E-commerce Cart Application

Esta aplicación de carrito de compras en React permite a los usuarios agregar productos a un carrito, 
revisar los elementos seleccionados y realizar un pedido. 
La aplicación utiliza Firebase para gestionar la persistencia de datos y el almacenamiento en localStorage 
para mantener el carrito del usuario incluso después de recargar la página. 
Además, se emplea la biblioteca Bulma para el diseño y la interfaz de usuario, 
proporcionando un aspecto moderno y responsivo. SweetAlert se utiliza para mostrar alertas informativas y de error de manera elegante.
Ademas utilice nom run build ya que subi el proyecto a netlify para sumarlo a mi portfolio => https://robertfacundo.netlify.app/

Funcionalidades

Los usuarios pueden agregar productos al carrito, ajustar la cantidad y eliminar artículos.
El carrito se guarda en localStorage para asegurar que los elementos se mantengan entre sesiones.
Al realizar un pedido, los detalles se guardan en Firebase y el stock de los productos se actualiza automáticamente.
Se verifica que los datos del formulario de checkout sean correctos, incluyendo la confirmación del correo electrónico.
Utiliza Bulma para el diseño de la interfaz y SweetAlert para las alertas.