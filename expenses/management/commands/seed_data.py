from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from expenses.models import Expense

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed demo users and expenses'

    def handle(self, *args, **options):
        alice, _ = User.objects.get_or_create(username='alice')
        if not alice.has_usable_password():
            alice.set_password('pass')
            alice.save()
        bob, _ = User.objects.get_or_create(username='bob')
        if not bob.has_usable_password():
            bob.set_password('pass')
            bob.save()

        Expense.objects.create(owner=alice, amount=3.50, description='Coffee', category='food')
        Expense.objects.create(owner=alice, amount=12.00, description='Lunch', category='food')
        Expense.objects.create(owner=bob, amount=25.00, description='Taxi home', category='transport')
        self.stdout.write(self.style.SUCCESS('Seeded users: alice/bob (password: pass) and sample expenses'))
