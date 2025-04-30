class PatientsDatabaseRouter:
    """
    A router to control all database operations on models in the patients app.
    """

    def db_for_read(self, model, **hints):
        """
        Direct read operations for patients app models to the 'patients' database.
        """
        if model._meta.app_label == "patients":
            return "patients"
        return None

    def db_for_write(self, model, **hints):
        """
        Direct write operations for patients app models to the 'patients' database.
        """
        if model._meta.app_label == "patients":
            return "patients"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if both models are in the same database.
        """
        if obj1._state.db in ("patients", "default") and obj2._state.db in (
            "patients",
            "default",
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Ensure that only the patients app models appear in the 'patients' database.
        """
        if app_label == "patients":
            return db == "patients"
        return db == "default"
