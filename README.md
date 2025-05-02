# Base Module

## Overview

`base_module` is a modular healthcare application designed to provide a customizable foundation for healthcare-related software. It serves as a base layer with essential features like user authentication, backend communication, security, and patient management. The application can be extended with additional modules, allowing users to tailor the functionality to their specific needs.

This project is currently under development and aims to simplify the process of building healthcare applications by providing a reusable and extensible architecture.

## Architecture

`base_module` is structured as a monorepo with the following key characteristics:

1. Base Layer:
   - Provides common functionality required by all healthcare applications, such as:
     - User login and authentication.
     - Secure backend communication.
     - Patient list management.
   - Acts as the foundation for all modules.
2. Modular Design:
   - Supports both **internal modules** (developed within the monorepo) and **external modules** (cloned from external repositories).
   - Modules can be added or removed based on the specific requirements of the application.
3. Technology Stack:
   - **Frontend:** Built with modern web technologies (e.g., React, Next.js).
   - **Backend:** Uses Python with Django and Django REST Framework (DRF) for building APIs.
   - **Database:** PostgreSQL is used for data storage.
   - **Containerisation:** Docker Compose is used to manage the development environment.
   - **NGINX:** Acts as a reverse proxy to route requests to the appropriate services.

## Installation and Usage

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker:** To run the application in a containerised environment.
- **Just:** A command runner used to simplify project commands.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/letsdodigital/base_module
```

```bash
cd base_module
```

2. Copy the `.env.example` file to `.env` and update the environment variables as needed

3. Initialize the project:

```bash
just i
```

The above command will:

- Start the Docker containers.
- Install backend dependencies using Poetry.
- Run database migrations.
- Create a default user for the application.

### Running the Application

To start the application, use the following command:

```bash
just r
```

This will:

- Start the application in a non-detached mode.
- Launch the backend and frontend services.

Once the application is running, you can access it in your browser at (for development environments):

```md
http://localhost
```

### Development Workflow

- **Add Modules:**
  - Internal modules can be added directly to the monorepo.
  - External modules can be cloned into the appropriate directory and integrated with the base application.
  - Add comma delimited modules to the `NEXT_PUBLIC_ENABLED_MODULES=` variable in the `.env` file to enable them, eg

`NEXT_PUBLIC_ENABLED_MODULES=clinical-notes-i1,observations-i1`

- **Run Backend Commands:** Use the `just` commands to interact with the backend. For example:

**Start the backend with Poetry.**
  
```bash
just bp
```

**Run database migrations.**
  
```bash
just mm
```

**To populate the database with fake patient data, run:**

```bash
just cfp
```

## Current Status

This project is still under development.

## Contributing

Contributions are welcome! If you’d like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
