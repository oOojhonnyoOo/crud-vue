## SOBRE O SERVER

O servidor é uma aplicação REST gratuita na cloud, se precisar de mais informações ou gerar um token entre no site

    https://gorest.co.in

### EXEMPLO REQUISIÇÃO GET

    curl --location --request GET 'https://gorest.co.in/public-api/users?_format=json&access-token=tquyhXCfjCU3DF3tPej_x-6FxZvVNi9jp1jZ'

### EXEMPLO REQUISIÇÃO POST

    curl --location --request POST 'https://gorest.co.in/public-api/users' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer tquyhXCfjCU3DF3tPej_x-6FxZvVNi9jp1jZ' \
    --data-raw '{
        "first_name":"joao",
        "last_name":"neto",
        "gender":"male",
        "email":"joao.neto@madeiramadeira.com.br",
        "status":"active"
    }'

### EXEMPLO REQUISIÇÃO DELETE

    curl --location --request DELETE 'https://gorest.co.in/public-api/users/1821' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer tquyhXCfjCU3DF3tPej_x-6FxZvVNi9jp1jZ'