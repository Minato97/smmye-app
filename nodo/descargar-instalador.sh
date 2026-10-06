#!/usr/bin/env bash
# Descarga el instalador de un nodo SMMyE desde la terminal de la Raspberry Pi (lo mismo que el botón
# "Descargar instalador" del panel). Pide usuario y contraseña de un ADMINISTRADOR del panel; no se guardan.
#   bash descargar-instalador.sh
set -euo pipefail

API="${SMMYE_API:-https://procurer-glaring-huddling.ngrok-free.dev/smmye/api}"
DESTINO="${1:-$HOME/smmye-nodo.zip}"
H=(-H "Content-Type: application/json" -H "Accept: application/json" -H "ngrok-skip-browser-warning: 1")
json() { python3 -c 'import json,sys; print(json.dumps(dict(zip(sys.argv[1::2], sys.argv[2::2]))))' "$@"; }

read -r -p "Usuario administrador del panel: " USUARIO
read -r -s -p "Contraseña: " PASS; echo
read -r -p "Nombre sugerido para el nodo [Nodo de prueba]: " NOMBRE; NOMBRE="${NOMBRE:-Nodo de prueba}"

TMP="$(mktemp)"; trap 'rm -f "$TMP"; unset PASS JWT' EXIT

codigo=$(curl -sS -o "$TMP" -w '%{http_code}' -X POST "$API/auth/login" "${H[@]}" -d "$(json usuario "$USUARIO" password "$PASS")")
[ "$codigo" = 200 ] || { echo "No se pudo iniciar sesión (HTTP $codigo): revisa usuario y contraseña."; exit 1; }
JWT=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["access_token"])' "$TMP")

codigo=$(curl -sS -o "$TMP" -w '%{http_code}' -X POST "$API/enrolamiento/instalador" "${H[@]}" -H "Authorization: Bearer $JWT" \
         -d "$(python3 -c 'import json,sys; print(json.dumps({"password": sys.argv[1], "vigencia_horas": 24, "nombre_sugerido": sys.argv[2]}))' "$PASS" "$NOMBRE")")
if [ "$codigo" != 200 ]; then
  echo "El panel no entregó el instalador (HTTP $codigo):"; head -c 300 "$TMP"; echo
  echo "(403 = el usuario no es administrador · 422 = contraseña incorrecta · 429 = demasiados intentos, espera 15 min)"
  exit 1
fi
mv "$TMP" "$DESTINO"
echo "Listo: $DESTINO (vigente 24 h, registra 1 nodo)."
echo "Siguiente:  cd ~ && python3 -m zipfile -e $(basename "$DESTINO") . && cd smmye-nodo && sudo bash install.sh"
