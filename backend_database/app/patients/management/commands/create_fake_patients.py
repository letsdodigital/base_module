import random

from django.core.management.base import BaseCommand
from faker import Faker
from patients.models import Patient


class Command(BaseCommand):
    help = "Create 10 fake patients"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for _ in range(10):
            # Randomly choose sex
            sex = random.choice(["M", "F"])

            # Generate first name based on sex
            if sex == "M":
                first_name = fake.first_name_male()
            else:
                first_name = fake.first_name_female()

            # Create the patient
            patient = Patient.objects.using("patients").create(
                first_name=first_name,
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(
                    minimum_age=18, maximum_age=90
                ),
                email=fake.unique.email(),
                phone_number=fake.phone_number(),
                address=fake.address(),
                sex=sex,
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f"Created patient: {patient.first_name} {patient.last_name} ({patient.sex})"
                )
            )

        self.stdout.write(
            self.style.SUCCESS("Successfully created 10 fake patients!")
        )
