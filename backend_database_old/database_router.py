# database_router.py


class PatientDatabaseRouter:
    """
    A router to control database operations for patient-related models.
    """

    def db_for_read(self, model, **hints):
        """
        Direct read operations for patient models to the 'patients' database.
        """
        if model._meta.app_label == "patients":
            return "patients"
        return "default"

    def db_for_write(self, model, **hints):
        """
        Direct write operations for patient models to the 'patients' database.
        """
        if model._meta.app_label == "patients":
            return "patients"
        return "default"

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if both models are in the same database.
        """
        db_set = {"default", "patients"}
        if obj1._state.db in db_set and obj2._state.db in db_set:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Ensure that patient models only appear in the 'patients' database.
        """
        if app_label == "patients":
            return db == "patients"
        return db == "default"
