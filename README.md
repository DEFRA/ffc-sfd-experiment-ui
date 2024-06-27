## Run

`docker-compose up --build`

http://localhost:3600/tech-evaluation/login

Login CRN
UN- 1789678903
PW- any password will be accepted

## Formatting in vscode

If you would like to use prettier, install `numso.prettier-standard-vscode`. For nunjucks formatting
install `okitavera.vscode-nunjucks-formatter`.

Add the following to .vscode/settings.json:

```json
{
  "editor.defaultFormatter": "numso.prettier-standard-vscode",
  "[nunjucks]": {
    "editor.defaultFormatter": "okitavera.vscode-nunjucks-formatter"
  },
  "[javascript]": {
    "editor.defaultFormatter": "numso.prettier-standard-vscode"
  }
}
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.

