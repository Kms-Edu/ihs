package main

import (
    "log"
    "net/http"
    "github.com/jung-kurt/gofpdf"
)

func handler(w http.ResponseWriter, r *http.Request) {
  pdf := gofpdf.New("P", "mm", "A4", "")
  pdf.AddPage()
  pdf.SetFont("Arial", "B", 16)
  pdf.SetFontSize(10.0)
  pdf.Cell(40, 10, "Hello, world")
  pdf.Cell(80, 10, "Hello, world")
  pdf.Output(w)
  
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}