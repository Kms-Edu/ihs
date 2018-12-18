curl --request POST \
    --url @gotenberg_api/convert/html \
    --header 'Content-Type: multipart/form-data' \
    --form files=@index.html \
    -o result.pdf

curl --request POST \
    --url @gotenberg_api/convert/html \
    --header 'Content-Type: multipart/form-data' \
    --form files=@index.html \
    --form files=@header.html \
    --form files=@footer.html \
    -o result.pdf    

curl --request POST \
    --url @gotenberg_api/convert/html \
    --header 'Content-Type: multipart/form-data' \
    --form files=@index.html \
    --form files=@header.html \
    --form files=@footer.html \
    --form files=@AlegreyaSans-Regular.otf \
    -o result3.pdf    
   
curl --request POST \
    --url @gotenberg_api/convert/html \
    --header 'Content-Type: multipart/form-data' \
    --form files=@index.html \
    --form files=@header.html \
    --form files=@footer.html \
    --form files=@AlegreyaSans-Regular.otf \
    --form paperWidth=8.27 \
    --form paperHeight=11.27 \
    --form marginTop=0 \
    --form marginBottom=0 \
    --form marginLeft=0 \
    --form marginRight=0 \
    --form landscape=true \
    -o result4.pdf    