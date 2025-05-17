# Design Patterns
----------
## 1. Observer Pattern
El <CanvasComponent> tenía que reaccionar a cambios en el tamaño de ventana para limpiar el canvas y reajustar su resolución, ademas del uso de una pantalla de carga. Sin embargo, mezclar lógica de event‐listener, actualización de estado y redibujo dentro del componente podía volverse intrincado y acoplado. El patrón Observer es perfecto para este tipo de eventos asíncronos y dinámicos como el resize ed la ventana, pues desacopla quien emite el evento, que en este caso, es un hook que escucha el evento Window.Resize, de quien lo reacciona, que es el canvas ajustando a sus nuevas dimensiones.

### ¿Cómo se solucionó?
- Se creó un hook useWindowResize que internamente mantiene una lista de callbacks (observadores).
- Cada vez que cambia de tamaño, el sujeto notifica a todos los observadores.
- El Canvas (y cualquier otro componente) simplemente se subscribe en useEffect, recibe actualizaciones de forma limpia y recalcula sus dimensiones.
- Cuando se desmonta el componente, el sujeto se desuscribe de los observadores

## 2. Factory Pattern
Tener tres clases de formas hacía que el Canvas tuviera que hacer un swittch con new Circle(...), new Square(...), etc., cada vez que quisieras dibujar una nueva. El Factory Pattern centraliza la creación de objetos dependiendo del tipo, abstrae la lógica de instanciación y te libera de tener que conocer las clases concretas. Además, facilita la adición de nuevas formas en el fúturo sin tocar de nuevo la lógica interna del Canvas.

### ¿Cómo se solucionó?
- Se creó un ShapeFactory(type, opts) que internamente hace el switch y devuelve la instancia adecuada.
- En el canvas solo se llama a ShapeFactory.create(tools, opts), pasandole los valores tomados de la barra de herramientas.

### 3. Decorator Pattern
Pintar las figuras con distintos colores sin duplicar lógica dentro de cada clase podría ser complicado si se desconoce el concepto del Decorator, pues permite envolver cualquier forma con funcionalidad extra, que en este caso era inyectarle un nuevo fillStyle o strokeStyle. 

### ¿Cómo se solucionó?
- Se creó ColorDecorator<Opts> que implementa IShape<Opts>, recibiendo una forma ya creado mas un color CSS
- El draw() de ColorDecorator asigna primero el color, y luego lo dibuja.
- Desde el canvas, solo necesitas crear la figura por el tipo, luego lo decoras con el color.

### 4. Command Pattern
Se pretende crear un historial de acciones para hacer undo/redo con (CTRL+Z, CTRL+Y) de forma consistente. Meter esa lógica dentro del Canvas generaba mucho código spaghetti. El Comand Pattern encapsula cada acción como un objeto con métodos execute() y undo(), generando un desacoplamiento con un sistema de pilas, como un historial.

### ¿Cómo se solucionó?
- Se creó la interfaz de ICommand
- Se implementó DrawCommand, que en execute() se añade la forma al modelo y dibuja todo, y en undo() la quita y redibuja
- Se implementó ComamndManager con pilas undoStack y redoStack, que expone métodos como execute(cmd), undo() y redo()
- En el canvas, cada click genera un DrawCommand y se lanza en history.execute(cmd). El listener del teclado dispara history.undo()/history.redo()

-------
## UML
Link: https://lucid.app/lucidchart/2b7cd440-cf3f-463c-ba42-b4ec432de198/edit?viewport_loc=-11%2C-11%2C1005%2C1148%2C0_0&invitationId=inv_903a829e-0855-410b-95cb-c27ee7cc6891 
