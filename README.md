# Desafio Sky

### Proposta

Crie um aplicativo backend que irá expor uma API RESTful de criação de sing up/sign
in. Todos os endpoints devem somente aceitar e somente enviar JSONs. 

O servidor
deverá retornar JSON para os casos de endpoint não encontrado também.
O aplicativo deverá persistir os dados (ver detalhes em requisitos).
Todas as respostas de erro devem retornar o objeto:

```json
{
	"mensagem": "mensagem de erro"
}
```

### Rotas Disponíveis

**Sign up**

**[POST] `/sign_up`**

Body

```json
"nome": "string",
"email": "string",
"senha": "senha",
"telefones": [
	 {
		 "numero": "123456789",
		 "ddd": "11"
	 }
 ]
}
```

Response Success **[201]**

```json
{
    "nome": "Yuri Carvalho",
    "email": "yuricarvaltdhthjhog48@gmail.com",
    "senha": "$2b$05$AGQAkq/o5nshT0bNMfz/Deja3x8N9IDcRQkPmXTDx45HYXf7N8q0W",
    "telefones": [
        {
            "ddd": "85",
            "telefone": "99988789"
        },
        {
            "ddd": "85",
            "telefone": "99988789"
        }
    ],
    "uid": "97cb8d49-7752-46c2-a232-1b802ecf72c3",
    "_id": "6089499365fef93a0c45e3db"
}
```

Response Error **[500]**

```json
{
	mesangem: "_Detalhes do Erro_"
}
```