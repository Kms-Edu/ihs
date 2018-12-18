package main

import (
  "net/http"
	//"fmt"
	"github.com/jung-kurt/gofpdf"
	//"io/ioutil"
  //"strconv"
	//"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  pdf := gofpdf.New("P", "mm", "A4", "")
  pdf.AddPage()
  pdf.SetFont("Arial", "B", 16)
  pdf.SetFontSize(10.0)
  pdf.Cell(40, 10, "Hello, world")
  pdf.Cell(80, 10, "Hello, world")
  pdf.Output(w)
}
