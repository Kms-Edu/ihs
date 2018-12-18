package main

import (
	"fmt"
	//"github.com/jung-kurt/gofpdf"
	//"io/ioutil"
  //"strconv"
  "context"
  "github.com/machinebox/graphql"
  "encoding/json"
  "log"
	//"strings"
)

func main() {
  client := graphql.NewClient("https://edu-1.herokuapp.com/v1alpha1/graphql")
  req := graphql.NewRequest(`
    query {
      sche_ages {
        age_name
      }
    }
  `)
  ctx := context.Background()
  responseData := make(map[string]interface{})
  if err := client.Run(ctx, req, &responseData); err != nil {
    log.Fatal(err)
  }

  tmp := responseData["sche_ages"].([]interface{})
  tmp2 := tmp[0].(map[string]interface{})
  fmt.Print(tmp2["age_name"].(string))
  jsonString, err := json.Marshal(responseData); 
  
  if err != nil {
    fmt.Println(err)
  }
  fmt.Printf("%s", jsonString)
}
