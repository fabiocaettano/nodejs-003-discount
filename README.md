# Node.js The Master Class


curl --request GET --url 'http://localhost:3000/foo'

curl --request GET --url 'http://localhost:3000/foo?name=fabio&idade=48'

curl --request GET --url 'http://localhost:3000?name=fabio&idade=48'

curl --request GET --url http://localhost:3000?foo=bar --header 'valueA: 10' --header 'valueB: 20'

curl --request GET --url http://localhst:3000/ --header 'valueA: 10' --header 'valueB: 20' --data '{"nome" : "Fabio Almeida Caetano", "idade" : 48 }'