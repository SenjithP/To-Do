import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import { NameInputForm } from "./welcomePage";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  // Function to retrieve todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Function to retrieve name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Function to Add todos
  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    // Store the updated todos in localStorage
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    toast.success("Task Added Successfully!");
  };

  // Function to Complete todos
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed };
          if (updatedTodo.completed) {
            toast.success("Task Marked as Completed!");
          } else {
            toast.success("Task Retrieved!");
          }
          return updatedTodo;
        } else {
          return todo;
        }
      })
    );
  };

  // Function to Delete todos
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task Deleted Successfully!");
  };

  // Function to Edit todos
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to Edit todos
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
    toast.success("Task Updated Successfully!");
  };

  // Function to delete all todos
  const deleteAllTodos = () => {
    setTodos([]);
    // Clear todos from localStorage
    localStorage.removeItem("todos");
    toast.success("All Tasks Deleted Successfully!");
  };

  // Function to clear all localStorage data
  const clearLocalStorage = () => {
    setTodos([]);
    setName("");
    // Clear both todos and name from localStorage
    localStorage.removeItem("todos");
    localStorage.removeItem("name");
  };

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  return (
    <div className="TodoWrapper">
      {name ? (
        <>
          <h1>
            {getGreeting()} {name}, <br /> What's Your Tasks Today?
          </h1>
          <TodoForm addTodo={addTodo} />
          {todos.map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
              <Todo
                task={todo}
                key={index}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            )
          )}
          <button className="todo-btn" onClick={deleteAllTodos}>
            Delete All Tasks
          </button>
          <button
            className="todo-btn"
            style={{ marginLeft: "40px" }}
            onClick={clearLocalStorage}
          >
            Change Name?
          </button>
        </>
      ) : (
        <NameInputForm setName={setName} />
      )}
    </div>
  );
};
