FROM ubuntu as base
WORKDIR /backend


# Install dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-venv \
    curl \
    && apt-get clean

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to PATH
ENV PATH="/root/.local/bin:$PATH"

# Install poetry-plugin-shell
RUN poetry self add poetry-plugin-shell