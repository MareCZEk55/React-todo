import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = () => {
    setShowCompleted((prevShowCompleted) => !prevShowCompleted);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: { height: '100%', minHeight: '100%', padding: 0 },
          body: { height: '100%', minHeight: '100%', margin: 0, padding: 0 },
        }}
      />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: '100vh', // Ensure the div takes at least the full height of the viewport
          background: theme.palette.background.default, // Apply the background color from the theme
          paddingTop: '20px', // Adjusted from marginTop to paddingTop
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
          <IconButton onClick={handleToggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon color="primary"/> : <Brightness4Icon color="primary"/>}
          </IconButton>
        </div>
        <Typography variant="h4" gutterBottom style={{ marginTop: 0, color: theme.palette.text.primary }}>
          TODO
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Vytvoř úkol"
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              width: "200px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            style={{ alignSelf: "center", marginBottom: "10px", }}
          >
            Přidat
          </Button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Checkbox
            checked={showCompleted}
            onChange={handleToggleCompleted}
            color="primary"
          />
          <label style={{ color: theme.palette.text.primary }}>Zobraz dokončené</label>
        </div>
        <List style={{ marginTop: "10px", width: "300px" }}>
          {todos.map(
            (todo) =>
              // Check if the task is completed and show/hide based on the checkbox state
              (showCompleted || !todo.completed) && (
                <ListItem key={todo.id} dense button>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    color="primary"
                  />
                  <ListItemText
                    primary={todo.text}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: theme.palette.text.primary
                    }}
                  />
                  <IconButton
                    onClick={() => deleteTodo(todo.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              )
          )}
        </List>
      </div>
    </ThemeProvider>
  );
};

export default App;
