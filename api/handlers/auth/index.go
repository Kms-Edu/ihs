package main

import (
  "encoding/json"
  "net/http"
  "time"
)

type Todo struct {
    Name      string
    Completed bool
    Due       time.Time
}

type Todos []Todo

func Handler(w http.ResponseWriter, r *http.Request) {
	todos := Todos{
    Todo{Name: "Write presentation"},
    Todo{Name: "Host meetup"},
  }
  w.Header().Set("Content-Type", "application/json; charset=UTF-8")
  w.WriteHeader(http.StatusOK)
  if err := json.NewEncoder(w).Encode(todos); err != nil {
      panic(err)
  }
}
