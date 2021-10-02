import { useEffect, useState } from "react";
import { db } from "./firebase";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const collection = () => db.collection("tasks");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await collection().get();

        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      return console.log("Não pode ficar vazio");
    }

    try {
      const newTask = {
        name: task,
        date: Date.now(),
      };

      const data = await collection().add(newTask);
      setTasks([...tasks, { ...newTask, id: data.id }]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await collection().doc(id).delete();

      const deleteWithFilter = tasks.filter((item) => item.id !== id);

      setTasks(deleteWithFilter);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center m-4">Gestão de tarefas</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 order-2 order-md-1">
          <ul className="list-group">
            {tasks.map((item) => (
              <li className="list-group-item" key={item.id}>
                {item.name}
                <button
                  className="btn btn-danger btn-sm float-right"
                  onClick={() => deleteTask(item.id)}
                >
                  Excluir
                </button>
                <button className="btn btn-warning btn-sm float-right mr-2">
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6 mb-4 mb-md-0 order-1 order-md-2">
          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Adicione sua tarefa aqui"
              className="form-control mb-2"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button type="submit" className="btn btn-dark btn-block">
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
