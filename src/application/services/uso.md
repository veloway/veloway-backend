# USO DE LOS SERVICIOS 

En los servicios lo que haremos es definir clases que se encarguen de tareas repetitivas en la logica de nogocio.
Estos tambien se comunicaran con los repositorios para obtener los datos necesarios.
Ademas se deberan instanciar dentro de los casos de uso para que puedan ser utilizados.
Esto se debe ya que los casos de uso ya tienen inyectados los repositorios que los servicios necesitan para funcionar.

Por ejemplo:
- Validar datos
- Enviar correos
- etc.

Esto mismos seran llamados por los casos de uso segun sean necesarios.
