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

alias bp := backend-poetry
# Run the web app
backend-poetry:
    #!/usr/bin/env bash
    {{initialise}} "backend"
    just _start-container detached="true" build="false"
    docker compose exec -it backend-database bash -c "poetry shell && bash"

alias cfp := create-fake-patients
# Create fake patients
create-fake-patients:
    #!/usr/bin/env bash
    {{initialise}} "create-fake-patients"
    just _start-container detached="true" build="false"
    docker compose exec backend-database /bin/sh -c "cd app && poetry run python manage.py create_fake_patients"

_start-docker-daemon:
    #!/usr/bin/env bash
    if ! docker info > /dev/null 2>&1; then
        echo "Docker is not running."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS: Start Docker Desktop
            open -a Docker
        else
            # Linux: Start Docker daemon
            sudo systemctl start docker
        fi

        # Wait for Docker to be fully running
        echo "Waiting for Docker to start..."
        while ! docker info > /dev/null 2>&1; do
            sleep 1
        done
        echo "Docker is now running."
    else
        echo "Docker is already running."
    fi


# If needed, starts Docker daemon and also starts the container (detached: default: true, build: default: true)
_start-container detached="true" build="true":
    #!/usr/bin/env bash
    just _start-docker-daemon
    container_name="backend-database"

    # Determine flags based on arguments
    detached_flag=""
    if [ "$detached" = "true" ]; then
        detached_flag="-d"
    fi

    build_flag=""
    if [ "$build" = "true" ]; then
        build_flag="--build"
    fi

    if [ "$(docker ps -q -f name=$container_name)" ]; then
        echo "Container $container_name is already running."
    else
        echo "Container $container_name is not running. Starting it now..."
        docker compose up $detached_flag $build_flag
    fi

alias i := initialise-project
# Initialise the project
initialise-project:
    #!/usr/bin/env bash
    {{initialise}} "initialise"
    just _start-container
    docker compose exec backend-database /bin/sh -c "poetry install && poetry run python app/create_next_user.py"
    just makemigrations-migrate


alias mm := makemigrations-migrate
# Run makemigrations and migrate
makemigrations-migrate:
    #!/usr/bin/env bash
    {{initialise}} "makemigrations-migrate"
    docker compose exec backend-database /bin/sh -c "\
    cd app && \
    poetry run python manage.py makemigrations && \
    poetry run python manage.py migrate && \
    poetry run python manage.py migrate --database=patients"


alias r := run
# Run the whole service
run:
    #!/usr/bin/env bash
    {{initialise}} "run"
    just _start-container detached="false" build="false"

    
find-subfolders:
    #!/usr/bin/env bash
    directory="./backend/.pypoetry/virtualenvs"
    first_subfolder=$(find "$directory" -type d -mindepth 1 -maxdepth 1 | head -n 1)
    python="${first_subfolder}/bin/python3.12"
    site_packages="${first_subfolder}/lib/python3.12/site-packages"
    
    echo $python
    echo $site_packages

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

alias sp := setup-python
# Set up python
setup-python:
    #!/usr/bin/env bash
    {{initialise}} setup-poetry
    if ! command -v jq &> /dev/null
    then
        echo "jq could not be found, installing..."
        brew install jq
    else
        echo "jq is already installed"
    fi

_terminal-description message=" ":
    echo -ne "\033]0;{{message}}\007"



