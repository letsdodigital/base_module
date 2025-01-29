set shell := ["bash", "-c"]

default:
    just --list

initialise:= 'set -euxo pipefail
    initialise() {
        # Clear the terminal window title on exit
        echo -ne "\033]0; \007"
    }
    trap initialise EXIT
    just _terminal-description'

alias b := backend
# Run the backend
backend:
    #!/usr/bin/env bash
    {{initialise}} "backend"
    docker compose -f backend/docker-compose.yml up --build -d
    cd backend && docker compose exec backend bash -c "poetry shell && cd app && python manage.py runserver"

alias bp := backend-poetry
# Run the web app
backend-poetry:
    #!/usr/bin/env bash
    {{initialise}} "backend"
    docker compose -f backend/docker-compose.yml up --build -d
    cd backend && docker compose exec backend bash -c 'poetry shell && bash'
    
_terminal-description message=" ":
    echo -ne "\033]0;{{message}}\007"

alias s := setup-terminal-description
# Set up the description for terminal windows
setup-terminal-description:
    #!/usr/bin/env bash
    {{initialise}} setup-terminal-description
    alias_definition="alias j='just'"

    if grep -Fxq "$alias_definition" ~/.zshrc
    then
        echo "Alias already exists in ~/.zshrc"
    else
        echo "$alias_definition" >> ~/.zshrc
        echo "Alias added to ~/.zshrc"
    fi
    
    echo "Please run the following command to apply the changes to this terminal:"
    echo "source ~/.zshrc"

alias sp := setup-poetry
# Set up poetry
setup-poetry:
    #!/usr/bin/env bash
    {{initialise}} setup-poetry
    cd backend/backend
    echo "Below is the python interpreter path:"
    poetry run which python
