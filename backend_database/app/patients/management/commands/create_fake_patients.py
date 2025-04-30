from django.core.management.base import BaseCommand
from faker import Faker

from patients.models import Patient


class Command(BaseCommand):
    help = "Create 10 fake patients"

    def handle(self, *args, **kwargs):
        fake = Faker()

        for _ in range(10):
            patient = Patient.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(
                    minimum_age=18, maximum_age=90
                ),
                email=fake.unique.email(),
                phone_number=fake.phone_number(),
                address=fake.address(),
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f"Created patient: {patient.first_name} {patient.last_name}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS("Successfully created 10 fake patients!")
        )
