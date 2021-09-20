document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let id_product = document.getElementById('id_product').value;
  let name = document.getElementById('name').value;
  let price_retail = document.getElementById('price_retail').value;
  console.log(name)

  let task = {
    id_product,
    name,
    price_retail
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(id_product) {
  if(confirm("Deseas eliminar?")){
    console.log(id_product)
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].id_product == id_product) {
        tasks.splice(i, 1);
      }
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
  }
  
}


function editTask(id_product) {
  console.log(id_product)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].id_product == id_product) {
      console.log(tasks[i]);
      let product = document.forms[id_product].elements;
      let id = product[0].value;
      let name = product[1].value;
      let price = product[2].value;
      
      /*console.log("TEST: " +product[1].value);
      console.log("ID: " + id);
      console.log("VALUE: " + document.getElementById(id));
      console.log(id + " " + name);
      console.log(id_product);*/

      console.log(id_product);

      tasks[i].id_product = id;
      tasks[i].name = name;
      tasks[i].price_retail = price;

      console.log("DESPUES:" + tasks[i].name);
  
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function showEdit(id_product) {
  console.log(id_product)
  document.getElementById(id_product).style.display="block";
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let id_product = tasks[i].id_product;
    let name = tasks[i].name;
    let price_retail = tasks[i].price_retail;
    //style="display: none"

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <h3>${name}</h3>
          <p>${id_product} - ${name} - $${price_retail}
          <a href="#" onclick="deleteTask('${id_product}')" class="btn btn-danger ml-5">Eliminar</a>
          <a href="#" class="btn btn-info ml-5" onclick="showEdit('${id_product}')" >Editar</a>
          <div id=${id_product} style="display: none" >
              <form id="formTask" name=${id_product}>
                <div class="form-group">
                  Código:
                  <input type="text" value=${id_product}  id="id_product" placeholder="Código de producto" class="form-control ${id_product}" required>
                </div>
                <div class="form-group">
                  Nombre:
                  <input id="name" value=${name} type="text" class="form-control ${id_product}"  placeholder="Nombre de producto" required></input>
                </div>
                <div class="form-group"> 
                  Precio:
                  <input id="price_retail" value = ${price_retail} type="number" min="0" class="form-control ${id_product}" placeholder="Precio de venta" required></input>
                </div>
                <button type="submit" class="btn btn-primary btn-block" onclick="editTask('${id_product}')">Guardar</button>
              </form>
            </div>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
