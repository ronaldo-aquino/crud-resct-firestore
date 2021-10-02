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

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tasks.map((item) => (
              <li className="list-group-item" key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Adicionar Tarefa</h3>
          <form onSubmit={addTask}>
            <input
              type="text"
              plaveholder="Adicione sua tarefa"
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
